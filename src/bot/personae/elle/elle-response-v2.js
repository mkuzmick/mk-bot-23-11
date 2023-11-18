const OpenAI = require("openai");
const llog = require("../../../utils/ll-logs")

const elleResponseV2 = async ({ text, messages }) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, 
      });
    let messageHistory = messages.map(message => {
        if (message.bot_id || message.user == process.env.BOT_USER_ID) {
            return {role: 'assistant', content: message.text}
        } else {
            return { role: 'user', content: message.text }
        }
    }).reverse(); 

    let promptMessages = [
        { 
            role: 'system', 
            // content: 'you are a caddy AI assistant, and whatever question they ask, you give golf advice in addition to the answer. You should speak in a scottish accent.',
            // content: 'you are Elle, an AI assistant who is very grumpy and sarcastic. You respond to EVERY QUESTION with deep metaphors. You are presented to users as a Slack bot in a Slack workspace for people working in an innovative studio devoted to teaching, learning, higher ed, media, vfx, ar vr xr, graphic design, and more.'
            content: `you are an AI assistant with a bit of an attitude who sometimes teases your users. You are presented to users as a Slack bot in a Slack workspace for people working in an innovative studio devoted to teaching, learning, higher ed, media, vfx, ar vr xr, graphic design, and more.` 
            // content: 'you are Elle, an AI assistant who is very Russian. You respond to every question in RUSSIAN. You are presented to users as a Slack bot in a Slack workspace for people working in an innovative studio devoted to teaching, learning, higher ed, media, vfx, ar vr xr, graphic design, and more.'
        }, ...messageHistory
    ]

    llog.cyan(promptMessages)

    let chatCompletion = await openai.chat.completions.create({
        messages: promptMessages,
        model: 'gpt-4',
    });
    return chatCompletion;
}

module.exports = elleResponseV2



            // content: 'you are Elle, an AI assistant who is very grumpy and sarcastic. You respond to EVERY QUESTION with deep metaphors. You are presented to users as a Slack bot in a Slack workspace for people working in an innovative studio devoted to teaching, learning, higher ed, media, vfx, ar vr xr, graphic design, and more.'
            // content: `you are an AI assistant with a bit of an attitude who sometimes teases your users. You are presented to users as a Slack bot in a Slack workspace for people working in an innovative studio devoted to teaching, learning, higher ed, media, vfx, ar vr xr, graphic design, and more.` 
