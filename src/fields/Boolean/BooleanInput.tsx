import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  Switch,
} from "@material-ui/core";
import React from "react";
import { Field } from "react-final-form";
import "./BooleanInput.scss";

export function SwitchBtn({
  name,
  label,
  className,
  disabled,
}: {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Field name={name} initialValue={false} type="checkbox">
      {({ input }) => (
        <FormControlLabel
          className={`boolean-input ${className}`}
          control={<Switch size="medium" {...input} />}
          label={label}
          labelPlacement="start"
          disabled={disabled}
        />
      )}
    </Field>
  );
}

export function EnumSwitchBtn<T extends string>({
  name,
  label,
  className,
  checkedValue,
  uncheckedValue,
}: {
  name: string;
  label: string;
  className?: string;
  checkedValue: T;
  uncheckedValue: T;
}) {
  return (
    <Field<T> name={name}>
      {({ input: { value, onChange, type, ...input } }) => (
        <FormControlLabel
          className={`boolean-input ${className}`}
          control={
            <Switch
              size="medium"
              {...input}
              checked={value === checkedValue}
              onChange={(e) =>
                onChange(e.target.checked ? checkedValue : uncheckedValue)
              }
            />
          }
          label={label}
          labelPlacement="start"
        />
      )}
    </Field>
  );
}

export function CheckBoxBtn({
  name,
  label,
  disabled,
  labelPlacement = "end",
}: {
  name: string;
  label: string;
  labelPlacement?: FormControlLabelProps["labelPlacement"];
  disabled?: boolean;
}) {
  return (
    <Field name={name} initialValue={false} type="checkbox">
      {({ input }) => (
        <FormControlLabel
          control={<Checkbox {...input} color="primary" size="medium" />}
          label={label}
          labelPlacement={labelPlacement}
          disabled={disabled}
        />
      )}
    </Field>
  );
}

/**
 * Checkbox with custom values for `true`, `false`
 */
export function EnumCheckBoxBtn<T>({
  name,
  label,
  disabled,
  checkedValue,
  uncheckedValue,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  checkedValue: T;
  uncheckedValue: T;
}) {
  return (
    <Field<T> name={name}>
      {({ input: { value, onChange, type, ...input } }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...input}
              checked={value === checkedValue}
              onChange={(e) =>
                onChange(e.target.checked ? checkedValue : uncheckedValue)
              }
              color="primary"
              size="medium"
            />
          }
          label={label}
          labelPlacement="end"
          disabled={disabled}
        />
      )}
    </Field>
  );
}
