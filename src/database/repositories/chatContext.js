const ChatContext = require('../models/chatContext')
const Chat = require('../models/chat')

class ChatContextRepository{
    static async addMessageToContext(chatId, role, content) {
        const chantContext = new ChatContext({ chat: chatId, role, content })
        await chantContext.save()
        return chantContext
    }

    static async getChatContext(chatId){
        const chatHistory = await ChatContext.find({chat: chatId}).sort({createdAt: 1})
        return chatHistory.map(msg => ({role: msg.role, content: msg.content}))
    }

    static async deleteChatContext(chatId){
        return ChatContext.deleteMany({chat: chatId})
    }
}

module.exports = {
    ChatContextRepository
}