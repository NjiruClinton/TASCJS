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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractFormatText2 = require('./AbstractFormatText');

var _AbstractFormatText3 = _interopRequireDefault(_AbstractFormatText2);

var _ReportType = require('../../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _StringUtil = require('../../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

var _TransformFormat = require('../../TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting them to plain text.
 */
var FormatText = function (_AbstractFormatText) {
   (0, _inherits3.default)(FormatText, _AbstractFormatText);

   /**
    * Initializes text format.
    *
    * @param {object} headers -
    * @param {object} keys -
    * @param {string} adjacencyFormatName -
    * @param {string} visibilityFormatName -
    */
   function FormatText() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var adjacencyFormatName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text-adjacency';
      var visibilityFormatName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text-visibility';
      (0, _classCallCheck3.default)(this, FormatText);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FormatText.__proto__ || (0, _getPrototypeOf2.default)(FormatText)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), (0, _assign2.default)({}, s_DEFAULT_KEYS, keys)));

      _this._adjacencyFormatName = adjacencyFormatName;
      _this._visibilityFormatName = visibilityFormatName;
      return _this;
   }

   /**
    * Gets the file extension.
    *
    * @returns {string}
    */


   (0, _createClass3.default)(FormatText, [{
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
            case _ReportType2.default.CLASS:
            case _ReportType2.default.CLASS_METHOD:
            case _ReportType2.default.MODULE_METHOD:
            case _ReportType2.default.MODULE:
            case _ReportType2.default.NESTED_METHOD:
            case _ReportType2.default.PROJECT:
               return true;

            default:
               return false;
         }
      }

      /**
       * Formats a project report as plain text.
       *
       * @param {ProjectReport}  projectReport - A project report.
       *
       * @param {object}         options - (Optional) One or more optional parameters passed to the formatter.
       * @property {string}      classReport - An entry key found in the class report to output.
       * @property {string}      methodReport - An entry key found in the method report to output.
       * @property {string}      moduleReport - An entry key found in the module report to output.
       *
       * @returns {string}
       */

   }, {
      key: '_formatProject',
      value: function _formatProject(projectReport) {
         var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

         var output = (0, _get3.default)(FormatText.prototype.__proto__ || (0, _getPrototypeOf2.default)(FormatText.prototype), '_formatProject', this).call(this, projectReport, options);

         var localOptions = (0, _assign2.default)({}, this._keys, options);

         var adjacency = typeof localOptions.adjacency === 'boolean' ? localOptions.adjacency : true;
         var visibility = typeof localOptions.visibility === 'boolean' ? localOptions.visibility : true;

         // Add adjacency matrix output
         if (adjacency && _TransformFormat2.default.isFormat(this._adjacencyFormatName)) {
            output += '\n\n' + _TransformFormat2.default.format(projectReport, this._adjacencyFormatName, options);
         }

         // Add visibility matrix output
         if (visibility && _TransformFormat2.default.isFormat(this._visibilityFormatName)) {
            output += '\n\n' + _TransformFormat2.default.format(projectReport, this._visibilityFormatName, options);
         }

         return output;
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
         return 'text';
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
   return FormatText;
}(_AbstractFormatText3.default);

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Provides shared method data.
 * @type {*[]}
 * @ignore
 */


exports.default = FormatText;
var s_SHARED_METHOD_DATA = [new _StringUtil2.default.SafeEntry('Line start: ', 'lineStart'), new _StringUtil2.default.SafeEntry('Line end: ', 'lineEnd'), new _StringUtil2.default.SafeEntry('Physical LOC: ', 'sloc.physical'), new _StringUtil2.default.SafeEntry('Logical LOC: ', 'sloc.logical'), new _StringUtil2.default.SafeEntry('Cyclomatic complexity: ', 'cyclomatic'), new _StringUtil2.default.SafeEntry('Cyclomatic complexity density: ', 'cyclomaticDensity', 1, '%'), new _StringUtil2.default.SafeEntry('Halstead difficulty: ', 'halstead.difficulty'), new _StringUtil2.default.SafeEntry('Halstead volume: ', 'halstead.volume'), new _StringUtil2.default.SafeEntry('Halstead effort: ', 'halstead.effort'), new _StringUtil2.default.SafeEntry('Parameter count: ', 'params'), new _StringUtil2.default.SafeEntry('Error: ', 'errors')];

/**
 * Provides shared average method data.
 * @type {*[]}
 * @ignore
 */
var s_SHARED_METHOD_AVERAGE_DATA = [new _StringUtil2.default.SafeEntry('Average per-function physical LOC: ', 'methodAverage.sloc.physical'), new _StringUtil2.default.SafeEntry('Average per-function logical LOC: ', 'methodAverage.sloc.logical'), new _StringUtil2.default.SafeEntry('Average per-function cyclomatic complexity: ', 'methodAverage.cyclomatic'), new _StringUtil2.default.SafeEntry('Average per-function cyclomatic density: ', 'methodAverage.cyclomaticDensity', 1, '%'), new _StringUtil2.default.SafeEntry('Average per-function halstead difficulty: ', 'methodAverage.halstead.difficulty'), new _StringUtil2.default.SafeEntry('Average per-function halstead volume: ', 'methodAverage.halstead.volume'), new _StringUtil2.default.SafeEntry('Average per-function halstead effort: ', 'methodAverage.halstead.effort')];

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: Array, classReport: Array, methodReport: *[], moduleReport: *[], projectReport: *[]}}
 * @ignore
 */
