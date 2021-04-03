import { string as str } from "yup";
import {
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PHONE_NUMBER,
  ERROR_REQUIRED,
} from "./form_constants";

export const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const requiredString = str().trim().required(ERROR_REQUIRED);

const requiredName = str()
  .trim()
  .required(ERROR_REQUIRED)
  .matches(/^[a-zA-Z]([a-zA-Z0-9- ])*$/, "Must be a valid name");

const requiredEmail = str().email(ERROR_INVALID_EMAIL).required(ERROR_REQUIRED);

const maxLength = (length: number) => {
  // TODO change msg @ Nilesh
  return str()
    .trim()
    .max(length, `Maximum length of ${length} characters exceeded`);
};

export function validateName(val: any) {
  try {
    requiredName.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

const orgName = requiredString.concat(maxLength(25));

export function validateOrgName(val: any) {
  try {
    orgName.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

const projectName = requiredString.concat(maxLength(25)).concat(requiredName);

export function validateProjectName(val: any) {
  try {
    projectName.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

export function validateString(val: any) {
  try {
    requiredString.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

export function validateEmail(val: any) {
  try {
    requiredEmail.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

const PHONE_NUMBER_PATTERN = /^\d{7,15}$/;

const contactNumber = str().matches(PHONE_NUMBER_PATTERN, {
  message: ERROR_INVALID_PHONE_NUMBER,
});
const contactNumberReq = str().trim().required("Incomplete contact number");

const areaCode = str().trim().required("Country code required");

export function validateContactNumber0(val: any) {
  try {
    areaCode.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors?.[0];
  }
}

export function validateContactNumber1(val: any) {
  try {
    contactNumberReq.validateSync(val);
    contactNumber.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors?.[0];
  }
}

export function validateObject(val: any) {
  if (!val || typeof val !== "object") return ERROR_REQUIRED;
  return undefined;
}

export function validateC(val: any) {
  if (!val || typeof val !== "object") return ERROR_REQUIRED;
  try {
    contactNumberReq.validateSync(val);
    contactNumber.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors?.[0];
  }
}

//dash???????
const nonSpacedString = str()
  .trim()
  .required(ERROR_REQUIRED)
  .matches(/^([^\s])*$/, "Must be a non spaced string");

export function validateNonSpacedString(val: any) {
  try {
    nonSpacedString.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

// TODO verify pattern
const DOMAIN_PATTERN = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
const DOMAIN_PATTERN_2 = /^([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$/;

const domain = str()
  .trim()
  .required(ERROR_REQUIRED)
  .matches(DOMAIN_PATTERN, "Must be a valid domain");

export function validateDomain(val: any) {
  try {
    domain.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}

export const noSpacesAllowed = str()
  .trim()
  .matches(/^([^\s])*$/, "No spaces allowed");

const keyValueKey = requiredString.concat(noSpacesAllowed);

export function validateKey(val: any) {
  try {
    keyValueKey.validateSync(val);
    return undefined;
  } catch (error) {
    return error.errors;
  }
}
