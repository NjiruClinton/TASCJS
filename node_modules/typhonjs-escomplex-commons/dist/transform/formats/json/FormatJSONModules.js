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

var _ReportType = require('../../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ESComplex ModuleReport / ProjectReport instances converting them to JSON that
 * includes only the `filePath`, `srcPath`, and / or `srcPathAlias` of module report entries.
 */
var FormatJSONModules = function () {
   function FormatJSONModules() {
      (0, _classCallCheck3.default)(this, FormatJSONModules);
   }

   (0, _createClass3.default)(FormatJSONModules, [{
      key: 'formatReport',

      /**
       * Formats a report as a JSON string with just module data.
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

         var output = void 0;

         switch (report.type) {
            case _ReportType2.default.MODULE:
               output = this._formatModule(report);
               break;

            case _ReportType2.default.PROJECT:
               output = this._formatProject(report);
               break;

            default:
               console.warn('formatReport \'' + this.name + '\' warning: unsupported report type \'' + report.type + '\'.');
               return '';
         }

         return (typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object' && (0, _isInteger2.default)(options.spacing) ? (0, _stringify2.default)(output, void 0, options.spacing) : (0, _stringify2.default)(output);
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

      /**
       * Formats a module report as a JSON string. Please note that the exported JSON only contains data for ModuleReport
       * instances contained in a ProjectReport.
       *
       * @param {ModuleReport}   moduleReport - A module report.
        * @returns {object}
       */

   }, {
      key: '_formatModule',
      value: function _formatModule(moduleReport) {
         var output = {};

         if (moduleReport.filePath) {
            output.filePath = moduleReport.filePath;
         }
         if (moduleReport.srcPath) {
            output.srcPath = moduleReport.srcPath;
         }
         if (moduleReport.srcPathAlias) {
            output.srcPathAlias = moduleReport.srcPathAlias;
         }

         return output;
      }

      /**
       * Formats a project report modules as a JSON string.
       *
       * @param {ProjectReport}  projectReport - A project report.
       *
       * @returns {object}
       */

   }, {
      key: '_formatProject',
      value: function _formatProject(projectReport) {
         var _this = this;

         var output = { modules: [] };

         projectReport.modules.forEach(function (moduleReport) {
            output.modules.push(_this._formatModule(moduleReport));
         });

         return output;
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
         return 'json-modules';
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
   return FormatJSONModules;
}();

exports.default = FormatJSONModules;
module.exports = exports['default'];