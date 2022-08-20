import { readFile } from "fs-extra";
import { FieldType, fields } from "solid-schema";
import yaml from "yaml";
import { Paths } from "../utils";

export const ConfigEntityMethodSchema = fields.or(
    fields.constant("get" as const),
    fields.constant("delete" as const),
    fields.constant("head" as const),
    fields.constant("options" as const),
    fields.constant("post" as const),
    fields.constant("put" as const),
    fields.constant("patch" as const)
);

export type IConfigEntityMethod = FieldType<typeof ConfigEntityMethodSchema>;

export const ConfigEntitySchema = fields.object({
    url: fields.string(),
    method: fields.nullable(ConfigEntityMethodSchema),
    headers: fields.nullable(fields.record(fields.string(), fields.string())),
});

export type IConfigEntity = FieldType<typeof ConfigEntitySchema>;

export const ConfigSchema = fields.object({
    defaults: fields.nullable(ConfigEntitySchema),
    entities: fields.array(ConfigEntitySchema),
});

export type IConfig = FieldType<typeof ConfigSchema>;

export const getConfig = async () => {
    try {
        const content = await readFile(Paths.configYaml);
        return ConfigSchema.create(yaml.parse(content.toString()));
    } catch (err) {
        throw new Error(
            `Could not parse config from ${Paths.configYaml} (${err})`
        );
    }
};
