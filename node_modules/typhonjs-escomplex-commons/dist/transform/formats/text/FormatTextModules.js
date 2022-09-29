'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractFormatText = require('./AbstractFormatText');

var _AbstractFormatText2 = _interopRequireDefault(_AbstractFormatText);

var _ReportType = require('../../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _StringUtil = require('../../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text with just
 * modules.
 */
var FormatTextModules = function (_AbstractFormatTest) {
   (0, _inherits3.default)(FormatTextModules, _AbstractFormatTest);

   /**
    * Initializes text modules format.
    *
    * @param {object} headers -
    * @param {object} keys -
    */
   function FormatTextModules() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, FormatTextModules);
      return (0, _possibleConstructorReturn3.default)(this, (FormatTextModules.__proto__ || (0, _getPrototypeOf2.default)(FormatTextModules)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), keys));
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */


   (0, _createClass3.default)(FormatTextModules, [{
      key: 'isSupported',


      /**
       * Returns whether a given ReportType is supported by this format transform.
       *
       * @param {ReportType}  reportType - A given report type.
       *
       * @returns {boolean}
       */
      value: function isSupported(reportType) {
         switch (reportType) {
            case _ReportType2.default.MODULE:
            case _ReportType2.default.PROJECT:
               return true;

            default:
               return false;
         }
      }
   }, {
      key: 'extension',
      get: function get() {
         return 'txt';
      }

      /**
       * Gets the format name.
       *
       * @returns {string}
       */

   }, {
      key: 'name',
      get: function get() {
         return 'text-modules';
      }

      /**
       * Gets the format type.
       *
       * @returns {string}
       */

   }, {
      key: 'type',
      get: function get() {
         return 'modules';
      }
   }]);
   return FormatTextModules;
}(_AbstractFormatText2.default);

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{moduleReport: *[]}}
 * @ignore
 */


exports.default = FormatTextModules;
var s_DEFAULT_HEADERS = {
   moduleReport: [new _StringUtil2.default.SafeEntry('Module ', '___modulecntrplus1___', 1, ':'), new _StringUtil2.default.SafeEntry('filePath: ', 'filePath'), new _StringUtil2.default.SafeEntry('srcPath: ', 'srcPath'), new _StringUtil2.default.SafeEntry('srcPathAlias: ', 'srcPathAlias'), '\n']
};
module.exports = exports['default'];