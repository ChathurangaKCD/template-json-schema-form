import React from "react";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";

interface RenderUnsupportedFieldFnProps extends RenderFnProps {}

export function RenderUnsupportedField(props: RenderUnsupportedFieldFnProps) {
  const { dataPath, schemaPath, level, schema } = props;
  return (
    <div>
      Unable to render field <code>{dataPath}</code>
    </div>
  );
}
