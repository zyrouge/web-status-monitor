import axios from "axios";
import { IConfigEntity } from "./config";
import { SummarySchema } from "./summary";

export const ping = async (
    entity: IConfigEntity,
    defaults?: IConfigEntity | null
) => {
    const start = Date.now();
    let up = false;
    const url = entity.url;
    const method = entity.method ?? defaults?.method ?? "get";
    const headers = {
        "User-Agent": "Pong [bot]",
        ...defaults?.headers,
        ...entity.headers,
    };
    try {
        await axios({
            url,
            method,
            headers,
        });
        up = true;
    } catch (err) {}
    const tookMs = Date.now() - start;
    return SummarySchema.create({
        url,
        method,
        tookMs,
        up,
    });
};
