import config, { facebookConfiguration } from '../../config'
import crypto from 'crypto'
import { handleMessage, handlePostback } from './lib/secret-santa'
import { configureProfile } from './lib/fb-api'

export function router(event, context, callback) {
  switch (event.path.proxy) {
    case 'webhook': webhook(event, context, callback); break;
    case 'configure': configureProfile(facebookConfiguration, callback); break;
    default: callback(new Error("Access denied"))
  }
}

function webhook(event, context, callback) {
  switch (event.method) {
    case 'GET': handleGet(event, context, callback); break;
    case 'POST': handlePost(event, context, callback); break;
    default: callback(null, {statusCode: 405, input: JSON.stringify(event)})
  }
}

function handleGet(event, context, callback) {
  if (event.query['hub.mode'] === 'subscribe' &&
      event.query['hub.verify_token'] === config.VALIDATION_TOKEN) {
      callback(null, parseInt(event.query['hub.challenge'], 10))
  } else {
    callback(new Error("Access denied"))
  }
}

function handlePost(event, context, callback) {
  console.log(JSON.stringify(event))
  assertMessageFromFacebook(event, callback)
  const messageIn = event.body.entry[0].messaging[0]
  if (messageIn.text) {
    handleMessage(messageIn.sender.id, messageIn.message.text)
  } else if (messageIn.postback) {
    handlePostback(messageIn.sender.id, messageIn.postback.payload)
  }
  callback(null, {status: "200"})
}

function assertMessageFromFacebook(event, callback) {
  var signature = event.headers["X-Hub-Signature"];

  if (!signature) {
    throw new Error("Couldn't validate the request signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', config.APP_SECRET)
                        .update(JSON.stringify(event.body), 'UTF-8')
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
