'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _FormatJSON = require('./formats/json/FormatJSON');

var _FormatJSON2 = _interopRequireDefault(_FormatJSON);

var _FormatJSONCheckstyle = require('./formats/json/FormatJSONCheckstyle');

var _FormatJSONCheckstyle2 = _interopRequireDefault(_FormatJSONCheckstyle);

var _FormatJSONMinimal = require('./formats/json/FormatJSONMinimal');

var _FormatJSONMinimal2 = _interopRequireDefault(_FormatJSONMinimal);

var _FormatJSONModules = require('./formats/json/FormatJSONModules');

var _FormatJSONModules2 = _interopRequireDefault(_FormatJSONModules);

var _FormatMarkdown = require('./formats/markdown/FormatMarkdown');

var _FormatMarkdown2 = _interopRequireDefault(_FormatMarkdown);

var _FormatMarkdownAdjacency = require('./formats/markdown/FormatMarkdownAdjacency');

var _FormatMarkdownAdjacency2 = _interopRequireDefault(_FormatMarkdownAdjacency);

var _FormatMarkdownMinimal = require('./formats/markdown/FormatMarkdownMinimal');

var _FormatMarkdownMinimal2 = _interopRequireDefault(_FormatMarkdownMinimal);

var _FormatMarkdownModules = require('./formats/markdown/FormatMarkdownModules');

var _FormatMarkdownModules2 = _interopRequireDefault(_FormatMarkdownModules);

var _FormatMarkdownVisibility = require('./formats/markdown/FormatMarkdownVisibility');

var _FormatMarkdownVisibility2 = _interopRequireDefault(_FormatMarkdownVisibility);

var _FormatText = require('./formats/text/FormatText');

var _FormatText2 = _interopRequireDefault(_FormatText);

var _FormatTextAdjacency = require('./formats/text/FormatTextAdjacency');

var _FormatTextAdjacency2 = _interopRequireDefault(_FormatTextAdjacency);

var _FormatTextMinimal = require('./formats/text/FormatTextMinimal');

var _FormatTextMinimal2 = _interopRequireDefault(_FormatTextMinimal);

var _FormatTextModules = require('./formats/text/FormatTextModules');

var _FormatTextModules2 = _interopRequireDefault(_FormatTextModules);

var _FormatTextVisibility = require('./formats/text/FormatTextVisibility');

var _FormatTextVisibility2 = _interopRequireDefault(_FormatTextVisibility);

