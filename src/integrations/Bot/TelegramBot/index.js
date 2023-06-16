const TelegramBot = require('node-telegram-bot-api');
const config = require('../../../config');
const { messages } = require('./messages');
const { CHAT_TYPE } = require('./constants');
const { isRemovedFromGroupEvent, isCommandEvent, isRegisteredChat, isAILoading } = require('./helpers');
const { ChatRepository } = require('../../../database/repositories/chat');
const { GPTClient } = require('../../LLM/chatGPT');
const token = config.TELEGRAM_KEY;
const bot = new TelegramBot(token, {polling:true});
const clientAI = new GPTClient()

bot.on('polling_error', (error) => {
    console.log(error);
});

bot.onText(/^\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const nameUser = msg.from.first_name;
    const welcome = `¡Hola ${nameUser}!` + messages.welcome
    await bot.sendMessage(chatId, welcome);
});

bot.onText(/^\/login/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username
    const words = msg.text.split(" ")
    if(words.length <= 1){
        await bot.sendMessage(chatId, messages.loginErrorNoCode)
        return
    }
    if(words[1] !== config.SECRET_CODE){
        await bot.sendMessage(chatId, messages.loginErrorWrongCode)
        return
    }
    const chat = await ChatRepository.registerChat(chatId, username)
    if(chat){
        await bot.sendMessage(chatId, messages.loginSuccess)
    }
})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if(isCommandEvent(msg)) return
    if(isRemovedFromGroupEvent(msg)) return
    if(msg.chat.type !== CHAT_TYPE.PRIVATE){
        await bot.sendMessage(chatId, messages.rejectGroup)
        await bot.leaveChat(chatId)
        return
    }
    if(!(await isRegisteredChat(chatId))) return
    if(isAILoading(clientAI)){
        await bot.sendMessage(chatId, messages.loadingMessage)
        return
    }
    const message = msg.text
    const response = await clientAI.sendMessage(chatId, message)
    await bot.sendMessage(chatId, response)
  });