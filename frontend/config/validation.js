import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return "Required field";
  }
  return true;
});
defineRule("email", (value) => {
  if (!value) {
    return "Required field";
  }
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Must be a valid email address.";
  }
  return true;
});
defineRule("name", (value) => {
  if (!value) {
    return "Required field";
  }
  const regex = /^[A-Za-z][A-Za-z-_ .]{2,29}$/;
  if (!regex.test(value)) {
    return "The field must be a valid name.";
  }
  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "The passcode must match.";
});

defineRule("phone", (value) => {
  if (!value) {
    return "Required field";
  }
  const regex = /^[0-9\+]{10,14}$/;
  if (!regex.test(value)) {
    return "Must be a valid phone number.";
  }
  return true;
});

defineRule("checkBox", (value) => {
  if (value) {
    return true;
  }
  return "Required";
});

defineRule("multiSelect", (value) => {
  if (value) {
    return true;
  }
  return "Required field";
});

defineRule("password", (value) => {
  if (!value) {
    return "Required field";
  }
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!strongRegex.test(value)) {
    return "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character.";
  }
  return true;
});
