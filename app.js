const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeData = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function questionPrompts() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter your name.",
      name: "name"
    },
    {
      type: "input",
      message: "Please enter your ID.",
      name: "id"
    },
    {
      type: "input",
      message: "Please enter your email.",
      name: "email"
    },
    {
      type: "list",
      message: "Please enter your current role.",
      name: "role",
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
          message: "Please enter your office number.",
          name: "officeNumber"
        }])
          .then(addManager => {
            const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            moreEmployees()
          })
      } else if (answers.role === "Engineer") {
        inquirer.prompt([{
          type: "input",
          message: "Please enter your gitHub.",
          name: "gitHub"
        }])
          .then(addEngineer => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            moreEmployees()
          })
      } else if (answers.role === "Intern") {
        inquirer.prompt([{
          type: "input",
          message: "Please enter your school.",
          name: "school"
        }])
          .then(addIntern => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
            moreEmployees()
          })
      }
    })
}

const moreEmployees = () => {
  inquirer.prompt({
    type: "confirm",
    message: "Add another employee?",
    name: "addNew"
  })
    .then(data => {
      if (data.moreEmployees == true) {
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
