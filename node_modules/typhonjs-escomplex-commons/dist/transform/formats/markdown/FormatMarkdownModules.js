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

var _FormatTextModules2 = require('../text/FormatTextModules');

var _FormatTextModules3 = _interopRequireDefault(_FormatTextModules2);

var _StringUtil = require('../../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to markdown with just modules.
 */
var FormatMarkdownModules = function (_FormatTextModules) {
   (0, _inherits3.default)(FormatMarkdownModules, _FormatTextModules);

   /**
    * Initializes minimal markdown modules format.
    *
    * @param {object} headers -
    * @param {object} keys -
    */
   function FormatMarkdownModules() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, FormatMarkdownModules);
      return (0, _possibleConstructorReturn3.default)(this, (FormatMarkdownModules.__proto__ || (0, _getPrototypeOf2.default)(FormatMarkdownModules)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), keys));
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */


   (0, _createClass3.default)(FormatMarkdownModules, [{
      key: 'extension',
      get: function get() {
         return 'md';
      }

      /**
       * Gets the format name.
       *
       * @returns {string}
       */

   }, {
      key: 'name',
      get: function get() {
         return 'markdown-modules';
      }
   }]);
   return FormatMarkdownModules;
}(_FormatTextModules3.default);

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines markdown headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{moduleReport: string[]}}
 * @ignore
 */


exports.default = FormatMarkdownModules;
var s_DEFAULT_HEADERS = {
   moduleReport: [new _StringUtil2.default.SafeEntry('* Module ', '___modulecntrplus1___', 1, ':'), new _StringUtil2.default.SafeEntry('   * filePath: `', 'filePath', 1, '`'), new _StringUtil2.default.SafeEntry('   * srcPath: `', 'srcPath', 1, '`'), new _StringUtil2.default.SafeEntry('   * srcPathAlias: `', 'srcPathAlias', 1, '`'), '\n']
};
module.exports = exports['default'];