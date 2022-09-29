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

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TransformFormat = require('../../transform/TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

var _ModuleAverage = require('../../module/report/averages/ModuleAverage');

var _ModuleAverage2 = _interopRequireDefault(_ModuleAverage);

var _ModuleReport = require('../../module/report/ModuleReport');

var _ModuleReport2 = _interopRequireDefault(_ModuleReport);

var _ReportType = require('../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _MathUtil = require('../../utils/MathUtil');

var _MathUtil2 = _interopRequireDefault(_MathUtil);

var _ObjectUtil = require('../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

var _StringUtil = require('../../utils/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the default project report object which stores data pertaining to all modules / files contained.
 *
 * All modules are stored in the `modules` member variable as ModuleReports.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
var ProjectReport = function () {
  (0, _createClass3.default)(ProjectReport, [{
    key: 'type',

    /**
     * Returns the enum for the report type.
     * @returns {ReportType}
     */
    get: function get() {
      return _ReportType2.default.PROJECT;
    }

    /**
     * Initializes ProjectReport with default values.
     *
     * @param {Array<ModuleReport>}  moduleReports - An array of ModuleReports for each module / file processed.
     *
     * @param {object}               settings - An object hash of the settings used in generating this report via
     *                                          ESComplexProject.
     */

  }]);

  function ProjectReport() {
    var moduleReports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { serializeModules: true };
    (0, _classCallCheck3.default)(this, ProjectReport);

    /**
     * Stores the settings used to generate the project report.
     * @type {object}
     */
    this.settings = (typeof settings === 'undefined' ? 'undefined' : (0, _typeof3.default)(settings)) === 'object' ? (0, _assign2.default)({}, settings) : { serializeModules: true };

    /**
     * Stores a compacted form of the adjacency matrix. Each row index corresponds to the same report index.
     * Each row entry corresponds to a report index. These relationships dictate the dependencies between all
     * report ModuleReports given the source paths.
     *
     * @type {Array<Array<number>>}
     */
    this.adjacencyList = void 0;

    /**
     * Measures the average percentage of modules affected when one module / file in the project is changed.
     * Lower is better.
     * @type {number}
     */
    this.changeCost = 0;

    /**
     * Measures the percentage of modules that are widely depended on which also depend on other modules.
     * Lower is better.
     * @type {number}
     */
    this.coreSize = 0;

    /**
     * Stores any analysis errors.
     * @type {Array}
     */
    this.errors = [];

    /**
     * Measures the percentage of all possible internal dependencies that are actually realized in the project.
     * Lower is better.
     * @type {number}
     */
    this.firstOrderDensity = 0;

    /**
     * Stores the average module metric data.
     * @type {ModuleAverage}
     */
    this.moduleAverage = new _ModuleAverage2.default();

    /**
     * Stores all ModuleReport data for the project sorted by the module / files `srcPath`.
     * @type {Array<ModuleReport>}
     */
    this.modules = Array.isArray(moduleReports) ? moduleReports.sort(function (lhs, rhs) {
      return _StringUtil2.default.compare(lhs.srcPath, rhs.srcPath);
    }) : [];

    /**
     * Stores a compacted form of the visibility matrix. Each row index corresponds to the same report index.
     * Each row entry corresponds to a report index. These relationships dictate the reverse visibility between all
     * report ModuleReports which may indirectly impact the given module / file.
     *
     * @type {Array<Array<number>>}
     */
    this.visibilityList = void 0;
  }

  /**
   * Clears all errors stored in the project report and by default any module reports.
   *
   * @param {boolean}  clearChildren - (Optional) If false then class and module method errors are not cleared;
   *                                   default (true).
   */


  (0, _createClass3.default)(ProjectReport, [{
    key: 'clearErrors',
    value: function clearErrors() {
      var clearChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.errors = [];

      if (clearChildren) {
        this.modules.forEach(function (report) {
          report.clearErrors();
        });
      }
    }

    /**
     * Finalizes the ProjectReport. If `settings.serializeModules` is false output just `filePath`, `srcPath` &
     * `srcPathAlias` entries of modules.
     *
     * @param {object}      options - (Optional) Allows overriding of ModuleReport serialization.
     * @property {boolean}  serializeModules - Allows overriding of ModuleReport serialization; default: true.
     *
     * @returns {ProjectReport}
     */

  }, {
    key: 'finalize',
    value: function finalize() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
        throw new TypeError('finalize error: \'options\' is not an \'object\'.');
      }

      var serializeModules = this.getSetting('serializeModules', true);

      // Allow an override opportunity.
      if (typeof options.serializeModules === 'boolean') {
        serializeModules = options.serializeModules;
      }

      if (serializeModules) {
        this.modules.forEach(function (report) {
          report.finalize();
        });
      } else {
        this.modules = this.modules.map(function (report) {
          return { filePath: report.filePath, srcPath: report.srcPath, srcPathAlias: report.srcPathAlias };
        });
      }

      return _MathUtil2.default.toFixedTraverse(this);
    }

    /**
     * Gets all errors stored in the project report and by default any module reports.
     *
     * @param {object}   options - Optional parameters.
     * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
     * @property {boolean}  includeReports - If true then the result will be an array of object hashes containing
     *                                       `source` (the source report object of the error) and `error`
     *                                       (an AnalyzeError instance) keys and related `module`, `class` entries as;
     *                                       default (false).
     *
     * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
     */

  }, {
    key: 'getErrors',
    value: function getErrors() {
      var _this = this,
          _ref;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { includeChildren: true, includeReports: false };

      /* istanbul ignore if */
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
        throw new TypeError('getErrors error: \'options\' is not an \'object\'.');
      }

      // By default set includeChildren to true if not already defined.
      /* istanbul ignore if */
      if (typeof options.includeChildren !== 'boolean') {
        options.includeChildren = true;
      }

      // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
      var errors = options.includeReports ? this.errors.map(function (entry) {
        return { error: entry, source: _this };
      }) : (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(this.errors));

      // If `includeChildren` is true then traverse all children reports for errors.
      if (options.includeChildren) {
        this.modules.forEach(function (report) {
          var _errors;

          (_errors = errors).push.apply(_errors, (0, _toConsumableArray3.default)(report.getErrors(options)));
        });
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
      return '';
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
     * Deserializes a JSON object representing a ProjectReport.
     *
     * @param {object}   object - A JSON object of a ProjectReport that was previously serialized.
     *
     * @param {object}   options - Optional parameters.
     * @property {boolean}  skipFinalize - If true then automatic finalization is skipped where applicable.
     *
     * @returns {ProjectReport}
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

    /**
     * Formats this ProjectReport given the type.
     *
     * @param {string}   name - The name of formatter to use.
     *
     * @param {object}   options - (Optional) One or more optional parameters to pass to the formatter.
     *
     * @returns {string}
     */

  }, {
    key: 'toFormat',
    value: function toFormat(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      return _TransformFormat2.default.format(this, name, options);
    }
  }], [{
    key: 'getFormats',
    value: function getFormats() {
      return _TransformFormat2.default.getFormats(_ReportType2.default.PROJECT);
    }
  }, {
    key: 'parse',
    value: function parse(object) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { skipFinalize: false };

      /* istanbul ignore if */
      if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object') {
        throw new TypeError('parse error: \'object\' is not an \'object\'.');
      }

      /* istanbul ignore if */
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
        throw new TypeError('parse error: \'options\' is not an \'object\'.');
      }

      var projectReport = (0, _assign2.default)(new ProjectReport(), object);

      if (projectReport.modules.length > 0) {
        projectReport.modules = projectReport.modules.map(function (report) {
          return _ModuleReport2.default.parse(report);
        });
      }

      // Must automatically finalize if serializeModules is false.
      if (!options.skipFinalize && !projectReport.getSetting('serializeModules', true)) {
        projectReport.finalize();
      }

      return projectReport;
    }
  }]);
  return ProjectReport;
}();

exports.default = ProjectReport;
module.exports = exports['default'];