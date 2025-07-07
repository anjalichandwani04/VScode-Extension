"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPENAI_API_KEY = exports.buildStatusBarItem = exports.getFileExtension = exports.setNewAPIKey = exports.getConfValue = exports.validateChatPayload = exports.validatePayload = exports.createChatPayload = exports.createPayload = exports.initAuth = void 0;
const vscode = require("vscode");
const OPENAI_API_KEY = "OPENAI_API_KEY";
exports.OPENAI_API_KEY = OPENAI_API_KEY;
const initAuth = async (context) => {
    console.log('init');
    let apiKey = await context.secrets.get(OPENAI_API_KEY);
    if (process.env["OPENAI_TOKEN"]) {
        apiKey = process.env["OPENAI_TOKEN"];
    }
    console.log(apiKey);
    console.log(process.env);
    if (!apiKey) {
        console.log("API Key doesn't exist in secret storage");
        apiKey = await setNewAPIKey(context);
    }
    const config = { apiKey };
    let org = getConfValue('org');
    if (org) {
        config.organization = org;
    }
    return config;
};
exports.initAuth = initAuth;
const getConfValue = (key) => vscode.workspace.getConfiguration('GILT').get(key);
exports.getConfValue = getConfValue;
const setNewAPIKey = async (context) => {
    const inputBoxOptions = {
        title: "Please enter your OpenAI API Key",
        prompt: "Store your API Key in secret storage",
        password: true,
        ignoreFocusOut: true
    };
    const secret = await vscode.window.showInputBox(inputBoxOptions);
    if (!secret) {
        vscode.window.showWarningMessage('No API Key received.');
        return "";
    }
    await context.secrets.store(OPENAI_API_KEY, secret);
    return secret;
};
exports.setNewAPIKey = setNewAPIKey;
const buildStatusBarItem = () => {
    const statusBarItem = vscode.window.createStatusBarItem();
    statusBarItem.name = "GILT";
    statusBarItem.text = `$(hubot) AI Explanation`;
    statusBarItem.command = "GILT.createExp";
    statusBarItem.tooltip = "Ask AI to help you understand code.";
    return statusBarItem;
};
exports.buildStatusBarItem = buildStatusBarItem;
const getFileExtension = (file) => {
    let activeFile = file;
    let filePathParts = activeFile.split('.');
    return filePathParts[filePathParts.length - 1];
};
exports.getFileExtension = getFileExtension;
const createChatPayload = (type, message) => {
    let payload;
    switch (type) {
        case ("chat"):
        default:
            payload = {
                "model": getConfValue('chatModel'),
                "messages": message,
                "max_tokens": getConfValue('maxTokens'),
                "temperature": getConfValue('temperature')
            };
            break;
    }
    return payload;
};
exports.createChatPayload = createChatPayload;
const createPayload = (type, prompt) => {
    let payload;
    switch (type) {
        case ("code"):
            payload = {
                "model": getConfValue('codeModel'),
                "prompt": prompt,
                "max_tokens": getConfValue('codeMaxTokens'),
                "temperature": getConfValue('codeTemperature'),
            };
            break;
        case ('text'):
        default:
            payload = {
                "model": getConfValue('model'),
                "prompt": prompt,
                "max_tokens": getConfValue('maxTokens'),
                "temperature": getConfValue('temperature'),
            };
    }
    return payload;
};
exports.createPayload = createPayload;
const validatePayload = (payload) => {
    let reason = "";
    let isValid = true;
    if (!payload.temperature || payload.temperature < 0 || payload.temperature > 1) {
        reason = "Temperature must be between 0 and 1, please update your settings";
        isValid = false;
    }
    if (!payload.max_tokens || payload.max_tokens < 1 || payload.max_tokens >= 4000) {
        reason = "Max tokens must be between 1 and 4000, please update your settings";
        isValid = false;
    }
    if (!payload.model) {
        reason = "GPT Model missing, please update your settings";
        isValid = false;
    }
    return { isValid, reason };
};
exports.validatePayload = validatePayload;
const validateChatPayload = (payload) => {
    let reason = "";
    let isValid = true;
    if (!payload.temperature || payload.temperature < 0 || payload.temperature > 1) {
        reason = "Temperature must be between 0 and 1, please update your settings";
        isValid = false;
    }
    if (!payload.max_tokens || payload.max_tokens < 1 || payload.max_tokens >= 4000) {
        reason = "Max tokens must be between 1 and 4000, please update your settings";
        isValid = false;
    }
    if (!payload.model) {
        reason = "GPT Model missing, please update your settings";
        isValid = false;
    }
    return { isValid, reason };
};
exports.validateChatPayload = validateChatPayload;
//# sourceMappingURL=utils.js.map