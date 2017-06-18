import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (context) => {
  debug('onAppInitialize')
  context.state.loader.title = 'Intialisation en cours...'
  context.state.loader.message = 'Préparation des bagages en vue du voyage.'
  context.setState({loader: context.state.loader})
  window.feathers.service('api/campaigns').find({}).then((campaigns) => {
    context.state.campaigns.dataProvider = campaigns
    context.setState({
      initialized: true,
      campaigns: context.state.campaigns
    })
  }).catch(console.error)
}

export default handler
