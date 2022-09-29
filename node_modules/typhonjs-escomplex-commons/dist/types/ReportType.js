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

var _Enum2 = require('../utils/Enum');

var _Enum3 = _interopRequireDefault(_Enum2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines ReportType enum.
 */
var ReportType = function (_Enum) {
   (0, _inherits3.default)(ReportType, _Enum);

   function ReportType() {
      (0, _classCallCheck3.default)(this, ReportType);
      return (0, _possibleConstructorReturn3.default)(this, (ReportType.__proto__ || (0, _getPrototypeOf2.default)(ReportType)).apply(this, arguments));
   }

   return ReportType;
}(_Enum3.default);

exports.default = ReportType;


ReportType.initEnum({
   CLASS: { description: 'Class' },
   CLASS_METHOD: { description: 'Class Method' },
   MODULE_METHOD: { description: 'Module Method' },
   MODULE: { description: 'Module' },
   NESTED_METHOD: { description: 'Nested Method' },
   PROJECT: { description: 'Project' }
});
module.exports = exports['default'];