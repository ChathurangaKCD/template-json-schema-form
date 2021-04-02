import { TextInput } from "fields/TextInput/TextInput";
import React from "react";
import { Schema } from "../../interfaces/form.interfaces";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";
import { useGetValidators } from "../../utils/validators";

interface RenderNumberInputFnProps extends RenderFnProps {}

const numberValidators = ["minimum", "maximum"];

export function RenderNumberInput({
  dataPath,
  schemaPath,
  level,
  required,
  schema,
}: RenderNumberInputFnProps) {
  const validators = useGetValidators(schema, numberValidators, required);
  // const s = parseNumberInputSchema(schema, required);
  return (
    <div>
      <TextInput
        name={dataPath}
        label={schema.title}
        validate={validators}
        required={required}
        parse={(value) => Number(value) as any}
        // parse={(value) => Number(value)}
      />
    </div>
  );
}

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseNumberInputSchema(schema: Schema, required: boolean) {
  const { multipleOf, maximum, minimum, type } = schema;
  const props = {
    // required,
    step: IFTE(
      type === "integer",
      IFTE(multipleOf, multipleOf, 1),
      IFTE(multipleOf)
    ),
    min: IFTE(minimum),
    max: IFTE(maximum),
  };
  return props;
}
