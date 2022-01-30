// https://github.com/CamSkiTheDev/Google-Calendar-NodeJS-App
// https://www.youtube.com/watch?v=zrLf4KMs71E
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
require("dotenv").config();

// Couldnt get .env vars to work on my end
const oAuth2Client = new OAuth2(
    // Username
    '676837874195-0ttlh9fggd67pe2l211elulnq75n848f.apps.googleusercontent.com',
    // Password
    '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'
);

// Refresh Token
oAuth2Client.setCredentials({refresh_token: '1//04LfGCgAIoKyvCgYIARAAGAQSNwF-L9IrynY6zxNcdTjmRiYYOZOhnIfK-nxPFf_vGRRGSu3pY62_pzLBj1y4UujyWay1WgS_E1E'});

function eventCreation(year, month, day) {
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client });
    //months start at 0, this lets the user use the regular month #
    month -= 1;
    
    const eventStartTime = new Date(year, month, day)
    const eventEndTime = new Date(year, month, day)
    
    // + 2 means tomorrow
    eventStartTime.setDate(eventStartTime.getDate());
    eventEndTime.setDate(eventEndTime.getDate());
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

    const event = {
        // Required info
        summary: 'Meeting with Dave',
        location: '1750 Sepulveda Blvd Torrance, CA 90501',
        description: 'Meeting with David to talk about memes',
        start: {
            dateTime: eventStartTime,
            timeZone: 'America/Los_Angeles'
        },
        end: {
            dateTime: eventEndTime,
            timeZone: 'America/Los_Angeles'
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

    calendar.freebusy.query(
        {
            resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'America/Los_Angeles',
                items: [{ id: 'primary' }],
        },
    }, (err, res) => {
        if (err) {
            return console.error('Free Busy Query Error: ', err)
        }

        const eventsArr = res.data.calendars.primary.busy;

        if (eventsArr.length === 0) {
            return calendar.events.insert(
                {
                    calendarId: 'primary',
                    resource: event
                }, err => {
                    if (err) {
                        console.error('Calendar Event Creation Error: ', err);
                    }

                    return console.log('Calendar Event Created');
                })

            return console.log('Sorry I am busy');

        }
    })
}

eventCreation();