var s_DEFAULT_KEYS = {
   classMethod: [].concat(s_SHARED_METHOD_DATA),

   classReport: [new _StringUtil2.default.SafeEntry('Line start: ', 'lineStart'), new _StringUtil2.default.SafeEntry('Line end: ', 'lineEnd')].concat(s_SHARED_METHOD_AVERAGE_DATA, [new _StringUtil2.default.SafeEntry('Error: ', 'errors')]),

   methodReport: [].concat(s_SHARED_METHOD_DATA),

   moduleReport: [new _StringUtil2.default.SafeEntry('Total lines: ', 'lineEnd'), new _StringUtil2.default.SafeEntry('Maintainability index: ', 'maintainability'), new _StringUtil2.default.SafeEntry('Dependency count: ', 'dependencies.length')].concat(s_SHARED_METHOD_AVERAGE_DATA, [new _StringUtil2.default.SafeEntry('Error: ', 'errors')]),

   projectReport: [new _StringUtil2.default.SafeEntry('First-order density: ', 'firstOrderDensity', 1, '%'), new _StringUtil2.default.SafeEntry('Change cost: ', 'changeCost', 1, '%'), new _StringUtil2.default.SafeEntry('Core size: ', 'coreSize', 1, '%'), new _StringUtil2.default.SafeEntry('Average per-module maintainability index: ', 'moduleAverage.maintainability'), new _StringUtil2.default.SafeEntry('Average per-function physical LOC: ', 'moduleAverage.methodAverage.sloc.physical'), new _StringUtil2.default.SafeEntry('Average per-function logical LOC: ', 'moduleAverage.methodAverage.sloc.logical'), new _StringUtil2.default.SafeEntry('Average per-function parameter count: ', 'moduleAverage.methodAverage.params'), new _StringUtil2.default.SafeEntry('Average per-function cyclomatic complexity: ', 'moduleAverage.methodAverage.cyclomatic'), new _StringUtil2.default.SafeEntry('Average per-function halstead difficulty: ', 'moduleAverage.methodAverage.halstead.difficulty'), new _StringUtil2.default.SafeEntry('Average per-function halstead effort: ', 'moduleAverage.methodAverage.halstead.effort'), new _StringUtil2.default.SafeEntry('Error: ', 'errors')]
};

/**
 * Defines the default headers as text which are inserted via spread into `StringUtil.safeStringsObject`.
 * @type {{classMethod: *[], classReport: *[], entryPrepend: string, moduleMethod: *[], moduleReport: string[], projectReport: string[]}}
 * @ignore
 */
var s_DEFAULT_HEADERS = {
   classMethod: ['\n', new _StringUtil2.default.SafeEntry('Class method: ', 'name')],

   classReport: ['\n', new _StringUtil2.default.SafeEntry('Class: ', 'name')],

   entryPrepend: '',

   moduleMethod: ['\n', new _StringUtil2.default.SafeEntry('Module method: ', 'name')],

   moduleReport: ['\n', new _StringUtil2.default.SafeEntry('Module ', '___modulecntrplus1___', 1, ':'), new _StringUtil2.default.SafeEntry('   File path: ', 'filePath'), new _StringUtil2.default.SafeEntry('   Source path: ', 'srcPath'), new _StringUtil2.default.SafeEntry('   Source alias: ', 'srcPathAlias')],

   projectReport: ['Project: \n']
};
module.exports = exports['default'];