#!/usr/bin/env node
import inquirer from 'inquirer';

const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Are you sure?',
    },
    {
      type: 'list',
      name: 'fruit',
      message: 'What is your favorite fruit?',
      choices: ['Apple', 'Banana', 'Cherry'],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
  });
  