import hooks from 'feathers-hooks'
import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'
import authentication from 'feathers-authentication-client'

import Debug from 'debug'
const debug = Debug('platform-abibao:feathers')

export default (callback) => {
  debug('constructor')
  const socket = io(process.env.REACT_APP_API_URL)
  const app = feathers()
    .configure(hooks())
    .configure(socketio(socket))
    .configure(authentication({
      storage: window.localStorage,
      storageKey: 'rememberMe',
      cookie: 'rememberMe'
    }))
  callback(app)
}
