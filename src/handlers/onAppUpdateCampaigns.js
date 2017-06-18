import {map, merge} from 'lodash'
import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (campaign, context) => {
  debug('onAppUpdateCampaigns')
  let found = false
  map(context.state.campaigns.dataProvider, (item) => {
    if (campaign.id === item.id) {
      found = true
      return merge(campaign, item)
    }
  })
  if (found === false) {
    context.state.campaigns.dataProvider.push(campaign)
  }
  context.setState({
    campaigns: context.state.campaigns
  })
}

export default handler
