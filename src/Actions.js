import Reflux from 'reflux'

const Actions = Reflux.createActions([
  'checkCookie',
  'saveCookie',
  'authGoogle',
  'appInitialize',
  'appCreateCampaign',
  'appLoadCampaign',
  'appUpdateCampaign',
  'appUpdateCampaigns'
])

export default Actions
