import Ajv, { ErrorObject } from "ajv";
import RefParser from "@apidevtools/json-schema-ref-parser";
import { Schema } from "interfaces/form.interfaces";
import { useState, useEffect, useReducer } from "react";
import { defaultDefs } from "./definitions";
import axios from "axios";

const ajv = new Ajv({ allErrors: true, $data: true });

type SchameValidatorState = "valid" | "invalid" | "validating";

interface ValidationAction {
  type: "validated" | "newschema";
  errors?: ErrorObject[] | null | undefined;
  schema?: Schema | null;
  isValid?: boolean;
}
function validationReducer(_: any, action: ValidationAction) {
  switch (action.type) {
    case "validated": {
      const { isValid, schema, errors } = action;
      if (isValid) return { schema, state: "valid" };
      return { errors, state: "invalid" };
    }
    case "newschema": {
      return { state: "validating" };
    }
  }
}
interface Valid {
  schema: Schema;
  state: "valid";
}
interface Invalid {
  errors: ErrorObject[];
  state: "invalid";
}
interface Validating {
  state: "validating";
}
type SchemaValidator = Valid | Invalid | Validating;
interface Definitions {
  $schema: "http://json-schema.org/draft/2019-09/schema#";
  $defs: Record<string, any>;
}
export function useSchemaValidator(schema: Schema) {
  const [state, dispatch] = useReducer(validationReducer, {
    state: "validating",
  });
  useEffect(() => {
    (async function validate() {
      dispatch({ type: "newschema" });
      console.log("def1");
      const defs = await axios.get<Definitions>(
        "http://localhost:5000/schemas/index.json"
      );
      console.log("def2");
      const combinedSchema = await RefParser.dereference({
        ...schema,
        definitions: { ...schema.definitions, ...defs.data["$defs"] },
      });
      console.log(combinedSchema);
      const { definitions, ...formSchema } = combinedSchema;
      const isValid = ajv.validateSchema(formSchema) as boolean;
      dispatch({
        type: "validated",
        isValid,
        schema: formSchema,
        errors: ajv.errors,
      });
    })();
  }, [schema]);
  return state as SchemaValidator;
}
