#!/usr/bin/env node
import inquirer from 'inquirer';

inquirer.prompt([
  {
    type: 'input',
    name: 'model',
    message: 'What is the name or path of the GPT model file?',
    default: 'gpt-3.5-turbo',
  },
  {
    type: 'number',
    name: 'maxTokens',
    message: 'What is the maximum number of tokens the chatbot should generate in a response?',
    default: 50,
  },
  {
    type: 'number',
    name: 'temperature',
    message: 'What is the temperature parameter for the GPT model?',
    default: 0.7,
  },
  {
    type: 'number',
    name: 'topP',
    message: 'What is the top-p sampling threshold for the GPT model?',
    default: 0.9,
  },
  {
    type: 'number',
    name: 'frequencyPenalty',
    message: 'What is the frequency penalty parameter for the GPT model?',
    default: 0.0,
  },
  {
    type: 'number',
    name: 'presencePenalty',
    message: 'What is the presence penalty parameter for the GPT model?',
    default: 0.0,
  },
])
.then(answers => {
  console.log(answers);
});

