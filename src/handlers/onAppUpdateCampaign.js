import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (campaign, picture, context) => {
  debug('onAppUpdateCampaign: %o', campaign, picture)
  context.state.loader.title = 'Travail en cours...'
  context.state.loader.message = 'Il est temps de valider un bagage.'
  context.setState({
    initialized: false,
    loader: context.state.loader
  })
  campaign.updatedAt = new Date()
  if (picture) {
    context.state.loader.message = 'Une nouvelle image va être rajouter.'
    context.setState({
      initialized: false,
      loader: context.state.loader
    })
    const reader = new window.FileReader()
    reader.readAsDataURL(picture)
    reader.addEventListener('load', () => {
      debug('picture ready to be uploaded')
      window.feathers.service('uploads')
        .create({uri: reader.result})
        .then((response) => {
          context.state.loader.message = 'Il est temps de valider un bagage.'
          context.setState({
            initialized: false,
            loader: context.state.loader
          })
          campaign.picture = 'wp_content/' + response.id
          return window.feathers.service('api/campaigns').patch(campaign.id, campaign).then((result) => {
            context.setState({initialized: true})
          })
        })
        .catch((error) => {
          console.error(error)
          context.setState({initialized: true})
        })
    })
  } else {
    window.feathers.service('api/campaigns').patch(campaign.id, campaign).then((result) => {
      context.setState({initialized: true})
    }).catch((error) => {
      console.error(error)
      context.setState({initialized: true})
    })
  }
}

export default handler
