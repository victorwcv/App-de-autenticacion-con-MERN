/**
 * Creates a new Error object with a specified status code and message.
 * @param {number} statusCode - The HTTP status code of the error.
 * @param {string} message - The error message.
 * @returns {Error} - The created Error object.
 */

export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
