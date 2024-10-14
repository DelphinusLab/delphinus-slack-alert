import { textCmpPreprosessor } from "./lib";

import { WebClient } from "@slack/web-api";

export type SlackConfig = {
  channelId?: string;
  token?: string;
  timePeriod?: number;
};

export function createNewSlackClient(token: string) {
  return new WebClient(token);
}

async function sendNewMessage(token: string, text: string, channelId: string) {
  const args = {
    channel: channelId,
    text: text,
  };
  await createNewSlackClient(token).chat.postMessage(args);
}

async function fetchPreviousMessages(
  token: string,
  channelId: string,
  timePeriod: number = 0
) {
  const client = createNewSlackClient(token);
  const result = await client.conversations.history({
    channel: channelId,
  });

  const messages = result.messages;

  if (!messages) {
    return [];
  }
  const currentTimestamp = Date.now() / 1000;
  const historyMessages = messages.filter((message) => {
    if (!message.ts) {
      return false;
    }
    // Only check the timePeriod if it is set > 0, otherwise just return all values.
    if (timePeriod <= 0) {
      return true;
    }
    // Parse the timestamp from the message
    const messageTimestamp = parseFloat(message.ts);

    // Check if the message is older than the time period we are interested in
    return currentTimestamp - messageTimestamp < timePeriod;
  });
  return historyMessages;
}

export async function sendAlert(
  text: string,
  config: SlackConfig,
  printOut: boolean = true
) {
  if (printOut) {
    console.log(text);
  }

  if (!config.channelId || !config.token || !config.timePeriod) {
    console.log("Failed to alert in Slack: Invalid values in config file\n");
    return;
  }
  const prevMessages = await fetchPreviousMessages(
    config.token,
    config.channelId,
    config.timePeriod
  );
  const prevMessagesText = prevMessages.map((message) => message.text);
  // Check if the message has already been sent within the specified time period
  if (!prevMessagesText.includes(textCmpPreprosessor(text))) {
    await sendNewMessage(config.token, text, config.channelId);
  }
}
