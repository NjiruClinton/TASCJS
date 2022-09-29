'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _MethodReport2 = require('./MethodReport');

var _MethodReport3 = _interopRequireDefault(_MethodReport2);

var _ReportType = require('../../types/ReportType');

var _ReportType2 = _interopRequireDefault(_ReportType);

var _TransformFormat = require('../../transform/TransformFormat');

var _TransformFormat2 = _interopRequireDefault(_TransformFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the module method report object which stores data pertaining to a single method / function.
 */
var NestedMethodReport = function (_MethodReport) {
  (0, _inherits3.default)(NestedMethodReport, _MethodReport);

  /**
   * Initializes nested method report.
   *
   * @param {string}   name - Name of the method.
   * @param {number}   paramNames - Array of any associated parameter names.
   * @param {number}   lineStart - Start line of method.
   * @param {number}   lineEnd - End line of method.
   * @param {number}   nestedDepth - Depth of nested methods
   */
  function NestedMethodReport(name, paramNames, lineStart, lineEnd) {
    var nestedDepth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    (0, _classCallCheck3.default)(this, NestedMethodReport);

    /**
     * Stores the nested depth.
     * @type {number}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (NestedMethodReport.__proto__ || (0, _getPrototypeOf2.default)(NestedMethodReport)).call(this, name, paramNames, lineStart, lineEnd));

    _this.nestedDepth = nestedDepth;
    return _this;
  }

  /**
   * Returns the enum for the report type.
   * @returns {ReportType}
   */


  (0, _createClass3.default)(NestedMethodReport, [{
    key: 'type',
    get: function get() {
      return _ReportType2.default.NESTED_METHOD;
    }

    /**
     * Returns the supported transform formats.
     *
     * @returns {Object[]}
     */

  }], [{
    key: 'getFormats',
    value: function getFormats() {
      return _TransformFormat2.default.getFormats(_ReportType2.default.NESTED_METHOD);
    }

    /**
     * Deserializes a JSON object representing a ModuleMethodReport.
     *
     * @param {object}   object - A JSON object of a ModuleMethodReport that was previously serialized.
     *
     * @returns {ModuleMethodReport}
     */

  }, {
    key: 'parse',
    value: function parse(object) {
      return this._parse(new NestedMethodReport(), object);
    }
  }]);
  return NestedMethodReport;
}(_MethodReport3.default);

exports.default = NestedMethodReport;
module.exports = exports['default'];