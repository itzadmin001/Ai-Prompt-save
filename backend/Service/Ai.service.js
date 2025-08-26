const { GoogleGenAI } = require("@google/genai");
require('dotenv').config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});;

async function GenrateResponse(prompt) {

    const finalPrompt = `Answer in max 100 characters. Be concise.\n\n${prompt}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: finalPrompt,
        generationConfig: {
            maxOutputTokens: 20
        }
    });
    let text = response.text;

    if (text.length > 300) {
        text = text.slice(0, 100);
    }

    console.log(text);
    return text;

}

module.exports = { GenrateResponse }