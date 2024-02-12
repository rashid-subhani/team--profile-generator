const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const render = require("./src/page-template");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

// Function to prompt user for manager details
function addManager() {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the manager's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the manager's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the manager's email address:",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Enter the manager's office number:",
            },
        ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            team.push(manager);
            addTeamMember();
        });
}

// Function to prompt user for team members (Engineer or Intern)
function addTeamMember() {
    inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "Choose the team member's role:",
                choices: ["Engineer", "Intern", "Finish building the team"],
            },
        ])
        .then((answer) => {
            if (answer.role === "Engineer") {
                addEngineer();
            } else if (answer.role === "Intern") {
                addIntern();
            } else {
                generateHTML();
            }
        });
}

// Function to prompt user for engineer details
function addEngineer() {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the engineer's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the engineer's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the engineer's email address:",
            },
            {
                type: "input",
                name: "github",
                message: "Enter the engineer's GitHub username:",
            },
        ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            team.push(engineer);
            addTeamMember();
        });
}

// Function to prompt user for intern details
function addIntern() {
    inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the intern's name:",
            },
            {
                type: "input",
                name: "id",
                message: "Enter the intern's employee ID:",
            },
            {
                type: "input",
                name: "email",
                message: "Enter the intern's email address:",
            },
            {
                type: "input",
                name: "school",
                message: "Enter the intern's school:",
            },
        ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            team.push(intern);
            addTeamMember();
        });
}

// Function to generate HTML file
function generateHTML() {
    const htmlContent = render(team);

    if (!fs.existsSync("./output")) {
        fs.mkdirSync("./output");
    }

    fs.writeFile("./output/team.html", htmlContent, (err) => {
        if (err) throw err;
        console.log("HTML file generated successfully in the 'output' folder.");
    });
}

// Start the application by adding the manager
addManager();
