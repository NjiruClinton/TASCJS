'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _MethodAverage = require('./MethodAverage');

var _MethodAverage2 = _interopRequireDefault(_MethodAverage);

var _ObjectUtil = require('../../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides all the averaged module metric data.
 */
var ModuleAverage = function () {
  /**
   * Initializes the default averaged module data.
   */
  function ModuleAverage() {
    (0, _classCallCheck3.default)(this, ModuleAverage);

    this.methodAverage = new _MethodAverage2.default();

    /**
     * Measures the average method maintainability index for the module / file.
     * @type {number}
     */
    this.maintainability = 0;
  }

  /**
   * Returns the object accessor list / keys for ModuleAverage.
   *
   * @returns {Array<string>}
   */


  (0, _createClass3.default)(ModuleAverage, [{
    key: 'keys',
    get: function get() {
      return s_AVERAGE_KEYS;
    }
  }]);
  return ModuleAverage;
}();

/**
 * Defines the default module average accessor list / keys.
 * @type {Array<string>}
 * @ignore
 */


exports.default = ModuleAverage;
var s_AVERAGE_KEYS = _ObjectUtil2.default.getAccessorList(new ModuleAverage());
module.exports = exports['default'];