const {Schema, model} = require('mongoose')

const ChatSchema = new Schema({
      _id: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true
      }
}, 
{
    timestamps: true
})

module.exports = model('Chat', ChatSchema)