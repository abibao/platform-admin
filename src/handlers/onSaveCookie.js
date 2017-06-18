import Debug from 'debug'
import cookie from 'react-cookies'

import Actions from './../Actions'

const debug = Debug('platform-abibao:actions')

const handler = (token, context) => {
  debug('onSaveCookie %s', token)
  context.state.loader.title = 'Intialisation en cours...'
  context.state.loader.message = 'Sauvegarde de vos empreintes digitales.'
  context.setState({loader: context.state.loader})
  cookie.save('rememberMe', token, { path: '/' })
  Actions.checkCookie()
}

export default handler
