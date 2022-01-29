const { google } = require('googleapis');
const { OAuth2 } = google.auth;
require("dotenv").config();


const oAuth2Client = new OAuth2(
    process.env.Client_ID, process.env.Client_PW
);

oAuth2Client.setCredentials({refresh_token: process.env.refresh_token});

const calendar = google.calendar({version: 'v3', auth: oAuth2Client });

const eventStartTime = new Date()
const eventEndTime = new Date()


eventStartTime.setDate(eventStartTime.getDate() + 2);
eventEndTime.setDate(eventEndTime.getDate() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

