const express = require('express')
const router = express.Router()
const clientAI = require('../integrations/LLM/chatGPT')

router.get('/models', async (req, res) => {
    const result = await clientAI.getModels()
    const models = result.data?.data ? result.data.data.map(model => model.id) : []
    res.json(models)
})

module.exports = {
    router
}