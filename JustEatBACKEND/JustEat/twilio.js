const twilio = require('twilio');
const config = require('./config');

const accountSid = config.Twilio.accountSid;
const authToken = config.Twilio.authToken;

module.exports = new twilio.Twilio(accountSid,authToken);