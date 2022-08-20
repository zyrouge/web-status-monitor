import { readFile, writeFile } from "fs-extra";
import { FieldType, fields } from "solid-schema";
import { Paths } from "../utils";

export const SummarySchema = fields.object({
    url: fields.string(),
    method: fields.string(),
    tookMs: fields.number(),
    up: fields.boolean(),
});

export type ISummary = FieldType<typeof SummarySchema>;

export const generateSummary = async (results: ISummary[]) => {
    try {
        const template = (await readFile(Paths.templateSummaryMd)).toString();
        const variables: Record<string, string> = {
            lastUpdated: new Date().toLocaleString(),
            state: results
                .map(
                    (x) =>
                        `- \`${x.method.toUpperCase()}\` [${x.url}](${
                            x.url
                        }) - **${x.up ? "Up" : "Down"}** (${x.tookMs}ms)`
                )
                .join("\n"),
        };
        await writeFile(
            Paths.summaryMd,
            template.replaceAll(/{{\s*(\w+)\s*}}/g, (_, key) => variables[key])
        );
    } catch (err) {
        throw new Error(
            `Could not parse template from ${Paths.templateSummaryMd}, (${err})`
        );
    }
};
