import axios, { Method } from "axios";
import ymlp from "yaml";
import path from "path";
import fs from "fs-extra";

import { Logger } from "./utils";
import chalk from "chalk";

const start = async () => {
    const config = await getConfig();
    for (const url of config.urls) {
        try {
            const start = Date.now();
            await axios({
                url: url.path,
                method: url.type
            });
            const end = Date.now() - start;
            Logger.log(`Pong ${chalk.blueBright(`${url.path} (${url.type})`)} in ${chalk.grey(`${end}ms`)}`)
        } catch (err) {
            Logger.error(`Pinging ${chalk.blueBright(url)} failed, reason: ${chalk.redBright(err)}`);
        }
    }
}

start();

interface Config {
    urls: {
        path: string;
        type: Method;
    }[];
}

async function getConfig(): Promise<Config> {
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