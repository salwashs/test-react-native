/**
 *
 * @param {string} str
 * @returns {string}
 */
export function formattedDate() {
  return new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
