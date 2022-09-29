'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _ClassMethodReport = require('./ClassMethodReport');

var _ClassMethodReport2 = _interopRequireDefault(_ClassMethodReport);

var _MethodAverage = require('./averages/MethodAverage');

var _MethodAverage2 = _interopRequireDefault(_MethodAverage);

var _AnalyzeError = require('../../analyze/AnalyzeError');

var _AnalyzeError2 = _interopRequireDefault(_AnalyzeError);

var _ReportType = require('../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _ObjectUtil = require('../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

var _TransformFormat = require('../../transform/TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the class report object which stores data pertaining to a single ES6 class.
 *
 * Methods that are stored as ClassMethodReport instances in the `methods` member variable.
 */
var ClassReport = function (_AbstractReport) {
  (0, _inherits3.default)(ClassReport, _AbstractReport);
  (0, _createClass3.default)(ClassReport, [{
    key: 'type',

    /**
     * Returns the enum for the report type.
     * @returns {ReportType}
     */
    get: function get() {
      return _ReportType2.default.CLASS;
    }

    /**
     * Initializes class report.
     *
     * @param {string}   name - Name of the class.
     * @param {string}   superClassName - Name of any associated super class.
     * @param {number}   lineStart - Start line of class.
     * @param {number}   lineEnd - End line of class.
     */

  }]);

  function ClassReport() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
    var superClassName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;
    var lineStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var lineEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    (0, _classCallCheck3.default)(this, ClassReport);

    /**
     * Stores any analysis errors.
     * @type {Array}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (ClassReport.__proto__ || (0, _getPrototypeOf2.default)(ClassReport)).call(this, new _AggregateReport2.default(lineStart, lineEnd, 0)));

    _this.errors = [];

    /**
     * Stores the end line for the class.
     * @type {number}
     */
    _this.lineEnd = lineEnd;

    /**
     * Stores the start line for the class.
     * @type {number}
     */
    _this.lineStart = lineStart;

    /**
     * Stores all method data.
     * @type {Array<ClassMethodReport>}
     */
    _this.methods = [];

    /**
     * Stores the average class aggregate & method metric data.
     * @type {MethodAverage}
     */
    _this.aggregateAverage = new _MethodAverage2.default();

    /**
     * Stores the average method metric data.
     * @type {MethodAverage}
     */
    _this.methodAverage = new _MethodAverage2.default();

    /**
     * The name of the class.
     * @type {string}
     */
    _this.name = name;

    /**
     * The name of any associated super class.
     * @type {string}
     */
    _this.superClassName = superClassName;
    return _this;
  }

  /**
   * Clears all errors stored in the class report and by default any class methods.
   *
   * @param {boolean}  clearChildren - (Optional) If false then class method errors are not cleared; default (true).
   */


  (0, _createClass3.default)(ClassReport, [{
    key: 'clearErrors',
    value: function clearErrors() {
      var clearChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.errors = [];

      if (clearChildren) {
        this.methods.forEach(function (report) {
          report.clearErrors();
        });
      }
    }

    /**
     * Gets all errors stored in the class report and by default any class methods.
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
        // Add class to all children errors.
        if (options.includeReports) {
          var _errors;

          var childErrors = [];

          this.methods.forEach(function (report) {
            childErrors.push.apply(childErrors, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });

          // Add module to object hash.
          childErrors.forEach(function (error) {
            error.class = _this2;
          });

          // Push to all module errors.
          (_errors = errors).push.apply(_errors, childErrors);
        } else {
          this.methods.forEach(function (report) {
            var _errors2;

            (_errors2 = errors).push.apply(_errors2, (0, _toConsumableArray3.default)(report.getErrors(options)));
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
      return this.name;
    }

    /**
     * Deserializes a JSON object representing a ClassReport.
     *
     * @param {object}   object - A JSON object of a ClassReport that was previously serialized.
     *
     * @returns {ClassReport}
     */

  }], [{
    key: 'getFormats',
    value: function getFormats() {
      return _TransformFormat2.default.getFormats(_ReportType2.default.CLASS);
    }
  }, {
    key: 'parse',
    value: function parse(object) {
      /* istanbul ignore if */
      if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object') {
        throw new TypeError('parse error: \'object\' is not an \'object\'.');
      }

      var classReport = (0, _assign2.default)(new ClassReport(), object);

      if (classReport.errors.length > 0) {
        classReport.errors = classReport.errors.map(function (error) {
          return _AnalyzeError2.default.parse(error);
        });
      }

      if (classReport.methods.length > 0) {
        classReport.methods = classReport.methods.map(function (methodReport) {
          return _ClassMethodReport2.default.parse(methodReport);
        });
      }

      return classReport;
    }
  }]);
  return ClassReport;
}(_AbstractReport3.default);

exports.default = ClassReport;
module.exports = exports['default'];