#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const runAnimation = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })
};

async function welcome() {
    let animation = chalkAnimation.rainbow("Welcome to ATM Machine");
    await runAnimation();

    animation.stop();

    myATM();
};

await welcome();

async function myATM() {

    type Input = {
        userId: String;
        userPin: Number;
    }

    const userInput: Input = await inquirer.prompt([
        {
            name: "userId",
            type: "input",
            message: "Enter Your ID: "
        },
        {
            name: "userPin",
            type: "password",
            message: "Enter Your PIN: ",
            validate: (answer) => {
                if (isNaN(answer) && answer.length < 4) {
                    return "Please Enter A Number & Min 4 Digits";
                }
                else if (isNaN(answer)) {
                    return "Please Enter A Number";
                }
                else if (answer.length < 4) {
                    return "Please Enter Min 4 Digits";
                }
                return true;
            }
        }
    ]);

    const userData = {
        userId: userInput.userId,
        userPin: userInput.userPin,
    }

    while (userData) {

        const atm: { transactionType: String, amount: Number } = await inquirer.prompt([
            {
                name: "transactionType",
                type: "list",
                message: "Select Your Transaction: \n",
                choices: [
                    "View Balance",
                    "Deposit",
                    "Withdrawal"
                ],
            },
            {
                name: "amount",
                type: "list",
                message: "Select Your Amount: \n",
                choices: [
                    1000,
                    5000,
                    10000,
                    20000,
                    50000
                ],
                when(answers) {
                    return answers.transactionType == "Withdrawal"
                },
            },
            {
                name: "amount",
                type: "number",
                message: "Enter Your Amount: \n",
                when(answers) {
                    return answers.transactionType == "Deposit"
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please Enter A Number";
                    }
                    return true;
                }
            },
            // {
            //     name: "againATM",
            //     type: "confirm",
            //     message: "Do you want Continue ?: \n",
            //     default: false
            // }
        ]);

        let balance: Number = 100000;

        switch (atm.transactionType) {
            case "View Balance":
                console.log(chalk.cyan(`Your Balance: ${balance}`));
                break;
            case "Withdrawal":
                balance = atm.amount;
                console.log(chalk.cyan(`Your Amount ${atm.amount}, Your Balance: ${balance}`));
                break;
            case "Deposit":
                balance = atm.amount;
                console.log(chalk.cyan(`Your Amount ${atm.amount}, Your Balance: ${balance}`));
                break;
            default:
                return;
        };
    };
};