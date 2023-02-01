import { sendAlert } from '../index'
const config = require("./slack-alert-config");

async function main () {
    const err = new Error('Test Error');
    await sendAlert(err, config, false);
}

main();