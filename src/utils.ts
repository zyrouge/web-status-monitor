import chalk from "chalk";

export class Logger {
    static log(text: string) {
        console.log(`${chalk.blue("[~]")} ${text}`);
    }

    static warn(text: string) {
        console.log(`${chalk.yellow("[!]")} ${text}`);
    }

    static error(text: string) {
        console.log(`${chalk.red("[X]")} ${text}`);
    }
}
