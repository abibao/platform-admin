import Debug from 'debug'
import cookie from 'react-cookies'

import Actions from './../Actions'

const debug = Debug('platform-abibao:actions')

const handler = (context) => {
  debug('onCheckCookie')
  context.state.loader.title = 'Intialisation en cours...'
  context.state.loader.message = 'Recherche de traces de votre ancien passage.'
  context.setState({loader: context.state.loader})
  const rememberMe = cookie.load('rememberMe', { path: '/' })
  if (rememberMe) {
    context.state.rememberMe = rememberMe
  } else {
    context.state.rememberMe = 'NONE'
    context.setState({
      initialized: true,
      rememberMe: context.state.rememberMe
    })
  }
  if (context.state.rememberMe !== 'NONE') {
    context.state.loader.title = 'Intialisation en cours...'
    context.state.loader.message = 'Repérage de la proie, identification de l’espèce.'
    context.setState({loader: context.state.loader})
    window.feathers.authenticate().then((response) => {
      return window.feathers.passport.verifyJWT(response.accessToken).then((payload) => {
        return window.feathers.service('users').get(payload.userId)
      })
    })
    .then((user) => {
      debug('onCheckCookie user: %o', user)
      context.state.loader.title = 'Intialisation en cours...'
      context.state.loader.message = 'Identification terminée, cette espèce est bien répertoriée.'
      context.setState({loader: context.state.loader})
      context.setState({
        user,
        rememberMe: context.state.rememberMe
      })
      Actions.appInitialize()
    })
    .catch((error) => {
      debug('onCheckCookie, error: %o', error)
      switch (error.toString()) {
        case 'Error: Socket connection timed out':
          context.setState({
            generalError: 'SocketDisconnected'
          })
          break
        case 'Error: \'id is missing from current user.\'':
          context.setState({
            generalError: 'InvalidUserId'
          })
          break
        default:
          console.error(error.toString())
      }
    })
  }
}

export default handler
