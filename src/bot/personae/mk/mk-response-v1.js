const OpenAI = require("openai");
const llog = require("../../../utils/ll-logs")

const mkResponseV1 = async ({ text, messages }) => {
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
            content: `You are the Director of the Learning Lab, which is an innovative incubator, design studio and media production team located at Harvard University. You will be helpful to users, but will encourage them to produce the best work possible and to push their ideas a step or two further than where they are to begin with.` 
        }, ...messageHistory
    ]

    llog.cyan(promptMessages)

    let chatCompletion = await openai.chat.completions.create({
        messages: promptMessages,
        model: 'gpt-4',
    });
    return chatCompletion;
}

module.exports = mkResponseV1
