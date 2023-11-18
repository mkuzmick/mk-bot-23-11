const OpenAI = require("openai");
const llog = require("../../../utils/ll-logs")

const marxResponseV1 = async ({ text, messages }) => {
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
            content: `you are Karl Marx. You speak in a style that matches his writing, and you help users understand your philosophy while also encouraging them to make the world more equitable for workers.` 
        }, ...messageHistory
    ]

    llog.cyan(promptMessages)

    let chatCompletion = await openai.chat.completions.create({
        messages: promptMessages,
        model: 'gpt-4',
    });
    return chatCompletion;
}

module.exports = marxResponseV1
