// JsDoc Comment
/**
 * Truncates a string to a specified maximum length, appending an ellipsis (...) if the string is longer.
 *
 * @param {string} txt The string to be truncated.
 * @param {number} [max=50] (optional) The maximum length of the returned string. Defaults to 50.
 * @returns {string} The truncated string, with an ellipsis (...) appended if the original string exceeded the maximum length.
 *
 * @example
 * const longString = "This is a very long string that needs to be truncated.";
 * const shortString = "This is a short string.";
 *
 * console.log(txtSlicer(longString));  // Output: "This is a very long string..."
 * console.log(txtSlicer(shortString)); // Output: "This is a short string."
 * console.log(txtSlicer(longString, 100)); // Output: "This is a very long string that needs to be truncated."
 */

export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  return txt;
}
