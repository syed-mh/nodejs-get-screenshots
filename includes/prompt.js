/**
 * This is a function that runs a recursive prompt
 * that asks the user to input URLS to analyze.
 *
 * @todo add validation to see if something is actually a URL
 * @param { boolean } VALIDATE
 * @return { string[] } Array of trimmed urls
 */
module.exports = VALIDATE => {
  /**
   * @const { {} } CONSTANTS Object containing app-wide string constants
   * @const { module } prompt prompt-async library
   * @var { string[] } _urls  An array containing string urls to be processed
   * @var { string } _input A string entered by a user containing a url or comma separated urls
   * @var { string[] } _add Array of URLs to add
   * @var { Number } _added The number of URLs added
   * @var { Number } _voided The number of URLs not added
   * @var { Number } _total The total number of URLs that is going to be processed
   */
  const CONSTANTS = require("./utilities/constants");
  const PROMPT = require("prompt-sync")({ sigint: true });
  let _urls = new Array();
  let _input, _add, _added, _voided, _total;

  do {
    console.log(
      CONSTANTS.COLORS.BLUE,
      _urls.length ? CONSTANTS.ENTER_URL : CONSTANTS.ENTER_ANOTHER_URL,
      CONSTANTS.COLORS.RESET
    );
    _input = PROMPT()
      .split(",")
      .map(_url => _url.trim());
    _add = _input.filter(_url => !_urls.includes(_url) && _url);
    _added = _add.length;
    _voided = _input.length - _added;
    _total = _urls.length;
    _urls = [..._urls, ..._add];
    console.log(
      CONSTANTS.COLORS.GREEN,
      CONSTANTS.URLS_ADDED(_added),
      CONSTANTS.COLORS.GREEN,
      CONSTANTS.TOTAL_URLS(_total),
      CONSTANTS.COLORS.RED,
      CONSTANTS.DUPLICATES_NOT_ADDED(_voided),
      CONSTANTS.COLORS.RESET
    );
  } while (_input.join("") !== "");

  return _urls;
};
