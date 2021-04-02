import _get from "lodash.get";
import React, { useContext, useMemo, useRef } from "react";
import {
  Schema,
  SchemaContextProps,
  SchemaContextValue,
} from "../interfaces/form.interfaces";

const FormSchemaContext = React.createContext<SchemaContextValue>(
  (null as unknown) as SchemaContextValue
);

export function SchemaContextProvider({
  schema: schema,
  defs = null,
  children,
}: SchemaContextProps) {
  if (!schema) throw new Error("SCHEMA_REQUIRED");
  const countRef = useRef(0);
  const contextVal = useMemo(() => {
    countRef.current !== 0 && console.warn("Schema Context Changed");
    countRef.current++;
    return { schema };
  }, [schema]);
  return (
    <FormSchemaContext.Provider value={contextVal}>
      {children}
    </FormSchemaContext.Provider>
  );
}

export function useFormSchema(path = "") {
  const { schema } = useContext(FormSchemaContext);
  return useMemo(() => {
    const subSchema: Schema = path ? _get(schema, path) : schema;
    const schemas = { schema: subSchema };
    return schemas;
  }, [path, schema]);
}
