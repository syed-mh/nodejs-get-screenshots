/**
 * This is a function that runs a recursive prompt
 * that asks the user to input URLS to analyze.
 *
 * @todo add validation to see if something is actually
 * a URL
 *
 * @return { string[] } Array of trimmed urls
 */
module.exports = () => {
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
  const CONSTANTS = require("./constants");
  const PROMPT = require("prompt-sync")({ sigint: true });
  let _urls = new Array();
  let _input, _add, _added, _voided, _total;

  do {
    console.log(
      CONSTANTS.COLORS.BLUE,
      _urls.length ? CONSTANTS.ENTER_ANOTHER_URL : CONSTANTS.ENTER_URL,
      CONSTANTS.COLORS.RESET
    );
    _input = PROMPT()
      .split(",")
      .map((_url) => _url.trim());
    _add = _input.filter((_url) => !_urls.contains(_url) && _url);
    _added = _add.length;
    _voided = _input.length - _added;
    _total = _urls.length;
  } while (_input.join("") !== "");

  return _urls;
};
