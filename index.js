const puppeteer = require('puppeteer');
const prompt = require("prompt-sync")({ sigint: true });
let urls = [];
let urlInput;

do {
  const ask = urls.length
    ? "Enter another URL or a comma separated string of URLs to use, or press enter to finish adding domains:"
    : "Enter a url or a comma seperated string of URLs to use:";
  let urlsAdded, urlsTotal, urlsNotAdded;
  console.log("\x1b[36m", ask, "\x1b[0m");
  urlInput = prompt();
  urlInput = urlInput.split(",").map((url) => url.trim());
  urlToAdd = urlInput.filter((url) => !urls.includes(url) && url);
  urls = [...urls, ...urlToAdd];
  urlsAdded = urlToAdd.length;
  urlsTotal = urls.length;
  urlsNotAdded = urlInput.length - urlToAdd.length;
  console.log(
    "\x1b[32m",
    urlsAdded ? `${urlsAdded} URLs added` : "",
    "\x1b[32m",
    `${urlsTotal} total URLs`,
    "\x1b[31m",
    urlsNotAdded ? `${urlsNotAdded} duplicates not added.` : "",
    "\x1b[0m"
  );
} while (urlInput.join("") !== "");

console.log(`The following URLs will now be processed:\n\t ${urls.join('\n\t')}`);