import { sendText } from './fb-api'

export function handleMessage(sender, message) {
  sendText(sender, message)
}

export function handlePostback(sender, payload) {
  const responseMessage = getResponseForCallbackPayload(payload)
  sendText(sender, responseMessage)
}

function getResponseForCallbackPayload(payload) {
  switch (payload) {
    case 'get_started': return "You are enrolling"
    default: return "I don't know what to do with that information. Sorry!"
  }
}
