"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const prompts_1 = require("./prompts");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const path = require('path');
// --- FIX 1: Check for API Key ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("The API_KEY environment variable is not set.");
}
const ai = new generative_ai_1.GoogleGenerativeAI(apiKey);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path.join(__dirname, '../public')));
/* connectDB(); */
app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
// ---- TEMPLATE ENDPOINT ----
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // (No changes needed in this endpoint as it doesn't use the 'messages' array)
    try {
        const userPrompt = req.body.prompt;
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const fullPrompt = `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra. Here is the user's description: "${userPrompt}"`;
        const result = yield model.generateContent(fullPrompt);
        const response = result.response;
        const answer = response.text().trim().toLowerCase();
        if (answer === "react") {
            res.json({
                prompts: [
                    prompts_1.BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [react_1.basePrompt],
            });
            return;
        }
        if (answer === "node") {
            res.json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [node_1.basePrompt],
            });
            return;
        }
        res.status(403).json({ message: "Could not determine project type. Please try again." });
    }
    catch (error) {
        console.error("Error in /template endpoint:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// ---- CHAT ENDPOINT ----
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Apply the ChatMessage type here
        const messages = req.body.messages;
        const model = ai.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: (0, prompts_1.getSystemPrompt)(),
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
        const result = yield chat.sendMessage(lastMessage.parts);
        const response = result.response;
        res.json({
            response: response.text(),
        });
    }
    catch (error) {
        console.error("Error in /chat endpoint:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
