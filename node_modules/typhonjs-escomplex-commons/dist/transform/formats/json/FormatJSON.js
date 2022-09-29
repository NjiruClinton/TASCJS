'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ESComplex report instances converting them to a JSON string.
 */
var FormatJSON = function () {
  function FormatJSON() {
    (0, _classCallCheck3.default)(this, FormatJSON);
  }

  (0, _createClass3.default)(FormatJSON, [{
    key: 'formatReport',

    /**
     * Formats a report as a JSON string.
     *
     * @param {ClassReport|MethodReport|ModuleReport|ProjectReport} report - A report to format.
     *
     * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
     * @property {number}      spacing - (Optional) An integer defining the JSON output spacing.
     *
     * @returns {string}
     */
    value: function formatReport(report) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object' && (0, _isInteger2.default)(options.spacing) ? (0, _stringify2.default)(report, void 0, options.spacing) : (0, _stringify2.default)(report);
    }

    /**
     * Gets the file extension.
     *
     * @returns {string}
     */

  }, {
    key: 'isSupported',


    /**
     * Returns whether a given ReportType is supported by this format transform.
     *
     * @returns {boolean}
     */
    value: function isSupported() {
      return true;
    }
  }, {
    key: 'extension',
    get: function get() {
      return 'json';
    }

    /**
     * Gets the format name.
     *
     * @returns {string}
     */

  }, {
    key: 'name',
    get: function get() {
      return 'json';
    }

    /**
     * Gets the format type.
     *
     * @returns {string}
     */

  }, {
    key: 'type',
    get: function get() {
      return 'full';
    }
  }]);
  return FormatJSON;
}();

exports.default = FormatJSON;
module.exports = exports['default'];