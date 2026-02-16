const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API KEY found in .env.local");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // There isn't a direct listModels on genAI instance in basic usage, 
        // but we can try to use a model to check if it works or use the model manager if exposed.
        // Actually, the SDK doesn't always expose listModels directly on the main class in all versions.
        // Let's try to just instantiate a model and run a simple text prompt to verify basic connectivity first.

        console.log("Testing gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.5-flash:", error.message);
    }

    try {
        console.log("Testing gemini-1.0-pro...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.0-pro:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-1.0-pro:", error.message);
    }

    try {
        console.log("Testing gemini-2.0-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-2.0-flash:", result.response.text());
    } catch (error) {
        console.error("Error with gemini-2.0-flash:", error.message);
    }
}

listModels();
