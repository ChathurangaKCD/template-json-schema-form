import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-final-form";
import { FieldArray, useFieldArray } from "react-final-form-arrays";
import { useFormSchema } from "../form/schema_context";
import {
  ArrayRendererProps,
  RenderFnProps,
} from "../interfaces/renderers.interfaces";
import { getSchemaSubPath, getUiSubPath } from "../utils/schema_path_utils";
import { RenderEnumSelect } from "./fields/enum_select";
import { RenderUnsupportedField } from "./fields/unsupported_field";
import { SchemaRenderer } from "./schema_renderer";

/**
 * Render Array Type
 * * input arrays => render item schema
 * * nested object/array arrays => render item schema
 * * enum selection => multi select (alt: checkbox group)
 * * fixed item arrays => render each item schema
 * @param {*} param0
 */
export function ArrayRenderer({
  dataPath,
  schemaPath,
  required,
  level,
}: ArrayRendererProps) {
  const { schema } = useFormSchema(schemaPath);
  const renderData = {
    schema,
    dataPath,
    required,
    schemaPath,
    level,
  };
  if (Array.isArray(schema.items)) {
    return renderFixedItemList(renderData);
  } else if (schema.items.enum) {
    return <RenderEnumSelect {...renderData} />;
  } else return <RenderNestedArray {...renderData} />;
}

interface RenderNestedArrayProps extends RenderFnProps {}

const nestedArrayValidatoors = ["isArray", "minItems", "maxItems"];

function RenderNestedArray({
  schema,
  level,
  dataPath,
  schemaPath,
}: RenderNestedArrayProps) {
  const { title } = schema;
  const formApi = useForm();
  const { fields } = useFieldArray(dataPath, {
    subscription: { length: true },
  });
  return (
    <>
      {/* subscribe only to array length;
        if reordering needed subscribe to value */}
      <Grid container>
        {fields.map((name, idx) => {
          return (
            <>
              <Grid item xs={9}>
                <SchemaRenderer
                  dataPath={name}
                  schemaPath={getSchemaSubPath(schemaPath, "items")}
                  level={level + 1}
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => fields.remove(idx)}>X</Button>
              </Grid>
            </>
          );
        })}
        <Grid item xs={9} />
        <Grid item xs={3}>
          <Button onClick={() => fields.push(undefined)}>Add item</Button>
        </Grid>
      </Grid>
    </>
  );
}

interface RenderFixedItemListProps extends RenderFnProps {}

function renderFixedItemList(props: RenderFixedItemListProps) {
  return <RenderUnsupportedField {...props}></RenderUnsupportedField>;
}
