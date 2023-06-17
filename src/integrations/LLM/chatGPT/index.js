const { ChatContextRepository } = require("../../../database/repositories/chatContext");
const { ROLES, STATES } = require("./constants");
const { Configuration, OpenAIApi } = require("openai");
const config = require("../../../config");
const { context: systemContext } = require('../context')

class GPTClient {
    constructor() {
        const configuration = new Configuration({
          apiKey: config.OPENAI_API_KEY,
        });
        this.client = new OpenAIApi(configuration);
        this.state = STATES.READY
    }

    async getModels() {
        return this.client.listModels();
    }

    async getCompletionsFromMessages(messages, model) {
    const context = {role: ROLES.SYSTEM, content: systemContext}
    const history = [context, ...messages]

    const completion = await this.client.createChatCompletion({
        model,
        messages: history,
        temperature: 0.3
      });
      return completion.data.choices[0].message['content']    
    }

    async sendMessage(chatId, message, model = "gpt-3.5-turbo") {
        this.state = STATES.LOADING
        try{
            const chatContext = await ChatContextRepository.getChatContext(chatId)
            const newMessage = {role: ROLES.USER, content: message}
            const messages = [...chatContext, newMessage] ?? [newMessage]
            await ChatContextRepository.addMessageToContext(chatId, ROLES.USER, message)
            const response = await this.getCompletionsFromMessages(messages, model)
            await ChatContextRepository.addMessageToContext(chatId, ROLES.ASSISTANT, response)
            const filteredEndingResponse = await this.processEndingResponse(chatId, response)
    
            this.state = STATES.READY
            return filteredEndingResponse    
        }
        catch(error){
            console.error(error.response.status, error.response.data)
            this.state = STATES.READY
            return "ERROR with OpenAI request..."
        }
    }

    async processEndingResponse(chatId, response) {
        const filteredResponse = response.split("<close>")
        if(filteredResponse.length <= 1) return response
        await ChatContextRepository.deleteChatContext(chatId)
        return filteredResponse[0]
    }
}

module.exports = {
    GPTClient
}