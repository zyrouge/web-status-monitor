import axios, { Method } from "axios";
import ymlp from "yaml";
import path from "path";
import fs from "fs-extra";

import { Logger } from "./utils";
import chalk from "chalk";

const start = async () => {
    const config = await getConfig();
    const summary: ISummary[] = [];
    for (const url of config.urls) {
        let isUp: boolean;
        const start = Date.now();
        try {
            await axios({
                url: url.path,
                method: url.type,
                headers: {
                    "User-Agent": url.userAgent || config.userAgent || `Pong [bot]`
                }
            });
            Logger.log(`Pong ${chalk.blueBright(`${url.path} (${url.type})`)} in ${chalk.grey(`${Date.now() - start}ms`)}`);
            isUp = true;
        } catch (err) {
            Logger.error(`Pinging ${chalk.blueBright(url)} failed, reason: ${chalk.redBright(err)}`);
            isUp = false;
        }
        summary.push({
            path: url.path,
            type: url.type.toUpperCase(),
            timetaken: Date.now() - start,
            up: isUp
        });
    }
    Logger.log(`Finished pinging ${chalk.blueBright(config.urls.toString())} urls`);
    await renderSummary(summary);
    Logger.log("Finished rendering summary.md");
}

start();

interface IConfig {
    urls: {
        path: string;
        type: Method;
        userAgent: string;
    }[];
    userAgent: string;
}

async function getConfig(): Promise<IConfig> {
    const cp = path.join(__dirname, "..", "config.yml");
    try {
        const rc = await fs.readFile(cp);
        return ymlp.parse(rc.toString());
    } catch(err) {
        Logger.error(`Could not parse config from ${chalk.blueBright(cp)}, reason: ${chalk.redBright(err)}`);
        Logger.warn(`Exiting...`);
        return process.exit(0);
    }
}

interface ISummary {
    path: string;
    type: string;
    timetaken: number;
    up: boolean;
}

async function renderSummary(opts: ISummary[]): Promise<void> {
    const temp = path.join(__dirname, "template", "summary.md");
    const out = path.join(__dirname, "..", "summary.md");
    try {
        const rc = await fs.readFile(temp);
        const template = rc.toString();
        let sum = template.replace("<!-- State -->", opts.map(x => `- \`${x.type.toUpperCase()}\` [${x.path}](${x.path}) - **${x.up ? "Up" : "Down"}** (${x.timetaken}ms)`).join("\n"));
        sum = sum.replace("<!-- Last Updated -->", new Date().toLocaleString());
        await fs.writeFile(out, sum);
    } catch(err) {
        return Logger.error(`Could not parse template from ${chalk.blueBright(temp)}, reason: ${chalk.redBright(err)}`);
    }
}
