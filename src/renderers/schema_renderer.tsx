import React from "react";
import { useFormSchema } from "../form/schema_context";
import { SchemaRendererProps } from "../interfaces/renderers.interfaces";
import { ArrayRenderer } from "./array_renderer";
import { RenderUnsupportedField } from "./fields/unsupported_field";
import { ObjectRenderer } from "./object_renderer";
import { TypeRenderer } from "./type_renderer";

/**
 * Render whole/sub schema
 * @param {*} param0
 */
export function SchemaRenderer({
  dataPath = "",
  schemaPath = "",
  level = 0,
  required = false,
}: SchemaRendererProps) {
  const { schema } = useFormSchema(schemaPath);
  const props = { dataPath, schemaPath, level, required };
  if (schema.type) {
    switch (schema.type) {
      case "object":
        return <ObjectRenderer key={dataPath} {...props} />;
      case "array":
        return <ArrayRenderer key={dataPath} {...props} />;
      default:
        return <TypeRenderer key={dataPath} {...props} />;
    }
  }
  return <RenderUnsupportedField key={dataPath} {...props} schema={schema} />;
}
