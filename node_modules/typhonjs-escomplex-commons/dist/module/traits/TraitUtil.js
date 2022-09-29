'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TraitUtil
 */
var TraitUtil = function () {
   function TraitUtil() {
      (0, _classCallCheck3.default)(this, TraitUtil);
   }

   (0, _createClass3.default)(TraitUtil, null, [{
      key: 'safeArray',

      /**
       * Provides safe array creation from a given input.
       *
       * @param {*}  value - A value to potentially convert into a safe array.
       *
       * @returns {Array}
       */
      value: function safeArray(value) {
         return typeof value === 'undefined' || value === null ? [] : Array.isArray(value) ? value : [value];
      }

      /**
       * Provides a utility method that defers to `object.name` if it exists or fallback to `defaultName` or `anonymous`.
       *
       * @param {object}   object - The target object to provide safe name coverage.
       * @param {string}   defaultName - A default name to fallback to if `object.name` is missing.
       *
       * @returns {string}
       */

   }, {
      key: 'safeName',
      value: function safeName(object) {
         var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

         if (object !== null && (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && typeof object.name === 'string' && object.name !== '') {
            return object.name;
         }

         if (typeof defaultName === 'string' && defaultName !== '') {
            return defaultName;
         }

         return '<anonymous>';
      }

      /**
       * Provides a utility method that defers to `object.value` if it exists or fallback to `defaultValue` or `anonymous`.
       *
       * @param {object}   object - The target object to provide safe name coverage.
       * @param {string}   defaultValue - A default value to fallback to if `object.value` is missing.
       *
       * @returns {string}
       */

   }, {
      key: 'safeValue',
      value: function safeValue(object) {
         var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

         if (object !== null && (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && typeof object.value === 'string' && object.value !== '') {
            return object.value;
         }

         if (typeof defaultValue === 'string' && defaultValue !== '') {
            return defaultValue;
         }

         return '<anonymous>';
      }
   }]);
   return TraitUtil;
}();

exports.default = TraitUtil;
module.exports = exports['default'];