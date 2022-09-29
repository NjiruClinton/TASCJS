'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _AbstractReport2 = require('./AbstractReport');

var _AbstractReport3 = _interopRequireDefault(_AbstractReport2);

var _HalsteadData = require('./HalsteadData');

var _HalsteadData2 = _interopRequireDefault(_HalsteadData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the aggregate report object which stores base data pertaining to a single method / function or cumulative
 * aggregate data for a ModuleReport / ClassReport.
 */
var AggregateReport = function (_AbstractReport) {
  (0, _inherits3.default)(AggregateReport, _AbstractReport);

  /**
   * Initializes aggregate report.
   *
   * @param {number}   lineStart - Start line of method.
   * @param {number}   lineEnd - End line of method.
   * @param {number}   baseCyclomatic - The initial base cyclomatic complexity of the report. Module and class reports
   *                                    start at 0.
   */
  function AggregateReport() {
    var lineStart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var lineEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var baseCyclomatic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    (0, _classCallCheck3.default)(this, AggregateReport);

    /**
     * The cyclomatic complexity of the method / report.
     * @type {number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (AggregateReport.__proto__ || (0, _getPrototypeOf2.default)(AggregateReport)).call(this));

    _this.cyclomatic = baseCyclomatic;

    /**
     * The cyclomatic density of the method.
     * @type {number}
     */
    _this.cyclomaticDensity = 0;

    /**
     * Stores the Halstead data instance.
     * @type {HalsteadData}
     */
    _this.halstead = new _HalsteadData2.default();

    /**
     * The number of parameters for the method or aggregate report.
     * @type {number}
     */
    _this.paramCount = 0;

    /**
     * The source lines of code for the method.
     * @type {{logical: number, physical: number}}
     */
    _this.sloc = { logical: 0, physical: lineEnd - lineStart + 1 };
    return _this;
  }

  return AggregateReport;
}(_AbstractReport3.default);

exports.default = AggregateReport;
module.exports = exports['default'];