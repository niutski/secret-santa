import config from '../../config'

// TODO: implement "/authorize" endpoint

export function router(event, context, callback) {
  if (assertMessageFromFacebook(event, callback)) {
    switch (event.method) {
      case 'GET': get(event, context, callback); break;
      case 'POST': post(event, context, callback); break;
      default: callback(null, {statusCode: 405, input: JSON.stringify(event)})
    }
  }
}

function get(event, context, callback) {
  console.log(JSON.stringify(event))
  if (event.query['hub.mode'] === 'subscribe' &&
      event.query['hub.verify_token'] === config.VALIDATION_TOKEN) {
      callback(null, parseInt(event.query['hub.challenge'], 10))
  } else {
    callback(new Error("Access denied"))
  }
}

function post(event, context, callback) {
  callback(null, {statusCode: 201, input: JSON.stringify(event)})
}

function assertMessageFromFacebook(event, callback) {
  // TODO
  return true
}
