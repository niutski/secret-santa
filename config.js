const APP_SECRET = process.env.MESSENGER_APP_SECRET
const VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN
const SERVER_URL = process.env.SERVER_URL

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN && SERVER_URL)) {
  console.error("Missing config values");
  console.log("ERROR: Missing config values");
  process.exit(1);
}

export default {
  APP_SECRET,
  VALIDATION_TOKEN,
  PAGE_ACCESS_TOKEN,
  SERVER_URL
}
