import React, { useEffect, useState } from "react";
import "./App.css";
import { SchemaForm } from "./form/schema_form";
import axios from "axios";
import { convertYamlToJSON } from "utils/yaml_utils";
const YAML = require("js-yaml4");

type Fields = Array<{
  path: string;
  type?: string;
  ref?: string;
  title?: string;
}>;
function App() {
  const [schema, setSchema] = useState<any>(null);
  useEffect(() => {
    async function loadSchema() {
      const res = await axios.get<string>(
        "http://localhost:5000/samples/cluster-issuer.yaml"
      );
      const json = YAML.loadAll(res.data);
      if (Array.isArray(json)) {
        const schema = {
          type: "object",
          properties: {},
        } as any;
        const [template, fields] = json;
        (fields["schemas"] as Fields).forEach((f, i) => {
          const pathName = `item-${i}`;
          const { ref, type, ...rest } = f;
          schema["properties"][pathName] = type
            ? { ...rest, type: type }
            : { ...rest, $ref: ref };
        });
        setSchema(schema);
      }
    }
    loadSchema();
  }, []);

  if (!schema) return <div>"loading"</div>;
  return (
    <div className="App">
      <SchemaForm
        schema={schema}
        initialValues={{}}
        onSubmit={() => {}}
      ></SchemaForm>
    </div>
  );
}

export default App;
