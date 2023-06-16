const Chat = require('../models/chat')

class ChatRepository{
    static async registerChat(chatId) {
        const chatExists = await Chat.findOne({chatId})
        if(chatExists) return chatExists
        const chat = new Chat({ chatId })
        await chat.save()
        return chat
    }

    static async getChat(chatId){
        return Chat.findOne({chatId})
    }
}

module.exports = {
    ChatRepository
}