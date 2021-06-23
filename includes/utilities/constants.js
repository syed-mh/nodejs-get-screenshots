module.exports = {
  ENTER_URL:
    "Enter another URL or a comma separated string of URLs to use, or press enter to finish adding domains:",
  ENTER_ANOTHER_URL: "Enter a url or a comma seperated string of URLs to use:",
  /**
   * @param { Number } NOT_ADDED
   * @returns { string }
   */
  DUPLICATES_NOT_ADDED: NOT_ADDED => `${NOT_ADDED} duplicates not added`,
  /**
   * @param { Number } ADDED
   * @returns { string }
   */
  URLS_ADDED: ADDED => `${ADDED} URLs added`,
  /**
   * @param { Number } TOTAL
   * @returns { string }
   */
  TOTAL_URLS: TOTAL => `${TOTAL} total URLs`,
  /**
   * @param { string[] } URLS
   * @returns { string }
   */
  LIST_URLS: URLS =>
    `The following URLs will now be processed:\n- ${URLS.join("\n- ")}`,
  COLORS: {
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    BLUE: "\x1b[36m",
    YELLOW: "\x1b[33m",
    RESET: "\x1b[0m"
  }
};
