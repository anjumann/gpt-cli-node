import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';


let config = {};
let setting = {};
if (fs.existsSync('config.json')) {
    config = JSON.parse(fs.readFileSync('config.json'));
}
if (fs.existsSync('setting.json')) {
    setting = JSON.parse(fs.readFileSync('setting.json'));
}


// Change OpenAI API Key in config.json
async function changeApiKey() {
    const { openai_api_key } = await inquirer.prompt({
        type: 'input',
        name: 'openai_api_key',
        message: 'Enter your OpenAI API key:'
    });

    config.openai_api_key = openai_api_key;

    fs.writeFileSync('config.json', JSON.stringify(config));
    console.log('Config saved!');
}

// change default setting in setting.json
async function changeSetting() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'model',
            default: 'gpt-3.5-turbo',
            message: chalk.green('What is the name or path of the GPT model file?'),
        },
        {
            type: 'number',
            name: 'maxTokens',
            message: chalk.green('What is the maximum number of tokens the chatbot should generate in a response?'),
            default: 1024,
        },
        {
            type: 'number',
            name: 'temperature',
            message: chalk.green('What is the temperature parameter for the GPT model?'),
            default: 0.9,
        },
        {
            type: 'number',
            name: 'topP',
            message: chalk.green('What is the top-p sampling threshold for the GPT model?'),
            default: 0.9,
        },
        {
            type: 'number',
            name: 'frequencyPenalty',
            message: chalk.green('What is the frequency penalty parameter for the GPT model?'),
            default: 0.0,
        },
        {
            type: 'number',
            name: 'presencePenalty',
            message: chalk.green('What is the presence penalty parameter for the GPT model?'),
            default: 0.0,
        },
    ])
    console.log(answer);
    setting = answer;
    fs.writeFileSync('setting.json', JSON.stringify(setting));
}

async function showConfig() {
    console.log('Current config: ', config);
    console.log('Current setting: ', setting);

}

const apiKey = config.openai_api_key;
const setting_config = setting;

export { changeApiKey, changeSetting, showConfig, apiKey, setting_config, setting };