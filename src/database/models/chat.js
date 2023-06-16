const {Schema, model} = require('mongoose')

const ChatSchema = new Schema({
      chatId: {
        type: String,
        required: true
      }
}, 
{
    timestamps: true
})

module.exports = model('Session', ChatSchema)