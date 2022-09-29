'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractReport2 = require('./AbstractReport');

var _AbstractReport3 = _interopRequireDefault(_AbstractReport2);

var _AggregateReport = require('./AggregateReport');

var _AggregateReport2 = _interopRequireDefault(_AggregateReport);

var _ClassReport = require('./ClassReport');

var _ClassReport2 = _interopRequireDefault(_ClassReport);

var _MethodAverage = require('./averages/MethodAverage');

var _MethodAverage2 = _interopRequireDefault(_MethodAverage);

var _ModuleMethodReport = require('./ModuleMethodReport');

var _ModuleMethodReport2 = _interopRequireDefault(_ModuleMethodReport);

var _AnalyzeError = require('../../analyze/AnalyzeError');

var _AnalyzeError2 = _interopRequireDefault(_AnalyzeError);

var _MathUtil = require('../../utils/MathUtil');

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _ObjectUtil = require('../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

var _ReportType = require('../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _TransformFormat = require('../../transform/TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the module report object which stores data pertaining to a single file / module being processed.
 *
 * All ES Module classes are stored in the `classes` member variable as ClassReports. Methods that are not part of a
 * class are stored as ModuleMethodReport instances in the `methods` member variable.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
var ModuleReport = function (_AbstractReport) {
  (0, _inherits3.default)(ModuleReport, _AbstractReport);
  (0, _createClass3.default)(ModuleReport, [{
    key: 'type',

    /**
     * Returns the enum for the report type.
     * @returns {ReportType}
     */
    get: function get() {
      return _ReportType2.default.MODULE;
    }

    /**
     * Initializes the report.
     *
     * @param {number}   lineStart - Start line of file / module.
     *
     * @param {number}   lineEnd - End line of file / module.
     *
     * @param {object}   settings - An object hash of the settings used in generating this report via ESComplexModule.
     */

  }]);

  function ModuleReport() {
    var lineStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var lineEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck3.default)(this, ModuleReport);

    /**
     * Stores the settings used to generate the module report.
     * @type {object}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ModuleReport.__proto__ || (0, _getPrototypeOf2.default)(ModuleReport)).call(this, new _AggregateReport2.default(lineStart, lineEnd)));

    _this.settings = (typeof settings === 'undefined' ? 'undefined' : (0, _typeof3.default)(settings)) === 'object' ? (0, _assign2.default)({}, settings) : {};

    /**
     * Stores all ClassReport data for the module.
     * @type {Array<ClassReport>}
     */
    _this.classes = [];

    /**
     * Stores all parsed dependencies.
     * @type {Array}
     */
    _this.dependencies = [];

    /**
     * Stores any analysis errors.
     * @type {Array}
     */
    _this.errors = [];

    /**
     * Stores the file path of the module / file. The file path is only defined as supplied when processing projects.
     * @type {string}
     */
    _this.filePath = void 0;

    /**
     * Stores the end line for the module / file.
     * @type {number}
     */
    _this.lineEnd = lineEnd;

    /**
     * Stores the start line for the module / file.
     * @type {number}
     */
    _this.lineStart = lineStart;

    /**
     * Measures the average maintainability index for the module / file.
     * @type {number}
     */
    _this.maintainability = 0;

    /**
     * Stores all module ModuleMethodReport data found outside of any ES6 classes.
     * @type {Array<ModuleMethodReport>}
     */
    _this.methods = [];

    /**
     * Stores the average module / class aggregate & method metric data.
     * @type {MethodAverage}
     */
    _this.aggregateAverage = new _MethodAverage2.default();

    /**
     * Stores just the average method metric data.
     * @type {MethodAverage}
     */
    _this.methodAverage = new _MethodAverage2.default();

    /**
     * Stores the active source path of the module / file. This path is respective of how the file is referenced in
     * the source code itself. `srcPath` is only defined as supplied when processing projects.
     * @type {string}
     */
    _this.srcPath = void 0;

    /**
     * Stores the active source path alias of the module / file. This path is respective of how the file is
     * referenced in the source code itself when aliased including NPM and JSPM modules which provide a `main` entry.
     * `srcPathAlias` is only defined as supplied when processing projects.
     * @type {string}
     */
    _this.srcPathAlias = void 0;
    return _this;
  }

  /**
   * Clears all errors stored in the module report and by default any class reports and module methods.
   *
   * @param {boolean}  clearChildren - (Optional) If false then class and module method errors are not cleared;
   *                                   default (true).
   */


  (0, _createClass3.default)(ModuleReport, [{
    key: 'clearErrors',
    value: function clearErrors() {
      var clearChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.errors = [];

      if (clearChildren) {
        this.classes.forEach(function (report) {
          report.clearErrors();
        });
        this.methods.forEach(function (report) {
          report.clearErrors();
        });
      }
    }

    /**
     * Cleans up any house keeping member variables.
     *
     * @returns {ModuleReport}
     */

  }, {
    key: 'finalize',
    value: function finalize() {
      return _MathUtil2.default.toFixedTraverse(this);
    }

    /**
     * Gets all errors stored in the module report and by default any module methods and class reports.
     *
     * @param {object}   options - Optional parameters.
     * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
     * @property {boolean}  includeReports - If true then results will be an array of object hashes containing `source`
     *                                      (the source report object of the error) and `error`
     *                                      (an AnalyzeError instance) keys; default (false).
     *
     * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
     */

  }, {
    key: 'getErrors',
    value: function getErrors() {
      var _this2 = this,
          _ref;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { includeChildren: true, includeReports: false };

      /* istanbul ignore if */
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
        throw new TypeError('getErrors error: \'options\' is not an \'object\'.');
      }

      // By default set includeChildren to true.
      /* istanbul ignore if */
      if (typeof options.includeChildren !== 'boolean') {
        options.includeChildren = true;
      }

      // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
      var errors = options.includeReports ? this.errors.map(function (entry) {
        return { error: entry, source: _this2 };
      }) : (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(this.errors));

      // If `includeChildren` is true then traverse all children reports for errors.
      if (options.includeChildren) {
        // Add module to all children errors.
        if (options.includeReports) {
          var _errors;

          var childErrors = [];

          this.methods.forEach(function (report) {
            childErrors.push.apply(childErrors, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });
          this.classes.forEach(function (report) {
            childErrors.push.apply(childErrors, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });

          // Add module to object hash.
          childErrors.forEach(function (error) {
            error.module = _this2;
          });

          // Push to all module errors.
          (_errors = errors).push.apply(_errors, childErrors);
        } else {
          this.methods.forEach(function (report) {
            var _errors2;

            (_errors2 = errors).push.apply(_errors2, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });
          this.classes.forEach(function (report) {
            var _errors3;

            (_errors3 = errors).push.apply(_errors3, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });
        }
      }

      // If `options.query` is defined then filter errors against the query object.
      if ((0, _typeof3.default)(options.query) === 'object') {
        errors = errors.filter(function (error) {
          return _ObjectUtil2.default.safeEqual(options.query, error);
        });
      }

      return errors;
    }

    /**
     * Returns the supported transform formats.
     *
     * @returns {Object[]}
     */

  }, {
    key: 'getName',


    /**
     * Returns the name / id associated with this report.
     * @returns {string}
     */
    value: function getName() {
      return typeof this.srcPath === 'string' ? this.srcPath : '';
    }

    /**
     * Returns the setting indexed by the given key.
     *
     * @param {string}   key - A key used to store the setting parameter.
     * @param {*}        defaultValue - A default value to return if no setting for the given key is currently stored.
     *
     * @returns {*}
     */

  }, {
    key: 'getSetting',
    value: function getSetting(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '') {
        throw new TypeError('getSetting error: \'key\' is not a \'string\' or is empty.');
      }

      return (0, _typeof3.default)(this.settings) === 'object' && typeof this.settings[key] !== 'undefined' ? this.settings[key] : defaultValue;
    }

    /**
     * Deserializes a JSON object representing a ModuleReport.
     *
     * @param {object}   object - A JSON object of a ModuleReport that was previously serialized.
     *
     * @returns {ModuleReport}
     */

  }, {
    key: 'setSetting',


    /**
     * Sets the setting indexed by the given key and returns true if successful.
     *
     * @param {string}   key - A key used to store the setting parameter.
     * @param {*}        value - A value to set to `this.settings[key]`.
     *
     * @returns {boolean}
     */
    value: function setSetting(key, value) {
      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '') {
        throw new TypeError('setSetting error: \'key\' is not a \'string\' or is empty.');
      }

      if (this.settings === 'object') {
        this.settings[key] = value;
        return true;
      }

      return false;
    }
  }], [{
    key: 'getFormats',
    value: function getFormats() {
      return _TransformFormat2.default.getFormats(_ReportType2.default.MODULE);
    }
  }, {
    key: 'parse',
    value: function parse(object) {
      /* istanbul ignore if */
      if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object') {
        throw new TypeError('parse error: \'object\' is not an \'object\'.');
      }

      var report = (0, _assign2.default)(new ModuleReport(), object);

      if (report.classes.length > 0) {
        report.classes = report.classes.map(function (classReport) {
          return _ClassReport2.default.parse(classReport);
        });
      }

      if (report.errors.length > 0) {
        report.errors = report.errors.map(function (error) {
          return _AnalyzeError2.default.parse(error);
        });
      }

      if (report.methods.length > 0) {
        report.methods = report.methods.map(function (methodReport) {
          return _ModuleMethodReport2.default.parse(methodReport);
        });
      }

      return report;
    }
  }]);
  return ModuleReport;
}(_AbstractReport3.default);

exports.default = ModuleReport;
module.exports = exports['default'];