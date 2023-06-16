const { ChatRepository } = require("../../../database/repositories/chat")
const { STATES } = require("../../LLM/chatGPT/constants")
const { BOT_USERNAME } = require("./constants")

module.exports.isRemovedFromGroupEvent = (msg) => {
    return msg.left_chat_participant && msg.left_chat_participant.username == BOT_USERNAME
}

module.exports.isAddedToGroupEvent = (msg) => {
    return msg.new_chat_participant && msg.new_chat_participant.username == BOT_USERNAME
}

module.exports.isCommandEvent = (msg) => {
    return !!msg.entities
}

module.exports.isRegisteredChat = async (chatId) => {
    const chat = await ChatRepository.getChat(chatId)
    return !!chat
}

module.exports.isAILoading = (gptClient) => {
    return gptClient.state === STATES.LOADING
}