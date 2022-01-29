// https://github.com/CamSkiTheDev/Google-Calendar-NodeJS-App
// https://www.youtube.com/watch?v=zrLf4KMs71E
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

const event = {
    // Required info
    summary: 'Meeting with Dave',
    location: '1750 Sepulveda Blvd Torrance, CA 90501',
    description: 'Meeting with David to talk about memes',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/California'
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/California'
    },
    // End of required info
    colorId: 1,
    // Color: Blue | ID: 1
    // Color: Green | ID: 2
    // Color: Purple | ID: 3
    // Color: Red | ID: 4
    // Color: Yellow | ID: 5
    // Color: Orange | ID: 6
    // Color: Turquoise | ID: 7
    // Color: Gray | ID: 8
    // Color: Bold Blue | ID: 9
    // Color: Bold Green | ID: 10
    // Color: bold red | ID: 11
}

