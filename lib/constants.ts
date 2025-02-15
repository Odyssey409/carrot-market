export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "Password too weak, must contain at least one uppercase letter, one lowercase letter, and one special character";
