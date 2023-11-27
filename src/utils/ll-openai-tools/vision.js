import OpenAI from "openai";
 
async function main({ image_url, text }) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
        {
            role: "user",
            content: [
            { type: "text", text: text ? text : "What’s in this image?" },
            {
                type: "image_url",
                image_url: {
                "url": image_url,
                },
            },
            ],
        },
        ],
    });
    return ({ response: response, text: response.choices[0]});
}

module.exports = main;