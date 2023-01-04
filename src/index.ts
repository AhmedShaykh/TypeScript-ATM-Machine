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

    startAgain();
};

await welcome();

async function myATM() {

    type atmType = {
        userId: string,
        userPin: number,
        transactionType: string,
        amount: number
    };

    let balance: number = 150000;

    const atm: atmType = await inquirer.prompt([
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
        },
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
                50000,
                140000,
                150000
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
        }
    ]);

    switch (atm.transactionType) {
        case "View Balance":
            console.log(chalk.cyan(balance));
            break;
        case "Withdrawal":
            balance = balance - atm.amount;
            if (balance === 10000) {
                console.log(chalk.yellow(balance));
                break;
            }
            else if (balance === 0) {
                console.log(chalk.red(balance));
                break;
            }
            console.log(chalk.cyan(balance));
            break;
        case "Deposit":
            balance = balance + atm.amount;
            console.log(chalk.cyan(balance));
            break;
        default:
            return;
    };

};

async function startAgain() {
    do {
        await myATM();

        var againATM = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want Continue Transaction ? Press y or n: "
        });

    } while (againATM.restart === 'y' || againATM.restart === 'Y' || againATM.restart === 'yes' || againATM.restart === 'Yes' || againATM.restart === 'YES');
};