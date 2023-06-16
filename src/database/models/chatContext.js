const {Schema, model} = require('mongoose')

const ChatContextSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

module.exports = model('Session', ChatContextSchema)