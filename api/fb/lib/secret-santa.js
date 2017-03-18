import { sendText } from './fb-api'

export function handleMessage(sender, message) {
  sendText(sender, message)
}
