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

var _FormatText2 = require('../text/FormatText');

var _FormatText3 = _interopRequireDefault(_FormatText2);

var _StringUtil = require('../../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to a markdown string.
 */
var FormatMarkdown = function (_FormatText) {
   (0, _inherits3.default)(FormatMarkdown, _FormatText);

   /**
    * Initializes markdown format.
    *
    * @param {object} headers -
    * @param {object} keys -
    * @param {string} adjacencyFormatName -
    * @param {string} visibilityFormatName -
    */
   function FormatMarkdown() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var adjacencyFormatName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'markdown-adjacency';
      var visibilityFormatName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'markdown-visibility';
      (0, _classCallCheck3.default)(this, FormatMarkdown);
      return (0, _possibleConstructorReturn3.default)(this, (FormatMarkdown.__proto__ || (0, _getPrototypeOf2.default)(FormatMarkdown)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), keys, adjacencyFormatName, visibilityFormatName));
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */


   (0, _createClass3.default)(FormatMarkdown, [{
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
         return 'markdown';
      }
   }]);
   return FormatMarkdown;
}(_FormatText3.default);

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, entryTemplateTag: function, moduleMethod: *[], moduleReport: *[], projectReport: string[]}}
 * @ignore
 */


exports.default = FormatMarkdown;
var s_DEFAULT_HEADERS = {
   classMethod: ['\n', new _StringUtil2.default.SafeEntry('* Class method: **', 'name', 1, '**', _StringUtil2.default.tagEscapeHTML)],

   classReport: ['\n', new _StringUtil2.default.SafeEntry('* Class: **', 'name', 1, '**', _StringUtil2.default.tagEscapeHTML)],

   entryPrepend: '* ',

   entryTemplateTag: _StringUtil2.default.tagEscapeHTML,

   moduleMethod: ['\n', new _StringUtil2.default.SafeEntry('* Module method: **', 'name', 1, '**', _StringUtil2.default.tagEscapeHTML)],

   moduleReport: ['\n', new _StringUtil2.default.SafeEntry('* Module ', '___modulecntrplus1___', 1, ':'), new _StringUtil2.default.SafeEntry('   * File path: `', 'filePath', 1, '`'), new _StringUtil2.default.SafeEntry('   * Source path: `', 'srcPath', 1, '`'), new _StringUtil2.default.SafeEntry('   * Source alias: `', 'srcPathAlias', 1, '`')],

   projectReport: ['* Project: \n']
};
module.exports = exports['default'];