import axios from 'axios';
import { textCmpPreprosessor } from './lib';

export type slackConfig = {
    active: boolean,
    channelId?: string,
    token?: string,
    timePeriod?: number
};

async function requestSlackHelper(method: string, url: string, params: any, data: any, token: string) {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token,
    };
    try {
        const res = await axios({
            method,
            url,
            params,
            headers,
            data
        });
        if (!res.data.ok) {
            throw new Error('Failed to alert in Slack: ' + res.data.error);
        };
        return res.data;
    } catch(e) {
        console.log(e);
    }
}

async function fetchHistoryMessages(token: string, channelId: string, timePeriod: number) {
    const url = "https://slack.com/api/conversations.history";
    const params = {
        'channel': channelId
    };
    const historyMsg = (await requestSlackHelper('GET', url, params, {}, token)).messages;
    const localTimeStamp = Math.floor(new Date().getTime() / 1000);
    const historyMsgInRange = historyMsg.filter((msg: { "ts": string }) => localTimeStamp - Number(msg.ts) < timePeriod);
    return historyMsgInRange.map((msg: {"text": string}) => msg.text.replace(/\s/gm, ''));
}

async function sendNewMessage(token: string, text: string, channelId: string) {
    const url = "https://slack.com/api/chat.postMessage";
    const data = {
        channel: channelId,
        text: text
    };
    await requestSlackHelper('POST', url, {}, data, token);
}

export async function sendAlert(text: any, config: slackConfig, printOut: boolean = true) {
    const newMessage = text.toString() + '.\n' + text.stack ? text.stack : '';
    if(printOut) {
        console.log(newMessage);
    }
    if(!config.active) {
        return;
    } 
    if(!config.channelId || !config.token || !config.timePeriod) {
        console.log('Failed to alert in Slack: Invalid values in config file\n');
        return;
    }
    const historyMessages = await fetchHistoryMessages(config.token, config.channelId, config.timePeriod);
    if(!historyMessages.includes(textCmpPreprosessor(newMessage))) {
        await sendNewMessage(config.token, newMessage, config.channelId);
    };
}
