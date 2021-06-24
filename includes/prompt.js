/**
 * This is a function that runs a recursive prompt
 * that asks the user to input URLS to analyze.
 *
 * @todo add validation to see if something is actually a URL
 * @todo Refactor settings prompts and URL prompts into their own classes
 */
module.exports = {
  /**
   * Required modules
   */
  _constants: require("./utilities/constants"),
  _errors: require("./utilities/errors"),
  _prompt: require("prompt-sync")({ sigint: true }),
  _fs: require("fs"),
  /**
   *
   * @returns
   */
  _initSettingsDirectory: function () {
    const _settingsDirectory = _this._constants.DEFAULT_SETTINGS_DIRECTORY;
    try {
      if (!this._fs.existsSync(_settingsDirectory)) {
        this._fs.mkdirSync(_settingsDirectory);
      }
      return _settingsDirectory;
    } catch (_ERROR) {
      throw new Error(
        this._errors.CREATING_DIRECTORY(_ERROR, _settingsDirectory)
      );
    }
  },
  /**
   *
   */
  _initSettingsFile: function () {},
  /**
   *
   */
  _readSettings: function (PRESET = false) {
    _settings = this._constants.DEFAULT_SETTINGS;
    if (PRESET) {
      try {
        const _settingsFile = `${
          this._constants.DEFAULT_SETTINGS_DIRECTORY
        }/${PRESET.toLowerCase()}.json`;
        _settings = JSON.parse(
          JSON.stringify(this._fs.readFileSync(_settingsFile))
        );
      } catch (_ERROR) {
        throw new Error(
          this._errors.CREATING_FILE(_ERROR, `${_settingsFile}.json`)
        );
      }
    }
    return _settings;
  },
  /**
   *
   */
  _promptSettings: function () {},
  /**
   *
   */
  _promptURLs: function () {},
  /**
   *
   */
  run: function () {},
  /**
   *
   */
  createSettings: function () {}
};
