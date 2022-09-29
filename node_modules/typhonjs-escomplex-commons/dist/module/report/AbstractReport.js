'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _TransformFormat = require('../../transform/TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides several helper methods to work with method oriented data stored as `this.aggregate` in `ClassReport` /
 * `ModuleReport` and directly in `ClassMethodReport` / `ModuleMethodReport`.
 */
var AbstractReport = function () {
  /**
   * If given assigns the method report to an internal variable. This is used by `ClassReport` and `ModuleReport`
   * which stores a `AggregateReport` respectively in `this.aggregate`.
   *
   * @param {AggregateReport}   aggregateReport - An AggregateReport to associate with this report.
   */
  function AbstractReport() {
    var aggregateReport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
    (0, _classCallCheck3.default)(this, AbstractReport);

    /**
     * Stores any associated `AggregateReport`.
     * @type {AggregateReport}
     */
    this.aggregate = aggregateReport;
  }

  /**
   * Returns the associated `AggregateReport` or `this`. Both ClassReport and ModuleReport have an
   * `aggregate` AggregateReport.
   *
   * @returns {AggregateReport}
   */


  (0, _createClass3.default)(AbstractReport, [{
    key: 'toFormat',


    /**
     * Formats this report given the type.
     *
     * @param {string}   name - The name of formatter to use.
     *
     * @param {object}   options - (Optional) One or more optional parameters to pass to the formatter.
     *
     * @returns {string}
     */
    value: function toFormat(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

      return _TransformFormat2.default.format(this, name, options);
    }
  }, {
    key: 'aggregateReport',
    get: function get() {
      return typeof this.aggregate !== 'undefined' ? this.aggregate : this;
    }
  }]);
  return AbstractReport;
}();

exports.default = AbstractReport;
module.exports = exports['default'];