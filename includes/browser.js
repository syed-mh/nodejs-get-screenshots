module.exports = {
  /**
   * @var _puppeteer Puppeteer library
   * @var _filesystem FS Library
   */
  _puppeteer: require("puppeteer"),
  _filesystem: require("fs"),
  _constants: require("./utilities/constants"),
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
          `There was an error creating a directory <./${_directory}/>: ${_ERROR}`
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
          `There was an error creating a directory <./${_directory}/>: ${_ERROR}`
        );
      }
    });
    return `${_directory}/`;
  },
  /**
   * @private
   * @async
   * @param { string } URL
   * @param { {}[] } DEVICES
   * @param { string } OUTPUT_DIRECTORY
   * @return { Number } Number of screenshots taken
   */
  _initPage: async function (URL, DEVICES, OUTPUT_DIRECTORY) {
    const _browser = await this._puppeteer.launch();
    const _page = await _browser.newPage();
    await _page.goto(URL, { waitUntil: "load", timeout: 0 });
    for (const _device of DEVICES) {
      await _page.setViewport({
        width: _device.width,
        height: _device.height
      });
      await _page.screenshot({
        path: `${OUTPUT_DIRECTORY}/${_device.name}-fold.png`,
        fullPage: false
      });
      await _page.screenshot({
        path: `${OUTPUT_DIRECTORY}/${_device.name}-full.png`,
        fullPage: true
      });
    }
    await _page.close();
    await _browser.close();
    return 2 * DEVICES.length;
  },
  /**
   * @private
   */
  _successPrompt: function (ENUMERATION) {
    console.log(
      this._constants.COLORS.GREEN,
      `Script completed. ${ENUMERATION} screenshots taken.`,
      this._constants.COLORS.RESET
    );
  },
  /**
   * @public
   * @async
   * @param { Object[] } DEVICES
   * @param { string[] } URLS
   * @return { true }
   */
  execute: async function (DEVICES, URLS) {
    const _directory = this._createProjectDirectory();
    let _screenshotsTaken = 0;
    for (const _url of URLS) {
      const _urlDirectory = this._createUrlDirectory(_url, _directory);
      console.log(
        this._constants.COLORS.YELLOW,
        `Currently evaluating ${_url}`,
        this._constants.COLORS.RESET
      );
      _screenshotsTaken += await this._initPage(_url, DEVICES, _urlDirectory);
    }
    this._successPrompt(_screenshotsTaken);
    return _screenshotsTaken;
  }
};
