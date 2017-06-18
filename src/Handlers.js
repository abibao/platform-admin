import onCheckCookie from './handlers/onCheckCookie'
import onSaveCookie from './handlers/onSaveCookie'
import onAuthGoogle from './handlers/onAuthGoogle'
import onAppInitialize from './handlers/onAppInitialize'
import onAppCreateCampaign from './handlers/onAppCreateCampaign'
import onAppUpdateCampaigns from './handlers/onAppUpdateCampaigns'

class Handlers {
}

Handlers.prototype.onCheckCookie = onCheckCookie
Handlers.prototype.onSaveCookie = onSaveCookie
Handlers.prototype.onAuthGoogle = onAuthGoogle
Handlers.prototype.onAppInitialize = onAppInitialize
Handlers.prototype.onAppCreateCampaign = onAppCreateCampaign
Handlers.prototype.onAppUpdateCampaigns = onAppUpdateCampaigns

export default Handlers
