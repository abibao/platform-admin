import Debug from 'debug'

const debug = Debug('platform-abibao:actions')

const handler = (context) => {
  debug('onAuthGoogle')
  window.location = process.env.REACT_APP_GOOGLE_AUTH_URL
}

export default handler
