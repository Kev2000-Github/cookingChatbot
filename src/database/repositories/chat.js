const Chat = require('../models/chat')

class ChatRepository{
    static async registerChat(chatId, username) {
        const chatExists = await Chat.findOne({_id: chatId})
        if(chatExists) return chatExists
        const chat = new Chat({ _id: chatId, username })
        await chat.save()
        return chat
    }

    static async getChat(chatId){
        return Chat.findOne({_id: chatId})
    }
}

module.exports = {
    ChatRepository
}