/**
 * This is a function that runs a script that
 * creates directories as necessary, navigates to pages
 * specified by the user, takes screenshots and saves them
 *
 * @todo Refactor filesystem events out of this class
 * @todo Refactor both directory creation functions into one
 */
module.exports = {
  /**
   * Required modules
   */
  _constants: require("./utilities/constants"),
  _errors: require("./utilities/errors"),
  _puppeteer: require("puppeteer"),
  _filesystem: require("fs"),
  /**
   * @private
   * @return { string } Directory name
   */
  _createProjectDirectory: function () {
    const _date = new Date();
    const _directory = `${_date.getDate()}-${_date.getMonth()}-${_date.getFullYear()}__${_date.getHours()}-${_date.getMinutes()}-${_date.getSeconds()}`;
    this._filesystem.mkdir(_directory, _ERROR => {
      if (_ERROR) {
        throw new Error(
          this._errors.CREATING_DIRECTORY(_ERROR, `./${_directory}/`)
        );
      }
    });
    return _directory;
  },
  /**
   * @private
   * @param { string } URL
   * @param { string } PARENT_DIRECTORY
   * @return { string } Directory path
   */
  _createUrlDirectory: function (URL, PARENT_DIRECTORY) {
    const _name = URL.replace(/[/\\:*'"<>|.?]/g, "_");
    const _directory = `${PARENT_DIRECTORY}/${_name}`;
    this._filesystem.mkdir(_directory, function (_ERROR) {
      if (_ERROR) {
        throw new Error(
          this._errors.CREATING_DIRECTORY(_ERROR, `./${_directory}/`)
        );
      }
    });
    return `${_directory}/`;
  },
  /**
   * @returns { Object } Browser instance
   */
  _initBrowser: async function () {
    return new Promise(async resolve => {
      const browser = await this._puppeteer.launch({ headless: false });
      return resolve(browser);
    });
  },
  /**
   * @private
   * @async
   * @param { Object } BROWSER
   * @param { string } URL
   * @param { Object } RULES
   * @param { {}[] } DEVICES
   * @param { string } OUTPUT_DIRECTORY
   * @return { Number } Number of screenshots taken
   */
  _initPage: async function (BROWSER, URL, RULES, DEVICES, OUTPUT_DIRECTORY) {
    const _page = await BROWSER.newPage();
    await _page.goto(URL);
    if (RULES?.scrollToBottom) {
      await _page.evaluate(() => {
        return new Promise(resolve => {
          const _scrollPage = setInterval(() => {
            window.scrollTo(0, window.scrollY + 100);
            dispatchEvent(new Event("scroll", { bubbles: true }));
          }, 100);
          window.addEventListener("scroll", () => {
            if (
              window.innerHeight + window.scrollY >=
              document.body.offsetHeight
            ) {
              clearInterval(_scrollPage);
              window.scrollTo(0, 0);
              resolve(true);
            }
          });
        });
      });
    }
    if (RULES?.elementsToRemove?.length) {
      await _page.evaluate(() => {
        Array.from(document.querySelectorAll(".ReactModalPortal")).forEach(
          element => element.remove()
        );
      });
    }
    for (const _device of DEVICES) {
      await _page.setViewport({
        width: _device.width,
        height: _device.height
      });
      await _page.screenshot({
        path: `${OUTPUT_DIRECTORY}/${_device.width}x${_device.height}-fold.png`,
        fullPage: false
      });
      await _page.screenshot({
        path: `${OUTPUT_DIRECTORY}/${_device.width}x${_device.height}-full.png`,
        fullPage: true
      });
    }
    await _page.close();
    return 2 * DEVICES.length;
  },
  /**
   * @private
   * @param { Number } COUNT Number of screenshots taken
   * @return { Number } Number of screenshots taken
   */
  _successPrompt: function (COUNT) {
    console.log(
      this._constants.COLORS.GREEN,
      `Script completed. ${COUNT} screenshots taken.`,
      this._constants.COLORS.RESET
    );
    return COUNT;
  },
  /**
   * @public
   * @async
   * @param { Object[] } DEVICES
   * @param { string[] } URLS
   * @return { Number } Number of screenshots taken
   */
  run: async function (DEVICES, URLS) {
    const _browser = await this._initBrowser();
    const _directory = this._createProjectDirectory();
    let _screenshotsTaken = 0;
    for (const _url of URLS) {
      const _urlDirectory = this._createUrlDirectory(_url, _directory);
      console.log(
        this._constants.COLORS.YELLOW,
        `Currently evaluating ${_url}`,
        this._constants.COLORS.RESET
      );
      _screenshotsTaken += await this._initPage(
        _url,
        DEVICES,
        _urlDirectory,
        _browser
      );
    }
    await _browser.close();
    return this._successPrompt(_screenshotsTaken);
  }
};
