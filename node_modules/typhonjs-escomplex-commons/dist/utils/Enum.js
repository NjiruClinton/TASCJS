'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _iterator4 = require('babel-runtime/core-js/symbol/iterator');

var _iterator5 = _interopRequireDefault(_iterator4);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is an abstract class that is not intended to be used directly. Extend it to turn your class into an enum
 * (initialization is performed via `MyClass.initEnum()`).
 *
 * Modified from source provided by enumify (license unlisted / public domain)
 * @see https://github.com/rauschma/enumify
 */
var Enum = function () {
   /**
    * `initEnum()` closes the class. Then calling this constructor throws an exception.
    *
    * If your subclass has a constructor then you can control what properties are added to `this` via the argument you
    * pass to `super()`. No arguments are fine, too.
    *
    * @param {object}   instanceProperties - Provides initial properties.
    */
   function Enum() {
      var instanceProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
      (0, _classCallCheck3.default)(this, Enum);

      // new.target would be better than this.constructor, but isn’t supported by Babel
      if ({}.hasOwnProperty.call(this.constructor, INITIALIZED)) {
         throw new Error('Enum classes can’t be instantiated');
      }

      if ((typeof instanceProperties === 'undefined' ? 'undefined' : (0, _typeof3.default)(instanceProperties)) === 'object' && instanceProperties !== null) {
         s_COPY_PROPERTIES(this, instanceProperties);
      }
   }

   /**
    * Set up the enum, close the class.
    *
    * @param {Array|object}   arg - Either an object whose properties provide the names and values (which must be
    * mutable objects) of the enum constants. Or an Array whose elements are used as the names of the enum constants.
    * The values are create by instantiating the current class.
    *
    * @returns {Enum}
    */


   (0, _createClass3.default)(Enum, [{
      key: 'toString',


      /**
       * Default `toString()` method for enum constant.
       *
       * @returns {string}
       */
      value: function toString() {
         return this.constructor.name + '.' + this.name;
      }
   }], [{
      key: 'initEnum',
      value: function initEnum(arg) {
         Object.defineProperty(this, 'enumValues', {
            value: [],
            configurable: false,
            writable: false,
            enumerable: true
         });

         if (Array.isArray(arg)) {
            this._enumValuesFromArray(arg);
         } else {
            this._enumValuesFromObject(arg);
         }

         (0, _freeze2.default)(this.enumValues);
         this[INITIALIZED] = true;

         return this;
      }

      /**
       * Extracts enum values from an array.
       *
       * @param {Array} arr -
       * @private
       */

   }, {
      key: '_enumValuesFromArray',
      value: function _enumValuesFromArray(arr) {
         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = (0, _getIterator3.default)(arr), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var key = _step.value;
               this._pushEnumValue(new this(), key);
            }
         } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
               }
            } finally {
               if (_didIteratorError) {
                  throw _iteratorError;
               }
            }
         }
      }

      /**
       * Extracts enum values from an object.
       *
       * @param {object}   obj -
       * @private
       */

   }, {
      key: '_enumValuesFromObject',
      value: function _enumValuesFromObject(obj) {
         var _iteratorNormalCompletion2 = true;
         var _didIteratorError2 = false;
         var _iteratorError2 = undefined;

         try {
            for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(obj)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
               var key = _step2.value;

               var value = new this(obj[key]);
               this._pushEnumValue(value, key);
            }
         } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
         } finally {
            try {
               if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
               }
            } finally {
               if (_didIteratorError2) {
                  throw _iteratorError2;
               }
            }
         }
      }

      /**
       * Pushes enum value.
       *
       * @param {object} enumValue -
       * @param {string} name -
       * @private
       */

   }, {
      key: '_pushEnumValue',
      value: function _pushEnumValue(enumValue, name) {
         enumValue.name = name;
         enumValue.ordinal = this.enumValues.length;

         (0, _defineProperty2.default)(this, name, {
            value: enumValue,
            configurable: false,
            writable: false,
            enumerable: true
         });

         this.enumValues.push(enumValue);
      }

      /**
       * Given the name of an enum constant, return its value.
       *
       * @param {string}   name - An enum name.
       *
       * @returns {T}
       */

   }, {
      key: 'enumValueOf',
      value: function enumValueOf(name) {
         return this.enumValues.find(function (x) {
            return x.name === name;
         });
      }

      /**
       * Make enum classes iterable
       *
       * @returns {Symbol.iterator}
       */

   }, {
      key: _iterator5.default,
      value: function value() {
         return (0, _getIterator3.default)(this.enumValues);
      }
   }]);
   return Enum;
}();

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Provides a Symbol to track initialized state.
 * @type {Symbol}
 * @ignore
 */


exports.default = Enum;
var INITIALIZED = (0, _symbol2.default)();

/**
 * Copies an objects properties.
 *
 * @param {object}   target - Target object.
 * @param {object}   source - Source object.
 *
 * @returns {object}
 * @ignore
 */
function s_COPY_PROPERTIES(target, source) {
   // Ideally, we’d use Reflect.ownKeys() here, but I don’t want to depend on a polyfill.
   var _iteratorNormalCompletion3 = true;
   var _didIteratorError3 = false;
   var _iteratorError3 = undefined;

   try {
      for (var _iterator3 = (0, _getIterator3.default)((0, _getOwnPropertyNames2.default)(source)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
         var key = _step3.value;

         var desc = (0, _getOwnPropertyDescriptor2.default)(source, key);
         (0, _defineProperty2.default)(target, key, desc);
      }
   } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
   } finally {
      try {
         if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
         }
      } finally {
         if (_didIteratorError3) {
            throw _iteratorError3;
         }
      }
   }

   return target;
}
module.exports = exports['default'];