require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    TELEGRAM_KEY: process.env.TELEGRAM_KEY,
    SECRET_CODE: process.env.SECRET_CODE
}