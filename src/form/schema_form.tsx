import arrayMutators from "final-form-arrays";
import createDecorator from "final-form-focus";
import React, { useState, useMemo } from "react";
import { Form, FormSpy } from "react-final-form";
import { SchemaFormProps } from "../interfaces/form.interfaces";
import { SchemaRenderer } from "../renderers/schema_renderer";
import { SchemaContextProvider } from "./schema_context";
import { useSchemaValidator } from "./schema_validator";
import { validateData } from "./data_validator";
import { SchemaValidationError } from "./schema_error";
const focusOnError = createDecorator();

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
        mutators={{
          ...arrayMutators,
        }}
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
