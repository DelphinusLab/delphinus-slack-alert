import { sendAlert } from '../index'
const config = require("./config");

function main () {
    const err = new Error('Test Error');
    sendAlert(err, config, false);
}

main();