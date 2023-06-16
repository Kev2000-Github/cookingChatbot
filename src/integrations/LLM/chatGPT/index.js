const { client } = require("./config")

module.exports.getModels = async () => {
    return client.listModels();
}

module.exports.getCompletionsFromMessages = async ({messages, model = "gpt-3.5-turbo"}) => {
    const context = [...messages]
    const completion = await openai.createChatCompletion({
        model,
        messages: context,
        temperature: 1
      });
      return completion.data.choices[0].message['content']    
}

