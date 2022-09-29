'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides all Halstead metric data / parameters.
 * @see https://en.wikipedia.org/wiki/Halstead_complexity_measures
 */
var HalsteadData = function () {
  /**
   * Initializes the default Halstead data.
   */
  function HalsteadData() {
    (0, _classCallCheck3.default)(this, HalsteadData);

    /**
     * Measures an estimate for the number of potential errors.
     * @type {number}
     */
    this.bugs = 0;

    /**
     * Measures the difficulty of the program to write or understand.
     * @type {number}
     */
    this.difficulty = 0;

    /**
     * Measures the maintenance effort of the program.
     * @type {number}
     */
    this.effort = 0;

    /**
     * Defines the number of operands and operators.
     * @type {number}
     */
    this.length = 0;

    /**
     * Measures potential coding time.
     * @type {number}
     */
    this.time = 0;

    /**
     * Defines the unique number of operands and operators.
     * @type {number}
     */
    this.vocabulary = 0;

    /**
     * Measures how much information a reader of the code potential has to absorb to understand its meaning.
     * @type {number}
     */
    this.volume = 0;

    /**
     * In general an operand participates in actions associated with operators. A distinct and total count is provided
     * with all identifiers.
     * @type {{distinct: number, total: number, identifiers: Array<string>}}
     */
    this.operands = { distinct: 0, total: 0, identifiers: [] };

    /**
     * In general an operator carries out an action. A distinct and total count is provided with all identifiers.
     * @type {{distinct: number, total: number, identifiers: Array<string>}}
     */
    this.operators = { distinct: 0, total: 0, identifiers: [] };
  }

  /**
   * Resets the state of all Halstead data metrics without removing any operand or operator data.
   *
   * @param {boolean}  clearIdentifiers - Clears operands / operators; default: false.
   *
   * @returns {HalsteadData}
   */


  (0, _createClass3.default)(HalsteadData, [{
    key: 'reset',
    value: function reset() {
      var _this = this;

      var clearIdentifiers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      (0, _keys2.default)(this).forEach(function (key) {
        if (typeof _this[key] === 'number') {
          _this[key] = 0;
        }
      });

      if (clearIdentifiers) {
        this.operands = { distinct: 0, total: 0, identifiers: [] };
        this.operators = { distinct: 0, total: 0, identifiers: [] };
      }

      return this;
    }
  }]);
  return HalsteadData;
}();

exports.default = HalsteadData;
module.exports = exports['default'];