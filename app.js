const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const employees = [];

function createManager() {
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your manager\'s name?'
  }, 
  {
    type: 'input',
    name: 'id',
    message: 'What is your manager\'s ID number?'
  }, 
  {
    type: 'input',
    name: 'email',
    message: 'What is your manager\'s email address?'
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your manager\'s office number?'
  }
])
.then(response => {
    let manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    // console.log(manager);
    employees.push(manager);
    addEmployee();
    }   
)}

function addEmployee() {
inquirer.prompt([
  {
    type: 'list',
    name: 'role',
    message: 'What type of team member do you want to add?',
    choices: ['Engineer', 'Intern', 'Done adding employees']
  }
])
.then(response => {
    switch (response.role) {
        case 'Engineer':
            addEngineer();
            break;
        case 'Intern':
            addIntern();
            break;
        case 'Done adding employees':
            generateHtml();
            break;
     }
   })
}

function addEngineer() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your engineer\'s name?'
    }, 
    {
        type: 'input',
        name: 'id',
        message: 'What is your engineer\'s ID number?'
    }, 
    {
        type: 'input',
        name: 'email',
        message: 'What is your engineer\'s email address?'
    }, 
    {
        type: 'input',
        name: 'gitHub',
        message: 'What is your engineer\'s GitHub username?'
    }
    ])
    .then(response => {
        let engineer = new Engineer(response.name, response.id, response.email, response.gitHub);
        // console.log(engineer);
        employees.push(engineer);
        addEmployee();
    }
)}


function addIntern() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your intern\'s name?'
    }, 
    {
        type: 'input',
        name: 'id',
        message: 'What is your intern\'s ID number?'
    }, 
    {
        type: 'input',
        name: 'email',
        message: 'What is your intern\'s email address?'
    }, 
    {
        type: 'input',
        name: 'school',
        message: 'What is the name of your intern\'s school?'
    }
    ])
    .then(response => {
        let intern = new Intern(response.name, response.id, response.email, response.school);
        // console.log(intern);
        employees.push(intern);
        addEmployee();
    }
)}

function generateHtml() {
    fs.writeFile(outputPath, render(employees), (err) => {
        if (err) throw err
    })
}

createManager();
