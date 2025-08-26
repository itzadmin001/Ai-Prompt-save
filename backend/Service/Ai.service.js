const { GoogleGenAI } = require("@google/genai");
require('dotenv').config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});;

async function GenrateResponse(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    console.log(response.text);
    return response.text;
}

module.exports = { GenrateResponse }