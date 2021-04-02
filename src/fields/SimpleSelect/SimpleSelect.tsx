import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { useField } from "react-final-form";
import { validateString } from "../validators";

export type SimpleSelectOptions<T extends string = string> = Array<{
  label: string;
  value: T;
  disabled?: boolean;
}>;

export interface SimpleSelectProps<T extends string = string> {
  name: string;
  label: string;
  labelId: string;
  initialValue?: T;
  options: SimpleSelectOptions<T>;
  noOptionsMsg?: string;
  disabled?: boolean;
}

export function SimpleSelect<T extends string = string>(
  props: SimpleSelectProps<T>
) {
  const { name, label, labelId, initialValue, options, noOptionsMsg } = props;
  const { disabled = false } = props;
  const { input, meta } = useField(name, {
    initialValue,
    validate: validateString,
  });
  const error = meta.touched && meta.error;
  return (
    <FormControl
      size="small"
      fullWidth
      variant="outlined"
      className="standard-select"
    >
      <InputLabel
        variant="outlined"
        id={labelId}
        className="standard-select-label"
      >
        {label}
      </InputLabel>
      <Select labelId={labelId} {...input} disabled={disabled}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </MenuItem>
        ))}
        {options.length === 0 && (
          <MenuItem key="empty" value="" disabled>
            {noOptionsMsg || "No options"}
          </MenuItem>
        )}
      </Select>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  );
}
