import chalk from "chalk";
import { generateSummary, getConfig, ISummary } from "./core";
import { ping } from "./core/ping";
import { Logger, Paths } from "./utils";

const start = async () => {
    try {
        const config = await getConfig();
        const summary: ISummary[] = [];
        for (const x of config.entities) {
            const result = await ping(x, config.defaults);
            Logger.log(
                `Site ${
                    result.up
                        ? chalk.greenBright("up")
                        : chalk.redBright("down")
                }: ${chalk.cyanBright(
                    `${result.url} (${result.method.toUpperCase()})`
                )} in ${chalk.cyanBright(`${result.tookMs}ms`)}!`
            );
            summary.push(result);
        }
        Logger.log(
            `Finished pinging ${chalk.cyanBright(config.entities.length)} urls!`
        );
        await generateSummary(summary);
        Logger.log(
            `Generated summary at ${chalk.cyanBright(Paths.summaryMd)}!`
        );
    } catch (err: any) {
        Logger.error(`Something went wrong! (${chalk.redBright(err)})`);
        process.exit(1);
    }
};

start();
