import request from 'request-promise-lite'
import config from '../../../config'

export function sendText(recipientId, text) {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: { text }
  }
  callSendAPI(messageData)
}

async function callSendAPI(json) {
  const url = "https://graph.facebook.com/v2.6/me/messages"
  const qs = { access_token: config.PAGE_ACCESS_TOKEN }
  try {
    const postResult = await request.post(
      url,
      {
        body: json,
        json: true,
        qs
      })
    console.log(postResult)
  } catch (error) {
    console.log(error)
  }
}
