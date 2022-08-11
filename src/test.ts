import { sendAlert } from './index'
const TestConfig = require("./test-config");

function main () {
    const err = new Error('Test Error');
    sendAlert(err, TestConfig);
}

main();