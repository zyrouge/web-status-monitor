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
        let isUp: boolean, timetaken: number | undefined;
        try {
            const start = Date.now();
            await axios({
                url: url.path,
                method: url.type
            });
            const end = Date.now() - start;
            Logger.log(`Pong ${chalk.blueBright(`${url.path} (${url.type})`)} in ${chalk.grey(`${end}ms`)}`);
            isUp = true;
            timetaken = end;
        } catch (err) {
            Logger.error(`Pinging ${chalk.blueBright(url)} failed, reason: ${chalk.redBright(err)}`);
            isUp = false;
        }
        summary.push({
            path: url.path,
            type: url.type.toUpperCase(),
            timetaken, up: isUp
        });
    }
}

start();

interface IConfig {
    urls: {
        path: string;
        type: Method;
    }[];
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
    timetaken?: number;
    up: boolean;
}

async function renderSummary(opts: ISummary[]): Promise<void> {
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