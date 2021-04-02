import YAML from "yaml";

export function getYamlFromJSON(data: Record<string, any>) {
  return YAML.stringify(data);
}

export function convertYamlToJSON(yaml: string): unknown {
  try {
    return YAML.parse(yaml);
  } catch (e) {
    throw new Error("Failed to parse yaml");
  }
}
