const {Schema, model} = require('mongoose')

const ChatContextSchema = new Schema({
    chat: {
        type: String,
        ref: 'Chat'
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
},
{
    timestamps: true
})

module.exports = model('ChatContext', ChatContextSchema)