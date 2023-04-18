import fs from 'fs';
import inquirer from 'inquirer';
import { Configuration, OpenAIApi } from 'openai';
import readline from 'readline';
import { changeApiKey, changeSetting, showConfig, setting_config, apiKey } from './utils/index.js';

// import chalk from 'chalk';

// Set up readline interface for command-line input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const {model,maxTokens, temperature  ,topP, frequencyPenalty, presencePenalty  } = setting_config;


// Load configuration from config & setting json file
let config = {};
let setting = {};
if (fs.existsSync('config.json')) {
  config = JSON.parse(fs.readFileSync('config.json'));
}
if (fs.existsSync('setting.json')) {
  setting = JSON.parse(fs.readFileSync('setting.json'));
}



// openai initialised with default configuration
const configuration = new Configuration({
  apiKey: apiKey
});
const openai = new OpenAIApi(configuration);



// Interactive command prompt
async function prompt() {
  const { choice } = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: [
      { name: 'Chat', value: 'chat' },
      { name: 'Change Default setting', value: 'change_setting' },
      { name: 'Change OpenAI API Key', value: 'change_key' },
      { name: 'Show Config', value: 'show_config' },
      { name: 'Quit', value: 'quit' }
    ]
  });

  if (choice === 'chat') {
    await chat();
  } else if (choice === 'change_key') {
    await changeApiKey();
  } else if (choice === 'change_setting') {
    await changeSetting();
  } else if (choice === 'show_config') {
    await showConfig();
  } else if (choice === 'quit') {
    console.log('Goodbye!');
    process.exit(0);
  }
}

// function to generate chatbot response using OpenAI's GPT-3 language model
async function generateResponse(message) {
  // Create a completion request
  const response = await openai.createChatCompletion({
    model: model,
    messages: message,
    maxTokens: maxTokens,
    temperature: temperature,
    topP: topP,
    frequencyPenalty: frequencyPenalty,
    presencePenalty: presencePenalty
  });
  return response.data.choices[0].message.content;
}

// Chat with OpenAI API
async function chat() {
  
  // if (!setting_config ) {
  //   console.log('Please set your setting first (Can be updated anytime).');
  //   await changeSetting()
  // }
  // if (!apiKey) {
  //   console.log('Please set your OpenAI API key first (Can be updated anytime).');
  //   await changeApiKey()
  // }

  // let prompt = '';
  // while (true) {
  //   let message = []
  //   const input = await new Promise(resolve => {
  //     rl.question('> ', resolve)
  //   });

  //   if (input === 'exit') {
  //     exit(0);
  //   }

  //   message.push({ role: "system", content: "answer as concisely as possible. act like chatgpt " })
  //   message.push({ role: "user", content: input })
  //   const response = await generateResponse(message);
  //   message.push({ role: "system", content: response })

  //   console.log(`Bot:\n ${response}`);
  // }
  console.log('Chatting with OpenAI API');
}


// Start the CLI application
prompt();

export {prompt};