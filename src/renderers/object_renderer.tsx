import { Grid } from "@material-ui/core";
import React, { useMemo } from "react";
import { useFormSchema } from "../form/schema_context";
import { ObjectRendererProps } from "../interfaces/renderers.interfaces";
import { getDataSubPath, getSchemaSubPath } from "../utils/schema_path_utils";
import { SchemaRenderer } from "./schema_renderer";

/**
 * Render Object Type
 * @param {*} param0
 */
export function ObjectRenderer({
  dataPath,
  schemaPath,
  level,
}: ObjectRendererProps) {
  const { schema } = useFormSchema(schemaPath);
  const { title, required, properties: schemaObj } = schema;
  const isRequired = useMemo(() => {
    const map = new Map<string, boolean>();
    if (Array.isArray(required)) {
      required.forEach((field) => {
        map.set(field, true);
      });
    }
    return (key: string) => map.get(key) || false;
  }, [required]);
  return (
    <Grid container>
      <Grid xs={12}>{title}</Grid>
      {Object.keys(schemaObj).map((key) => {
        const schemaSubPath = getSchemaSubPath(schemaPath, `properties.${key}`);
        const dataSubPath = getDataSubPath(dataPath, key);
        return (
          <Grid item xs={12}>
            <SchemaRenderer
              dataPath={dataSubPath}
              schemaPath={schemaSubPath}
              level={level + 1}
              required={isRequired(key)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
