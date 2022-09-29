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

var _FormatTextMinimal2 = require('../text/FormatTextMinimal');

var _FormatTextMinimal3 = _interopRequireDefault(_FormatTextMinimal2);

var _StringUtil = require('../../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to markdown with
 * minimal metrics.
 */
var FormatMarkdownMinimal = function (_FormatTextMinimal) {
   (0, _inherits3.default)(FormatMarkdownMinimal, _FormatTextMinimal);

   /**
    * Initializes minimal markdown format.
    *
    * @param {object} headers -
    * @param {object} keys -
    */
   function FormatMarkdownMinimal() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, FormatMarkdownMinimal);
      return (0, _possibleConstructorReturn3.default)(this, (FormatMarkdownMinimal.__proto__ || (0, _getPrototypeOf2.default)(FormatMarkdownMinimal)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), keys));
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */


   (0, _createClass3.default)(FormatMarkdownMinimal, [{
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
         return 'markdown-minimal';
      }
   }]);
   return FormatMarkdownMinimal;
}(_FormatTextMinimal3.default);

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default headers as markdown which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: *[], projectReport: string[]}}
 * @ignore
 */


exports.default = FormatMarkdownMinimal;
var s_DEFAULT_HEADERS = {
   classMethod: [new _StringUtil2.default.SafeEntry('* Class method: **', 'name', 0, '', _StringUtil2.default.tagEscapeHTML), new _StringUtil2.default.SafeEntry('** (', 'lineStart', 1, ')')],

   classReport: [new _StringUtil2.default.SafeEntry('* Class: **', 'name', 0, '', _StringUtil2.default.tagEscapeHTML), new _StringUtil2.default.SafeEntry('** (', 'lineStart', 1, ')')],

   entryPrepend: '* ',

   entryTemplateTag: _StringUtil2.default.tagEscapeHTML,

   moduleMethod: [new _StringUtil2.default.SafeEntry('* Module method: **', 'name', 0, '', _StringUtil2.default.tagEscapeHTML), new _StringUtil2.default.SafeEntry('** (', 'lineStart', 1, ')')],

   moduleReport: ['\n', new _StringUtil2.default.SafeEntry('* Module ', '___modulecntrplus1___', 1, ':'), new _StringUtil2.default.SafeEntry('   * filePath: `', 'filePath', 1, '`'), new _StringUtil2.default.SafeEntry('   * srcPath: `', 'srcPath', 1, '`'), new _StringUtil2.default.SafeEntry('   * srcPathAlias: `', 'srcPathAlias', 1, '`')],

   projectReport: ['* Project:\n']
};
module.exports = exports['default'];