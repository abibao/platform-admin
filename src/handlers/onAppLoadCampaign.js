import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (id, context) => {
  debug('onAppLoadCampaign: %o', id)
  context.state.loader.title = 'Travail en cours...'
  context.state.loader.message = 'Il est temps de valider un bagage.'
  context.setState({
    initialized: false,
    loader: context.state.loader
  })
  window.feathers.service('api/campaigns').get(id).then((campaign) => {
    context.setState({
      initialized: true,
      campaign
    })
  }).catch((error) => {
    switch (true) {
      case error.toString().includes('NotFound: No record found for id'):
        context.setState({
          generalError: 'CampaignNotFound'
        })
        break
      default:
        context.setState({
          generalError: 'GeneralError'
        })
        console.error(error.toString())
    }
  })
}

export default handler
