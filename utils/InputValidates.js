/**
 * To validate input with email format
 *
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (pattern.test(email)) {
    return true;
  } else {
    return false;
  }
}

/**
 * To validate input value is empty
 *
 * @param {string} input
 * @returns {boolean}
 */
export function validateInputEmpty(input) {
  if (input === null || !input || input.trim() === "") {
    return false;
  } else {
    return true;
  }
}

/**
 * To validate input password is contain uppercase, number, unique characters
 *
 * @param {string} password
 * @returns {string|boolean} - error message if error and true when success
 */
export function validatePassword(password) {
  const errorMessages = [];
  const patternUppercase = /^(?=.*[A-Z]).+$/;
  const patternNumber = /^(?=.*\d).+$/;
  const patternUniqueStr = /^(?=.*[!@#$%^&*()?><:;'".,/\|]).+$/;
  if (patternUppercase.test(password) === false) {
    errorMessages.push("huruf kapital");
  }
  if (patternNumber.test(password) === false) {
    errorMessages.push("nomor");
  }
  if (patternUniqueStr.test(password) === false) {
    errorMessages.push("karakter unik");
  }

  if (errorMessages.length !== 0) {
    return "password harus mengandung : " + errorMessages.join(", ");
  }

  return true;
}
