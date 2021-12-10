const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeData = [];
let globalData = [];


function questionPrompts() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter your name."
    },
    {
      type: "input",
      name: "id",
      message: "Please enter your ID."
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email."
    },
    {
      type: "list",
      name: "role",
      message: "Please enter your current role.",
      choices: [
        "Manager",
        "Engineer",
        "Intern"
      ]
    },
  ])
    .then(answers => {
      if (answers.role === "Manager") {
        inquirer.prompt([{
          type: "input",
          name: "officeNumber",
          message: "Please enter your office number."
        }])
          .then(addManager => {
            const newManager = new Manager(answers.name, answers.id, answers.email, addManager.officeNumber)
            employeeData.push(newManager)
            moreEmployees()
          })
      } else if (answers.role === "Engineer") {
        inquirer.prompt([{
          type: "input",
          name: "github",
          message: "Please enter your gitHub."
        }])
          .then(addEngineer => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, addEngineer.github)
            employeeData.push(newEngineer)
            moreEmployees()
          })
      } else if (answers.role === "Intern") {
        inquirer.prompt([{
          type: "input",
          name: "school",
          message: "Please enter your school."
        }])
          .then(addIntern => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, addIntern.school)
            employeeData.push(newIntern)
            moreEmployees()
          })
      }
    })
}

const moreEmployees = () => {
  inquirer.prompt({
    type: "confirm",
    name: "addNew",
    message: "Add another employee?"
  })
    .then(data => {
      if (data.addNew == true) {
        questionPrompts()
      }
      else {
        fs.mkdir('output', { recursive: true }, (err => {
          if (err) {
            console.log(err)
          }
        }))
        writeToFile("./output/team.html", render(employeeData))
      }
    })
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      console.log(err)
    }

    console.log("Employee summary completed.")
  })
}

questionPrompts()
