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
        userId: number,
        userPin: number,
        accountType: string,
        transactionType: string,
        amount: string
    };

    const atm: atmType = await inquirer.prompt([
        {
            name: "userId",
            type: "number",
            message: "Enter Your ID: ",
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please Enter A Number";
                }
                return true;
            }
        },
        {
            name: "userPin",
            type: "password",
            message: "Enter Your PIN: ",
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please Enter A Number";
                }
                return true;
            }
        },
        {
            name: "accountType",
            type: "list",
            message: "Select Your Account: \n",
            choices: [
                "Current",
                "Saving"
            ]
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
            when(answers) {
                return answers.accountType
            },
        },
        {
            name: "amount",
            type: "list",
            message: "Select Your Amount: \n",
            choices: [
                1000,
                2000,
                10000,
                20000
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

    // if (atm.userId && atm.userPin) {

    const balance: number = 150000;

    if (atm.transactionType == "View Balance") {
        console.log(balance);
    }

    // }

    return await atmMachine(atm.userId, atm.userPin, atm.transactionType, atm.amount, balance, atm.accountType)

};

const atmMachine = async (userId: number, userPin: number, transactionType: string, amount: string, balance: number, accountType: string) => {

    switch ()
}