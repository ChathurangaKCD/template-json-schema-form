import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";
import { useField } from "react-final-form";

export function BooleanRadioBtns({ name }: Record<"name", string>) {
  // boolean values get converted to "true", "false" string
  const options = [
    { label: "True", optValue: "TRUE" },
    { label: "False", optValue: "FALSE" },
  ] as const;
  const { input } = useField(name);
  const { value: isTrue, onChange, onBlur, onFocus } = input;
  const inputProps = { onBlur, onFocus };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={`${name}-value`}
        {...inputProps}
        value={isTrue ? "TRUE" : "FALSE"}
        onChange={(_, v) => {
          onChange(v === "TRUE");
        }}
        row
      >
        {options.map(({ optValue, label }, idx) => (
          <FormControlLabel
            key={idx}
            value={optValue}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
