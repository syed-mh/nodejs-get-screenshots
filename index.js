const CONSTANTS = require("./includes/utilities/constants");
const VIEWPORTS = require("./includes/utilities/viewports");
const PROMPT = require("./includes/prompt");
const BROWSER = require("./includes/browser");

const URLS = PROMPT(true);
console.log(CONSTANTS.LIST_URLS(URLS));

BROWSER.execute(VIEWPORTS, URLS);