var _ReportType = require('../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Stores all transform formats.
 * @type {Map<string>, object}
 * @ignore
 */
var s_FORMATTERS = new _map2.default();

/**
 * TransformFormat
 */

var TransformFormat = function () {
   function TransformFormat() {
      (0, _classCallCheck3.default)(this, TransformFormat);
   }

   (0, _createClass3.default)(TransformFormat, null, [{
      key: 'addFormat',

      /**
       * Adds a formatter to the static Map by type: `format.type`.
       *
       * @param {object}   format - An instance of an object conforming to the module / project transform format API.
       */
      value: function addFormat(format) {
         if ((typeof format === 'undefined' ? 'undefined' : (0, _typeof3.default)(format)) !== 'object') {
            throw new TypeError('addFormat error: \'format\' is not an \'object\'.');
         }

         if (typeof format.name !== 'string') {
            throw new TypeError('addFormat error: \'format.name\' is not a \'string\'.');
         }

         if (typeof format.extension !== 'string') {
            throw new TypeError('addFormat error: \'format.extension\' is not a \'string\' for \'' + format.name + '\'.');
         }

         if (typeof format.type !== 'string') {
            throw new TypeError('addFormat error: \'format.type\' is not a \'string\' for \'' + format.name + '\'.');
         }

         if (typeof format.formatReport !== 'function') {
            throw new TypeError('addFormat error: \'format.formatReport\' is not a \'function\' for \'' + format.name + '\'.');
         }

         if (typeof format.isSupported !== 'function') {
            throw new TypeError('addFormat error: \'format.isSupported\' is not a \'function\' for \'' + format.name + '\'.');
         }

         s_FORMATTERS.set(format.name, format);
      }

      /**
       * Invokes the callback for each stored formatter.
       *
       * @param {function} callback - A callback function.
       * @param {object}   thisArg - (Optional) this context.
       */

   }, {
      key: 'forEach',
      value: function forEach(callback) {
         var thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

         s_FORMATTERS.forEach(callback, thisArg);
      }

      /**
       * Provides a `forEach` variation that invokes the callback if the given extension matches that of a stored
       * formatter.
       *
       * @param {string}   extension - A format extension.
       * @param {function} callback - A callback function.
       * @param {object}   thisArg - (Optional) this context.
       */

   }, {
      key: 'forEachExt',
      value: function forEachExt(extension, callback) {
         var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;
         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = (0, _getIterator3.default)(s_FORMATTERS.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var format = _step.value;

               if (format.extension === extension) {
                  callback.call(thisArg, format, format.name);
               }
            }
         } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }
            } finally {
               if (_didIteratorError) {
                  throw _iteratorError;
               }
            }
         }
      }

      /**
       * Provides a `forEach` variation that invokes the callback if the given type matches that of a stored
       * formatter.
       *
       * @param {string}   type - A format type.
       * @param {function} callback - A callback function.
       * @param {object}   thisArg - (Optional) this context.
       */

   }, {
      key: 'forEachType',
      value: function forEachType(type, callback) {
         var thisArg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;
         var _iteratorNormalCompletion2 = true;
         var _didIteratorError2 = false;
         var _iteratorError2 = undefined;

         try {
            for (var _iterator2 = (0, _getIterator3.default)(s_FORMATTERS.values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
               var format = _step2.value;

               if (format.type === type) {
                  callback.call(thisArg, format, format.name);
               }
            }
         } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
               }
            } finally {
               if (_didIteratorError2) {
                  throw _iteratorError2;
               }
            }
         }
      }

      /**
       * Formats a given ModuleReport or ProjectReport via the formatter of the requested type.
       *
       * @param {ClassReport|MethodReport|ModuleReport|ProjectReport} report - A report to format.
       *
       * @param {string}                     name - The name of formatter to invoke.
       *
       * @param {object}                     options - (Optional) One or more optional parameters to pass to the formatter.
       *
       * @returns {string}
       */

   }, {
      key: 'format',
      value: function format(report, name) {
         var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;

         var formatter = s_FORMATTERS.get(name);

         if (typeof formatter === 'undefined') {
            throw new Error('format error: unknown formatter name \'' + name + '\'.');
         }

         switch (report.type) {
            case _ReportType2.default.CLASS:
            case _ReportType2.default.CLASS_METHOD:
            case _ReportType2.default.MODULE_METHOD:
            case _ReportType2.default.MODULE:
            case _ReportType2.default.NESTED_METHOD:
            case _ReportType2.default.PROJECT:
               return formatter.formatReport(report, options);

            default:
               throw new TypeError('format error: unknown report type \'' + report.type + '\'.');
         }
      }

      /**
       * Returns the supported format file extension types.
       *
       * @param {ReportType}  reportType - (Optional) A ReportType to filter supported formats.
       *
       * @returns {string[]}
       */

   }, {
      key: 'getFormats',
      value: function getFormats() {
         var reportType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;

         // Return all file extensions
         if (typeof reportType === 'undefined') {
            return (0, _from2.default)(s_FORMATTERS.values());
         }

         if (!(reportType instanceof _ReportType2.default)) {
            throw new TypeError('getFormats error: \'reportType\' is not an instance of \'ReportType\'.');
         }

         // Return a filtered array of formats that are supported by the given ReportType.
         return (0, _from2.default)(s_FORMATTERS.values()).filter(function (format) {
            return format.isSupported(reportType);
         });
      }

      /**
       * Returns whether a given formatter by name is available.
       *
       * @param {string}   name - The name of the formatter: `format.name`.
       *
       * @returns {boolean}
       */

   }, {
      key: 'isFormat',
      value: function isFormat(name) {
         return s_FORMATTERS.has(name);
      }

      /**
       * Returns whether a given formatter by name is supports a given report.
       *
       * @param {string}      name - The name of the formatter: `format.name`.
       *
       * @param {ReportType}  reportType - A ReportType to check for support.
       *
       * @returns {boolean}
       */

   }, {
      key: 'isSupported',
      value: function isSupported(name, reportType) {
         if (!s_FORMATTERS.has(name)) {
            return false;
         }

         return s_FORMATTERS.get(name).isSupported(reportType);
      }

      /**
       * Removes a formatter from the static Map by name.
       *
       * @param {string}   name - The name of the formatter: `format.name`.
       */

   }, {
      key: 'removeFormat',
      value: function removeFormat(name) {
         s_FORMATTERS.delete(name);
      }
   }]);
   return TransformFormat;
}();

/**
 * Load all integrated format transforms.
 */


exports.default = TransformFormat;
TransformFormat.addFormat(new _FormatJSON2.default());
TransformFormat.addFormat(new _FormatJSONCheckstyle2.default());
TransformFormat.addFormat(new _FormatJSONMinimal2.default());
TransformFormat.addFormat(new _FormatJSONModules2.default());
TransformFormat.addFormat(new _FormatMarkdown2.default());
TransformFormat.addFormat(new _FormatMarkdownAdjacency2.default());
TransformFormat.addFormat(new _FormatMarkdownMinimal2.default());
TransformFormat.addFormat(new _FormatMarkdownModules2.default());
TransformFormat.addFormat(new _FormatMarkdownVisibility2.default());
TransformFormat.addFormat(new _FormatText2.default());
TransformFormat.addFormat(new _FormatTextAdjacency2.default());
TransformFormat.addFormat(new _FormatTextMinimal2.default());
TransformFormat.addFormat(new _FormatTextModules2.default());
TransformFormat.addFormat(new _FormatTextVisibility2.default());
module.exports = exports['default'];