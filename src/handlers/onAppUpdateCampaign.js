import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (campaign, context) => {
  debug('onAppUpdateCampaign: %o', campaign)
  context.state.loader.title = 'Travail en cours...'
  context.state.loader.message = 'Il est temps de valider un bagage.'
  context.setState({
    initialized: false,
    loader: context.state.loader
  })
  window.feathers.service('api/campaigns').update(campaign.id, campaign).then(() => {
    context.setState({initialized: true})
  }).catch((error) => {
    console.error(error)
    context.setState({initialized: true})
  })
}

export default handler
