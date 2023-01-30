import { sendAlert } from '../index'
require('dotenv').config();

const config = {
    "active": true,
    "channelId": process.env["CHANNELID"],
    "token": process.env["TOKEN"],
    "timePeriod": 300
};

async function main () {
    const err = new Error('Test Error');
    await sendAlert(err, config, false);
}

main();