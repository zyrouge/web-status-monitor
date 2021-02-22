import chalk from "chalk";

export const Logger = {
    log(text: string) {
        console.log(`${chalk.blue("[~]")} ${text}`);
    },
    warn(text: string) {
        console.log(`${chalk.yellow("[!]")} ${text}`);
    },
    error(text: string) {
        console.log(`${chalk.red("[X]")} ${text}`);
    }
}