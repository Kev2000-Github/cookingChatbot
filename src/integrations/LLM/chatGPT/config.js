const { Configuration, OpenAIApi } = require("openai");
const config = require("../../../config");

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const client = new OpenAIApi(configuration);
module.exports = {
  client
}