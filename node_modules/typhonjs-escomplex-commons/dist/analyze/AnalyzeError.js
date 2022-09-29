'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ReportType = require('../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a wrapper for analysis errors stored in the `errors` array for each report type.
 */
var AnalyzeError = function () {
  /**
   * Initializes an instance.
   *
   * @param {string}   severity - Provides the severity level.
   * @param {string}   message - Provides the error message.
   * @param {ClassMethodReport|ClassReport|ModuleMethodReport|ModuleReport|ProjectReport} sourceReport -
   *                   The source report of the error.
   */
  function AnalyzeError() {
    var severity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '<unknown>';
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var sourceReport = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;
    (0, _classCallCheck3.default)(this, AnalyzeError);

    /**
     * Provides the line number where the error starts.
     * @type {number}
     */
    this.lineStart = (typeof sourceReport === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceReport)) === 'object' ? sourceReport.lineStart : 0;

    /**
     * Provides the line number where the error starts.
     * @type {number}
     */
    this.lineEnd = (typeof sourceReport === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceReport)) === 'object' ? sourceReport.lineEnd : 0;

    /**
     * Provides the severity level.
     * @type {string}
     */
    this.severity = severity;

    /**
     * Provides the error message.
     * @type {string}
     */
    this.message = message;

    /**
     * Attempt to find the `name` then try `srcPath` for modules.
     */
    this.name = (typeof sourceReport === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceReport)) === 'object' ? sourceReport.getName() : '';

    /**
     * Provides a type of report where the error is found.
     * @type {string}
     */
    this.type = (typeof sourceReport === 'undefined' ? 'undefined' : (0, _typeof3.default)(sourceReport)) === 'object' ? sourceReport.type : void 0;
  }

  /**
   * Deserializes a JSON object representing a AnalyzeError.
   *
   * @param {object}   object - A JSON object of a AnalyzeError that was previously serialized.
   *
   * @returns {AnalyzeError}
   */


  (0, _createClass3.default)(AnalyzeError, [{
    key: 'toString',


    /**
     * Returns a verbose string about the error.
     * @returns {string}
     */
    value: function toString() {
      return '(' + this.severity + ') ' + this.message + ' @ ' + this.type.description + ' ' + (this.name !== '' ? '- ' + this.name + ' ' : '') + '(' + this.lineStart + ' - ' + this.lineEnd + ')';
    }
  }], [{
    key: 'parse',
    value: function parse(object) {
      /* istanbul ignore if */
      if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object') {
        throw new TypeError('parse error: \'object\' is not an \'object\'.');
      }

      var error = (0, _assign2.default)(new AnalyzeError(), object);

      // Deserialize the associated enum type.
      error.type = _ReportType2.default.enumValueOf(object.type.name);

      return error;
    }
  }]);
  return AnalyzeError;
}();

exports.default = AnalyzeError;
module.exports = exports['default'];