import config from '../../config'
import crypto from 'crypto'
import { handleMessage } from './lib/secret-santa'

export function router(event, context, callback) {
  switch (event.path.proxy) {
    case 'webhook': webhook(event, context, callback); break;
    default: callback(new Error("Access denied"))
  }
}

function webhook(event, context, callback) {
  switch (event.method) {
    case 'GET': get(event, context, callback); break;
    case 'POST': post(event, context, callback); break;
    default: callback(null, {statusCode: 405, input: JSON.stringify(event)})
  }
}

function get(event, context, callback) {
  if (event.query['hub.mode'] === 'subscribe' &&
      event.query['hub.verify_token'] === config.VALIDATION_TOKEN) {
      callback(null, parseInt(event.query['hub.challenge'], 10))
  } else {
    callback(new Error("Access denied"))
  }
}

function post(event, context, callback) {
  assertMessageFromFacebook(event, callback)
  const fbMessage = event.body.entry[0].messaging[0]
  handleMessage(fbMessage.sender.id, fbMessage.message.text)
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
