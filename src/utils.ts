import chalk from "chalk";
import path from "path";

export class Logger {
    static log(text: string) {
        console.log(`${chalk.cyanBright("[~]")} ${text}`);
    }

    static warn(text: string) {
        console.log(`${chalk.yellowBright("[!]")} ${text}`);
    }

    static error(text: string) {
        console.log(`${chalk.redBright("[x]")} ${text}`);
    }
}

export class Paths {
    static rootDir = process.cwd();
    static configYaml = path.join(Paths.rootDir, "config.yaml");
    static summaryMd = path.join(Paths.rootDir, "summary.md");
    static templateSummaryMd = path.join(__dirname, "template/summary.md");
}
