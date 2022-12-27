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

    type atmType = {
        userId: string,
        userPin: number
    };

    const atm: atmType = await inquirer.prompt([
        {
            name: "userId",
            type: "input",
            message: "Enter Your ID: "
        },
        {
            name: "userPin",
            type: "password",
            message: "Enter Your PIN: "
        },
        {
            name: "transactionType",
            type: "list",
            message: "Select Your Transaction: \n",
            choices: [
                "View Balance",
                "Deposit",
                "Withdrawal"
            ]
        }
    ]);

    console.log(chalk.cyan(`${atm.userId}`));

};