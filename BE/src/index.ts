require("dotenv").config();
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import cors from "cors";
import connectDB from "./db";
const path = require('path');

// --- FIX 1: Check for API Key ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("The API_KEY environment variable is not set.");
}
const ai = new GoogleGenerativeAI(apiKey);

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))

/* connectDB(); */

app.get('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/index.html'))
})

// --- FIX 2: Define a type for incoming chat messages ---
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

// ---- TEMPLATE ENDPOINT ----
app.post("/template", async (req, res) => {
    // (No changes needed in this endpoint as it doesn't use the 'messages' array)
    try {
        const userPrompt = req.body.prompt;
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const fullPrompt = `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra. Here is the user's description: "${userPrompt}"`;

        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const answer = response.text().trim().toLowerCase();

        if (answer === "react") {
            res.json({
                prompts: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [reactBasePrompt],
            });
            return;
        }

        if (answer === "node") {
            res.json({
                prompts: [
                     `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [nodeBasePrompt],
            });
            return;
        }

        res.status(403).json({ message: "Could not determine project type. Please try again." });

    } catch (error) {
        console.error("Error in /template endpoint:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ---- CHAT ENDPOINT ----
app.post("/chat", async (req, res) => {
    try {
        // Apply the ChatMessage type here
        const messages: ChatMessage[] = req.body.messages;
        
        const model = ai.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: getSystemPrompt(), 
        });

        // TypeScript now understands the structure of 'msg'
        const formattedMessages = messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user", 
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: formattedMessages.slice(0, -1),
        });

        const lastMessage = formattedMessages[formattedMessages.length - 1];
        const result = await chat.sendMessage(lastMessage.parts);
        const response = result.response;
        
        res.json({
            response: response.text(),
        });

    } catch (error) {
        console.error("Error in /chat endpoint:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});