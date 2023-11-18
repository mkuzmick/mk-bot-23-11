const { llog } = require('../../utils/ll-utilities');
const elleResponseV1 = require('../personae/elle/elle-response-v1');
const elleResponseV2 = require('../personae/elle/elle-response-v2');

const testBots = {
    elle_23_11: "C065C4G6NDC"
}

exports.testing = async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`the bot is running, <@${message.user}>!`);
}

exports.parseAll = async ({ client, message, say }) => {
    llog.magenta(`parsing all messages, including this one from ${message.channel}`)
    if (BOT_CONFIG.channels.includes(message.channel)) {
        llog.blue(`handling message because ${message.channel} is one of \n${JSON.stringify(BOT_CONFIG.channels, null, 4)}`)
        llog.yellow(message)
    } else if ( message.channel_type == "im" ) {
        llog.magenta(`handling message because ${message.channel} is a DM`)
        llog.yellow(message)
        let result = await client.conversations.history({channel: message.channel, limit: 10})
        llog.magenta(result)
        // let openAiResult = await elleResponseV1({ text: message.text, messages: result.messages });
        let openAiResult = await elleResponseV2({ text: message.text, messages: result.messages });
        llog.magenta(openAiResult)
        let slackResult = await say(openAiResult.choices[0].message.content);
    } else if (message.channel == "C060Z16VA4S") {
        llog.blue(`handling message in hackmd-to-pdf channel`, message);
        // if (message.blocks && message)
    } else {
        llog.magenta(`some other message we aren't handling now--uncomment message-handler line 27 to get the json`)
        llog.blue(`message wasn't in array ${JSON.stringify(BOT_CONFIG.channels, null, 4)}`)
        llog.yellow(message)
    }
}

