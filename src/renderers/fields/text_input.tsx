import { TextInput } from "fields/TextInput/TextInput";
import React from "react";
import { Schema } from "../../interfaces/form.interfaces";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";
import { useGetValidators } from "../../utils/validators";

interface RenderTextInputFnProps extends RenderFnProps {}

const textValidators = ["minLength", "maxLength"];

export function RenderTextInput({
  dataPath,
  schemaPath,
  level,
  required,
  schema,
}: RenderTextInputFnProps) {
  const validators = useGetValidators(schema, textValidators, required);
  // const { required } = parseTextInputSchema(schema, required);
  return (
    <div>
      <TextInput
        name={dataPath}
        label={schema.title}
        validate={validators}
        required={required}
      />
    </div>
  );
}

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseTextInputSchema(schema: Schema, required: boolean) {
  const { minLength, maxLength } = schema;
  const props = {
    required,
    minLength: IFTE(minLength),
    maxLength: IFTE(maxLength),
  };
  return props;
}
