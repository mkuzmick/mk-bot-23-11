const OpenAI = require("openai");
const llog = require("../ll-logs");
const fs = require("fs")
const path = require("path") 

async function openAIVision({url, outputDir}) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 2000,
        messages: [
        {
            role: "user",
            content: [
                { type: "text", text: "Here is an image of the Meyers Briggs results of a series of characters in a graphic novel. Can you transcribe those results and then say some of the most interesting things you can about how the characters might relate to each other?" },
                {
                    type: "image_url",
                    image_url: {
                    "url": url,
                    },
                },
            ],
        },
        ],
    });
    console.log(response.choices[0]);
    llog.cyan(response)
    const outputPath = path.resolve(`${outputDir}/openai-vision-output.mp3`);
    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "shimmer",
        input: response.choices[0].message.content,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(outputPath, buffer);
}

exports.openAIVision = openAIVision;