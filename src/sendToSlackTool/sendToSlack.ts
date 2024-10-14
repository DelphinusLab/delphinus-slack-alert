import { sendAlert } from "../index";
const config = require("./slack-alert-config");

async function main() {
  const err = new Error("Test Error");
  const errorText = `Error: ${err.message}`;
  await sendAlert(errorText, config, false);
}

main();
