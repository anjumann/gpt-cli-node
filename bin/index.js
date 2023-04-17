import fs from 'fs';
import inquirer from 'inquirer';
import { Configuration, OpenAIApi } from 'openai';
import chalk from 'chalk';
import { changeApiKey, changeSetting, showConfig, setting_config, apiKey } from './utils/index.js';

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

// Chat with OpenAI API
async function chat() {
  let prompt = '';

  if (setting.config) {
    setting = setting.config;
  } else {
    console.log('Please set your setting first (Can be updated anytime).');
    await changeSetting()
  }
  if (!apiKey) {
    console.log('Please set your OpenAI API key first (Can be updated anytime).');
    await changeApiKey()
  }



}


// Start the CLI application
prompt();