const { Configuration, OpenAIApi } = require("openai");
const config = require('../../config.json');

const configuration = new Configuration({
  apiKey: config.apiKey,
});

const openai = new OpenAIApi(configuration);


async function sendDataToApi(prompt) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 1000,
    n: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.data.choices[0].text;
}

async function openAIRequest(prompt) {

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    temperature: 0.5,
  });
  return response.data.choices[0].text;
}

function getPromptFunction(promptName) {
   const likeTemplate = require('../prompts/like-template.js');

   const promptFunctions = {
    'like-template': likeTemplate,
   };

   if (promptFunctions[promptName]) {
    return promptFunctions[promptName];
  } else {
    throw new Error(`Prompt function not found: ${promptName}`);
  }
}

module.exports = {
  sendDataToApi,
  openAIRequest,
  getPromptFunction
};
