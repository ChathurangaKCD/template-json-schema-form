import arrayMutators from "final-form-arrays";
import createDecorator from "final-form-focus";
import setFieldData from "final-form-set-field-data";
import React from "react";
import { Form } from "react-final-form";
import { SchemaFormProps } from "../interfaces/form.interfaces";
import { SchemaRenderer } from "../renderers/schema_renderer";
import { SchemaContextProvider } from "./schema_context";
import { SchemaValidationError } from "./schema_error";
import { useSchemaValidator } from "./schema_validator";

const focusOnError = createDecorator();

const mutators = {
  ...arrayMutators,
  setFieldData,
};

export function SchemaForm({
  schema,
  initialValues = {},
  onSubmit,
}: SchemaFormProps) {
  const schemaValidator = useSchemaValidator(schema);
  if (schemaValidator.state === "invalid") {
    throw new SchemaValidationError(schema, schemaValidator.errors);
  } else if (
    schemaValidator.state === "validating" ||
    schemaValidator.schema === null
  ) {
    return <div>"loading definitions"</div>;
  }
  return (
    <SchemaContextProvider schema={schemaValidator.schema}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ ...initialValues }}
        subscription={{ submitting: true, pristine: true }}
        mutators={mutators}
        decorators={[focusOnError]}
        render={({ handleSubmit, form, submitting, pristine }) => {
          return (
            <SchemaRenderer
              dataPath=""
              schemaPath=""
              level={0}
              required={false}
            />
          );
        }}
      />
    </SchemaContextProvider>
  );
}
