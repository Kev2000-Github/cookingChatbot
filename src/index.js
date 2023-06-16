const express = require('express')
const cors = require('cors');
const config = require('./config');
require('./database')
require('./integrations/Bot/TelegramBot')
const app = express();

app.use(cors())

app.listen(config.port, () => {
    console.log(`Server up on port ${config.port}`)
})