import { BooleanRadioBtns } from "fields/Boolean/BooleanRadioBtns";
import React from "react";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";

interface RenderBooleanInputFnProps extends RenderFnProps {}
export function RenderBooleanInput({
  dataPath,
  schemaPath,
  level,
  schema,
}: RenderBooleanInputFnProps) {
  return (
    <div>
      {schema.title}
      <BooleanRadioBtns name={dataPath} />
    </div>
  );
}
