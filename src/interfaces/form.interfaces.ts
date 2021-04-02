type KeyValueObj = { [x: string]: any };

export type Schema = KeyValueObj;

export interface SchemaFormProps<T = KeyValueObj> {
  schema: Schema;
  initialValues: T;
  onSubmit: (val: T) => void;
}

export interface SchemaContextProps {
  schema: Schema;
  defs?: any;
  children: React.ReactNode;
}

export interface SchemaContextValue {
  schema: Schema;
}
