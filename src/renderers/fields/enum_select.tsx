import { SimpleSelect } from "fields/SimpleSelect/SimpleSelect";
import React, { useMemo } from "react";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";
import { RenderUnsupportedField } from "./unsupported_field";

interface RenderEnumSelectFnProps extends RenderFnProps {}

/**
 * Render select field for enums
 * * single value
 * * array
 */
export function RenderEnumSelect({
  schema,
  dataPath,
  required,
  level,
}: RenderEnumSelectFnProps) {
  const isMultiple = schema.type === "array";
  const itemSchema = isMultiple ? schema.items : schema;
  const optionValues: string[] = itemSchema.enum;
  const optionLabels: string[] | undefined = itemSchema.enumNames;
  const options = useMemo(() => {
    return optionValues.map((value, idx) => ({
      value,
      label: optionLabels?.[idx] || value,
    }));
  }, [optionLabels, optionValues]);
  if (isMultiple)
    return (
      <RenderUnsupportedField
        dataPath={dataPath}
        level={level}
        required={required}
        schema={schema}
        schemaPath={""}
      />
    );
  return (
    <div>
      <SimpleSelect
        name={dataPath}
        label={schema.title}
        labelId={`id-${schema.title}`}
        options={options}
      />
    </div>
  );
}
