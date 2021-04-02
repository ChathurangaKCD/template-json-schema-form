import { OutlinedTextFieldProps, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useField, UseFieldConfig, useForm } from "react-final-form";
import { validateString } from "../validators";

export interface TextInputProps
  extends UseFieldConfig<string>,
    Pick<OutlinedTextFieldProps, "label">,
    Partial<
      Pick<
        OutlinedTextFieldProps,
        | "fullWidth"
        | "autoFocus"
        | "placeholder"
        | "multiline"
        | "rows"
        | "required"
        | "autoComplete"
        | "inputProps"
        | "InputProps"
        | "InputLabelProps"
        | "rowsMax"
        | "size"
        | "helperText"
      >
    > {
  name: string;
  trim?: boolean;
  className?: string;
  /**
   * defaults to `false` if no `validate` function provided.
   * * if `validate` is function provided, defaults to `true.
   */
  required?: boolean;
  /**
   * sets `validateAllFields={[]}`.
   * * Validates all inputs, whenever the field's value changes,
   */
  validateAllFields?: boolean;
  asyncEndAdornment?(
    state: Record<"validating" | "hasError" | "touched", boolean>
  ): React.ReactNode;
  /**
   * trigger a state change in order to exit from validation state
   * * currently if the field is blurred before validation completes,
   * validating state doesn't resolve to false, until another form state change happens
   */
  asyncValidationTimeout?: number | true;
}
export const trimProps: Partial<UseFieldConfig<string>> = {
  format(value: any = "") {
    return typeof value === "string" ? value.trim() : value;
  },
  formatOnBlur: true,
  allowNull: false,
};

export function TextInput(props: TextInputProps) {
  const {
    name,
    className,
    label,
    fullWidth = true,
    autoFocus,
    placeholder,
    multiline,
    rows,
    validate = props.required ? validateString : undefined,
    required = !!validate,
    autoComplete = "off",
    trim = true,
    inputProps,
    InputProps,
    asyncEndAdornment,
    InputLabelProps,
    rowsMax,
    size = "small",
    validateAllFields = false,
    asyncValidationTimeout = false,
    helperText,
    ...config
  } = props;
  //keep latest value in a ref since validate function doesn't get updated after first render.
  // const latestProps = useLatest(props);
  // function validateFn(value: any, allValues: any) {
  //   const latestValidate = latestProps.current.validate as
  //     | undefined
  //     | StringValidator;
  //   return latestValidate ? latestValidate(value, allValues) : undefined;
  // }
  function validateFn(value: any, allValues: any) {
    if (!validate) return;
    const shouldValidate =
      required || (typeof value === "string" && value.length > 0);
    return shouldValidate ? validate(value, allValues) : undefined;
  }
  const {
    input: { value, onChange, ...input },
    meta,
  } = useField<string>(name, {
    validateFields: validateAllFields ? undefined : [],
    // TODO remove initialValue
    initialValue: "",
    ...(trim && trimProps),
    ...config,
    validate: validateFn,
  });

  useAsyncValidationTrigger(name, value, asyncValidationTimeout);

  const fieldProps = {
    label,
    fullWidth,
    autoFocus,
    placeholder,
    multiline,
    rows,
    required,
    autoComplete,
    inputProps,
    InputLabelProps,
    rowsMax,
    size,
    helperText,
  };
  const error = (meta.touched && meta.error) || meta.submitError;

  return (
    <TextField
      {...fieldProps}
      {...input}
      value={value ?? ""}
      onChange={(e) =>
        (!e.target.value || e.target.validity.valid) && onChange(e)
      }
      variant="outlined"
      error={!!error}
      rows={rows}
      rowsMax={rowsMax}
      multiline={multiline}
      helperText={error || helperText || " "} // use an empty string to reserve space for error
      InputProps={{
        ...InputProps,
        endAdornment: asyncEndAdornment
          ? asyncEndAdornment({
              validating: !!meta.validating,
              hasError: !!meta.error,
              touched: !!meta.touched,
            })
          : InputProps?.endAdornment,
      }}
    />
  );
}

function useAsyncValidationTrigger(
  name: string,
  value: string,
  asyncValidationTimeout: boolean | number = false
) {
  const form = useForm();
  useEffect(
    function asyncValidationReset() {
      if (!asyncValidationTimeout) return;
      // noinspection PointlessBooleanExpressionJS,PointlessBooleanExpressionJS
      const timeout =
        asyncValidationTimeout === true ? 2000 : asyncValidationTimeout;
      const id = setTimeout(() => {
        if (!form.getFieldState(name)?.validating) return;
        form.change("trigger_validation", `workaround_${Date.now()}`);
      }, timeout);
      return () => clearTimeout(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  );
}
