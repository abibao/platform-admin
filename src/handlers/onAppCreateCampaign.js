import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (context) => {
  debug('onAppCreateCampaign')
  context.state.loader.title = 'Travail en cours...'
  context.state.loader.message = 'Il est temps de rajouter un bagage.'
  context.setState({
    initialized: false,
    loader: context.state.loader
  })
  window.feathers.service('api/campaigns').create({
    name: 'Nouvelle campagne',
    company: 'None',
    reader: 'abibao',
    position: 0,
    picture: 'images/default/campaign.png',
    data: {pages: [{name: 'page1'}]}
  }).then(() => {
    context.setState({initialized: true})
  }).catch((error) => {
    console.error(error)
    context.setState({initialized: true})
  })
}

export default handler
