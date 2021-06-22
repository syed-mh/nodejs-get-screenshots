const CONSTANTS = require('./includes/constants');
const PROMPT = require('./includes/prompt');
const PUPPETEER = require('puppeteer');

const URLS = PROMPT(true);
console.log(CONSTANTS.LIST_URLS(URLS));