'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _HalsteadAverage = require('./HalsteadAverage');

var _HalsteadAverage2 = _interopRequireDefault(_HalsteadAverage);

var _ObjectUtil = require('../../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides all the averaged method metric data.
 */
var MethodAverage = function () {
  /**
   * Initializes the default averaged method data.
   */
  function MethodAverage() {
    (0, _classCallCheck3.default)(this, MethodAverage);

    /**
     * Measures the average method cyclomatic complexity of the module / class.
     * @type {number}
     */
    this.cyclomatic = 0;

    /**
     * Measures the average method cyclomatic density of the module / class.
     * @type {number}
     */
    this.cyclomaticDensity = 0;

    /**
     * Stores the averaged Halstead metric data.
     * @type {HalsteadData}
     */
    this.halstead = new _HalsteadAverage2.default();

    /**
     * Measures the average number of method parameters for the module / class.
     * @type {number}
     */
    this.paramCount = 0;

    /**
     * Measures the average source lines of code for the module / class.
     * @type {{logical: number, physical: number}}
     */
    this.sloc = { logical: 0, physical: 0 };
  }

  /**
   * Returns the object accessor list / keys for MethodAverage.
   *
   * @returns {Array<string>}
   */


  (0, _createClass3.default)(MethodAverage, [{
    key: 'keys',
    get: function get() {
      return s_AVERAGE_KEYS;
    }
  }]);
  return MethodAverage;
}();

/**
 * Defines the default method average accessor list / keys.
 * @type {Array<string>}
 * @ignore
 */


exports.default = MethodAverage;
var s_AVERAGE_KEYS = _ObjectUtil2.default.getAccessorList(new MethodAverage());
module.exports = exports['default'];