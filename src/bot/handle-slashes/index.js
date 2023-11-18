var Airtable = require('airtable');
var fs = require('fs');
var path = require('path');
const { llog } = require('../../utils/ll-utilities')

const blocks = [
    {
        "type": "header",
        "text": {
            "type": "plain_text",
            "text": "elle-l-bot",
            "emoji": true
        }
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "in progress"
        }
    },
    {
        "type": "divider"
    },
    
]

exports.elleSlash = async ({ command, client, ack, say }) => {
    ack();
    try {
        llog.red(command, null, 4)
        console.log(`slash elle requested: ${command.text}`)
        if (command.channel_name !== "directmessage") {
            await say({
                blocks: blocks,
                text: `this game requires blocks`
            })
        } else {
            await client.chat.postMessage({
                blocks: blocks,
                channel: command.user_id,
                text: `this game requires blocks`
            })
        }
    } catch (error) {
        llog.red(error)
    }
    
}
