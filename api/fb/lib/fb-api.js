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

async function callSendAPI(body) {
  const url = "https://graph.facebook.com/v2.6/me/messages"
  const qs = { access_token: config.PAGE_ACCESS_TOKEN }
  const json = true
  try {
    const response = await request.post(url, { body, json, qs })
  } catch (error) {
    console.log(`Error for message ${JSON.stringify(body)}. Error: ${error}`)
  }
}

export async function configureProfile(body, callback) {
  const url = "https://graph.facebook.com/v2.6/me/messenger_profile"
  const accessToken = { access_token: config.PAGE_ACCESS_TOKEN }
  const json = true
  try {
    await request.post(url, {
      body,
      json,
      qs: accessToken })
    const fields = Object.keys(body).join(',')
    const qs = Object.assign({}, accessToken, { fields })
    const activeConfiguration = await request.get(url, { qs })
    callback(null, { config: activeConfiguration.toString() })
  } catch (error) {
    console.log(error)
    callback(error)
  }
}
