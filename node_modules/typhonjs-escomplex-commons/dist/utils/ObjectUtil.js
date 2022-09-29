'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.onPluginLoad = onPluginLoad;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides common object manipulation utilities including depth traversal, obtaining accessors, safely setting values /
 * equality tests, and validation.
 *
 * Support for typhonjs-plugin-manager is enabled.
 */
var ObjectUtil = function () {
   function ObjectUtil() {
      (0, _classCallCheck3.default)(this, ObjectUtil);
   }

   (0, _createClass3.default)(ObjectUtil, null, [{
      key: 'depthTraverse',

      /**
       * Performs a naive depth traversal of an object / array. The data structure _must not_ have circular references.
       * The result of the callback function is used to modify in place the given data.
       *
       * @param {object|Array}   data - An object or array.
       *
       * @param {function}       func - A callback function to process leaf values in children arrays or object members.
       *
       * @param {boolean}        modify - If true then the result of the callback function is used to modify in place
       *                                  the given data.
       *
       * @returns {*}
       */
      value: function depthTraverse(data, func) {
         var modify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

         /* istanbul ignore if */
         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('depthTraverse error: \'data\' is not an \'object\'.');
         }

         /* istanbul ignore if */
         if (typeof func !== 'function') {
            throw new TypeError('depthTraverse error: \'func\' is not a \'function\'.');
         }

         return _depthTraverse(data, func, modify);
      }

      /**
       * Returns a list of accessor keys by traversing the given object.
       *
       * @param {object}   data - An object to traverse for accessor keys.
       *
       * @returns {Array}
       */

   }, {
      key: 'getAccessorList',
      value: function getAccessorList(data) {
         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('getAccessorList error: \'data\' is not an \'object\'.');
         }

         return _getAccessorList(data);
      }

      /**
       * Provides a way to safely access an objects data / entries given an accessor string which describes the
       * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
       * to walk.
       *
       * @param {object}   data - An object to access entry data.
       *
       * @param {string}   accessor - A string describing the entries to access.
       *
       * @param {*}        defaultValue - (Optional) A default value to return if an entry for accessor is not found.
       *
       * @returns {*}
       */

   }, {
      key: 'safeAccess',
      value: function safeAccess(data, accessor) {
         var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : void 0;

         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            return defaultValue;
         }
         if (typeof accessor !== 'string') {
            return defaultValue;
         }

         var access = accessor.split('.');

         // Walk through the given object by the accessor indexes.
         for (var cntr = 0; cntr < access.length; cntr++) {
            // If the next level of object access is undefined or null then return the empty string.
            if (typeof data[access[cntr]] === 'undefined' || data[access[cntr]] === null) {
               return defaultValue;
            }

            data = data[access[cntr]];
         }

         return data;
      }

      /**
       * Provides a way to safely batch set an objects data / entries given an array of accessor strings which describe the
       * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
       * to walk. If value is an object the accessor will be used to access a target value from `value` which is
       * subsequently set to `data` by the given operation. If `value` is not an object it will be used as the target
       * value to set across all accessors.
       *
       * @param {object}         data - An object to access entry data.
       *
       * @param {Array<string>}  accessors - A string describing the entries to access.
       *
       * @param {object|*}       value - A new value to set if an entry for accessor is found.
       *
       * @param {string}         [operation='set'] - Operation to perform including: 'add', 'div', 'mult', 'set',
       *                                             'set-undefined', 'sub'.
       *
       * @param {object|*}       [defaultAccessValue=0] - A new value to set if an entry for accessor is found.
       *
       *
       * @param {boolean}  [createMissing=true] - If true missing accessor entries will be created as objects
       *                                          automatically.
       */

   }, {
      key: 'safeBatchSet',
      value: function safeBatchSet(data, accessors, value) {
         var operation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'set';
         var defaultAccessValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
         var createMissing = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('safeBatchSet Error: \'data\' is not an \'object\'.');
         }
         if (!Array.isArray(accessors)) {
            throw new TypeError('safeBatchSet Error: \'accessors\' is not an \'array\'.');
         }

         if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
            accessors.forEach(function (accessor) {
               var targetValue = ObjectUtil.safeAccess(value, accessor, defaultAccessValue);
               ObjectUtil.safeSet(data, accessor, targetValue, operation, createMissing);
            });
         } else {
            accessors.forEach(function (accessor) {
               ObjectUtil.safeSet(data, accessor, value, operation, createMissing);
            });
         }
      }

      /**
       * Compares a source object and values of entries against a target object. If the entries in the source object match
       * the target object then `true` is returned otherwise `false`. If either object is undefined or null then false
       * is returned.
       *
       * @param {object}   source - Source object.
       *
       * @param {object}   target - Target object.
       *
       * @returns {boolean}
       */

   }, {
      key: 'safeEqual',
      value: function safeEqual(source, target) {
         if (typeof source === 'undefined' || source === null || typeof target === 'undefined' || target === null) {
            return false;
         }

         var sourceAccessors = ObjectUtil.getAccessorList(source);

         for (var cntr = 0; cntr < sourceAccessors.length; cntr++) {
            var accessor = sourceAccessors[cntr];

            var sourceObjectValue = ObjectUtil.safeAccess(source, accessor);
            var targetObjectValue = ObjectUtil.safeAccess(target, accessor);

            if (sourceObjectValue !== targetObjectValue) {
               return false;
            }
         }

         return true;
      }

      /**
       * Provides a way to safely set an objects data / entries given an accessor string which describes the
       * entries to walk. To access deeper entries into the object format the accessor string with `.` between entries
       * to walk.
       *
       * @param {object}   data - An object to access entry data.
       *
       * @param {string}   accessor - A string describing the entries to access.
       *
       * @param {*}        value - A new value to set if an entry for accessor is found.
       *
       * @param {string}   [operation='set'] - Operation to perform including: 'add', 'div', 'mult', 'set',
       *                                       'set-undefined', 'sub'.
       *
       * @param {boolean}  [createMissing=true] - If true missing accessor entries will be created as objects
       *                                          automatically.
       *
       * @returns {boolean} True if successful.
       */

   }, {
      key: 'safeSet',
      value: function safeSet(data, accessor, value) {
         var operation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'set';
         var createMissing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('safeSet Error: \'data\' is not an \'object\'.');
         }
         if (typeof accessor !== 'string') {
            throw new TypeError('safeSet Error: \'accessor\' is not a \'string\'.');
         }

         var access = accessor.split('.');

         // Walk through the given object by the accessor indexes.
         for (var cntr = 0; cntr < access.length; cntr++) {
            // If data is an array perform validation that the accessor is a positive integer otherwise quit.
            if (Array.isArray(data)) {
               var number = +access[cntr];

               if (!(0, _isInteger2.default)(number) || number < 0) {
                  return false;
               }
            }

            if (cntr === access.length - 1) {
               switch (operation) {
                  case 'add':
                     data[access[cntr]] += value;
                     break;

                  case 'div':
                     data[access[cntr]] /= value;
                     break;

                  case 'mult':
                     data[access[cntr]] *= value;
                     break;

                  case 'set':
                     data[access[cntr]] = value;
                     break;

                  case 'set-undefined':
                     if (typeof data[access[cntr]] === 'undefined') {
                        data[access[cntr]] = value;
                     }
                     break;

                  case 'sub':
                     data[access[cntr]] -= value;
                     break;
               }
            } else {
               // If createMissing is true and the next level of object access is undefined then create a new object entry.
               if (createMissing && typeof data[access[cntr]] === 'undefined') {
                  data[access[cntr]] = {};
               }

               // Abort if the next level is null or not an object and containing a value.
               if (data[access[cntr]] === null || (0, _typeof3.default)(data[access[cntr]]) !== 'object') {
                  return false;
               }

               data = data[access[cntr]];
            }
         }

         return true;
      }

      /**
       * Performs bulk setting of values to the given data object.
       *
       * @param {object}            data - The data object to set data.
       *
       * @param {object<string, *>} accessorValues - Object of accessor keys to values to set.
       *
       * @param {string}            [operation='set'] - Operation to perform including: 'add', 'div', 'mult', 'set', 'sub';
       *                                                default (`set`).
       *
       * @param {boolean}           [createMissing=true] - If true missing accessor entries will be created as objects
       *                                                   automatically.
       */

   }, {
      key: 'safeSetAll',
      value: function safeSetAll(data, accessorValues) {
         var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'set';
         var createMissing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('\'data\' is not an \'object\'.');
         }
         if ((typeof accessorValues === 'undefined' ? 'undefined' : (0, _typeof3.default)(accessorValues)) !== 'object') {
            throw new TypeError('\'accessorValues\' is not an \'object\'.');
         }

         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(accessorValues)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var accessor = _step.value;

               if (!accessorValues.hasOwnProperty(accessor)) {
                  continue;
               }

               ObjectUtil.safeSet(data, accessor, accessorValues[accessor], operation, createMissing);
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
       * Performs bulk validation of data given an object, `validationData`, which describes all entries to test.
       *
       * @param {object}                           data - The data object to test.
       *
       * @param {object<string, ValidationEntry>}  validationData - Key is the accessor / value is a validation entry.
       *
       * @param {string}                           [dataName='data'] - Optional name of data.
       *
       * @returns {boolean} True if validation passes otherwise an exception is thrown.
       */

   }, {
      key: 'validate',
      value: function validate(data) {
         var validationData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
         var dataName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'data';

         if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') {
            throw new TypeError('\'' + dataName + '\' is not an \'object\'.');
         }
         if ((typeof validationData === 'undefined' ? 'undefined' : (0, _typeof3.default)(validationData)) !== 'object') {
            throw new TypeError('\'validationData\' is not an \'object\'.');
         }

         var result = void 0;

         var _iteratorNormalCompletion2 = true;
         var _didIteratorError2 = false;
         var _iteratorError2 = undefined;

         try {
            for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(validationData)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
               var key = _step2.value;

               if (!validationData.hasOwnProperty(key)) {
                  continue;
               }

               var entry = validationData[key];

               switch (entry.test) {
                  case 'array':
                     result = ObjectUtil.validateArray(data, key, entry, dataName);
                     break;

                  case 'entry':
                     result = ObjectUtil.validateEntry(data, key, entry, dataName);
                     break;

                  case 'entry|array':
                     result = ObjectUtil.validateEntryOrArray(data, key, entry, dataName);
                     break;
               }
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

         return result;
      }

      // TODO: add docs after upgrading to latest WebStorm / better object destructuring support.
      // /**
      // * Validates all array entries against potential type and expected tests.
      // *
      // * @param {object}            data - The data object to test.
      // *
      // * @param {string}            accessor - A string describing the entries to access.
      // *
      // * @param {string}            [type] - Tests with a typeof check.
      // *
      // * @param {function|Set<*>}   [expected] - Optional function or set of expected values to test against.
      // *
      // * @param {string}            [message] - Optional message to include.
      // *
      // * @param {boolean}           [required] - When false if the accessor is missing validation is skipped.
      // *
      // * @param {boolean}           [error=true] - When true and error is thrown otherwise a boolean is returned.
      // *
      // * @param {string}            [dataName='data'] - Optional name of data.
      // *
      // * @returns {boolean} True if validation passes otherwise an exception is thrown.
      // */

   }, {
      key: 'validateArray',
      value: function validateArray(data, accessor) {
         var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
             _ref$type = _ref.type,
             type = _ref$type === undefined ? void 0 : _ref$type,
             _ref$expected = _ref.expected,
             expected = _ref$expected === undefined ? void 0 : _ref$expected,
             _ref$message = _ref.message,
             message = _ref$message === undefined ? void 0 : _ref$message,
             _ref$required = _ref.required,
             required = _ref$required === undefined ? true : _ref$required,
             _ref$error = _ref.error,
             error = _ref$error === undefined ? true : _ref$error;

         var dataName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'data';

         var dataArray = ObjectUtil.safeAccess(data, accessor);

         // A non-required entry is missing so return without validation.
         if (!required && typeof dataArray === 'undefined') {
            return true;
         }

         if (!Array.isArray(dataArray)) {
            if (error) {
               throw _validateError(TypeError, '\'' + dataName + '.' + accessor + '\' is not an \'array\'.');
            } else {
               return false;
            }
         }

         if (typeof type === 'string') {
            for (var cntr = 0; cntr < dataArray.length; cntr++) {
               if (!((0, _typeof3.default)(dataArray[cntr]) === type)) {
                  if (error) {
                     var dataEntryString = (0, _typeof3.default)(dataArray[cntr]) === 'object' ? (0, _stringify2.default)(dataArray[cntr]) : dataArray[cntr];

                     throw _validateError(TypeError, '\'' + dataName + '.' + accessor + '[' + cntr + ']\': \'' + dataEntryString + '\' is not a \'' + type + '\'.');
                  } else {
                     return false;
                  }
               }
            }
         }

         // If expected is a function then test all array entries against the test function. If expected is a Set then
         // test all array entries for inclusion in the set. Otherwise if expected is a string then test that all array
         // entries as a `typeof` test against expected.
         if (Array.isArray(expected)) {
            for (var _cntr = 0; _cntr < dataArray.length; _cntr++) {
               if (expected.indexOf(dataArray[_cntr]) < 0) {
                  if (error) {
                     var _dataEntryString = (0, _typeof3.default)(dataArray[_cntr]) === 'object' ? (0, _stringify2.default)(dataArray[_cntr]) : dataArray[_cntr];

                     throw _validateError(Error, '\'' + dataName + '.' + accessor + '[' + _cntr + ']\': \'' + _dataEntryString + '\' is not an expected value: ' + (0, _stringify2.default)(expected) + '.');
                  } else {
                     return false;
                  }
               }
            }
         } else if (expected instanceof _set2.default) {
            for (var _cntr2 = 0; _cntr2 < dataArray.length; _cntr2++) {
               if (!expected.has(dataArray[_cntr2])) {
                  if (error) {
                     var _dataEntryString2 = (0, _typeof3.default)(dataArray[_cntr2]) === 'object' ? (0, _stringify2.default)(dataArray[_cntr2]) : dataArray[_cntr2];

                     throw _validateError(Error, '\'' + dataName + '.' + accessor + '[' + _cntr2 + ']\': \'' + _dataEntryString2 + '\' is not an expected value: ' + (0, _stringify2.default)(expected) + '.');
                  } else {
                     return false;
                  }
               }
            }
         } else if (typeof expected === 'function') {
            for (var _cntr3 = 0; _cntr3 < dataArray.length; _cntr3++) {
               try {
                  var result = expected(dataArray[_cntr3]);

                  if (typeof result === 'undefined' || !result) {
                     throw new Error(message);
                  }
               } catch (err) {
                  if (error) {
                     var _dataEntryString3 = (0, _typeof3.default)(dataArray[_cntr3]) === 'object' ? (0, _stringify2.default)(dataArray[_cntr3]) : dataArray[_cntr3];

                     throw _validateError(Error, '\'' + dataName + '.' + accessor + '[' + _cntr3 + ']\': \'' + _dataEntryString3 + '\' failed validation: ' + err.message + '.');
                  } else {
                     return false;
                  }
               }
            }
         }

         return true;
      }

      // TODO: add docs after upgrading to latest WebStorm / better object destructuring support.
      // /**
      // * Validates data entry with a typeof check and potentially tests against the values in any given expected set.
      // *
      // * @param {object}            data - The object data to validate.
      // *
      // * @param {string}            accessor - A string describing the entries to access.
      // *
      // * @param {string}            [type] - Tests with a typeof check.
      // *
      // * @param {function|Set<*>}   [expected] - Optional function or set of expected values to test against.
      // *
      // * @param {string}            [message] - Optional message to include.
      // *
      // * @param {boolean}           [required=true] - When false if the accessor is missing validation is skipped.
      // *
      // * @param {boolean}           [error=true] - When true and error is thrown otherwise a boolean is returned.
      // *
      // * @param {string}            [dataName='data'] - Optional name of data.
      // *
      // * @returns {boolean} True if validation passes otherwise an exception is thrown.
      // */

   }, {
      key: 'validateEntry',
      value: function validateEntry(data, accessor) {
         var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
             _ref2$type = _ref2.type,
             type = _ref2$type === undefined ? void 0 : _ref2$type,
             _ref2$expected = _ref2.expected,
             expected = _ref2$expected === undefined ? void 0 : _ref2$expected,
             _ref2$message = _ref2.message,
             message = _ref2$message === undefined ? void 0 : _ref2$message,
             _ref2$required = _ref2.required,
             required = _ref2$required === undefined ? true : _ref2$required,
             _ref2$error = _ref2.error,
             error = _ref2$error === undefined ? true : _ref2$error;

         var dataName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'data';

         var dataEntry = ObjectUtil.safeAccess(data, accessor);

         // A non-required entry is missing so return without validation.
         if (!required && typeof dataEntry === 'undefined') {
            return true;
         }

         if (type && (typeof dataEntry === 'undefined' ? 'undefined' : (0, _typeof3.default)(dataEntry)) !== type) {
            if (error) {
               throw _validateError(TypeError, '\'' + dataName + '.' + accessor + '\' is not a \'' + type + '\'.');
            } else {
               return false;
            }
         }

         if (expected instanceof _set2.default && !expected.has(dataEntry) || Array.isArray(expected) && expected.indexOf(dataEntry) < 0) {
            if (error) {
               var dataEntryString = (typeof dataEntry === 'undefined' ? 'undefined' : (0, _typeof3.default)(dataEntry)) === 'object' ? (0, _stringify2.default)(dataEntry) : dataEntry;

               throw _validateError(Error, '\'' + dataName + '.' + accessor + '\': \'' + dataEntryString + '\' is not an expected value: ' + (0, _stringify2.default)(expected) + '.');
            } else {
               return false;
            }
         } else if (typeof expected === 'function') {
            try {
               var result = expected(dataEntry);

               if (typeof result === 'undefined' || !result) {
                  throw new Error(message);
               }
            } catch (err) {
               if (error) {
                  var _dataEntryString4 = (typeof dataEntry === 'undefined' ? 'undefined' : (0, _typeof3.default)(dataEntry)) === 'object' ? (0, _stringify2.default)(dataEntry) : dataEntry;

                  throw _validateError(Error, '\'' + dataName + '.' + accessor + '\': \'' + _dataEntryString4 + '\' failed to validate: ' + err.message + '.');
               } else {
                  return false;
               }
            }
         }

         return true;
      }

      /**
       * Dispatches validation of data entry to string or array validation depending on data entry type.
       *
       * @param {object}            data - The data object to test.
       *
       * @param {string}            accessor - A string describing the entries to access.
       *
       * @param {ValidationEntry}   [entry] - A validation entry.
       *
       * @param {string}            [dataName='data'] - Optional name of data.
       *
       * @returns {boolean} True if validation passes otherwise an exception is thrown.
       */

   }, {
      key: 'validateEntryOrArray',
      value: function validateEntryOrArray(data, accessor, entry) {
         var dataName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'data';

         var dataEntry = ObjectUtil.safeAccess(data, accessor);

         var result = void 0;

         if (Array.isArray(dataEntry)) {
            result = ObjectUtil.validateArray(data, accessor, entry, dataName);
         } else {
            result = ObjectUtil.validateEntry(data, accessor, entry, dataName);
         }

         return result;
      }
   }]);
   return ObjectUtil;
}();

/**
 * Wires up ObjectUtil on the plugin eventbus. The following event bindings are available:
 *
 * `typhonjs:object:util:depth:traverse`: Invokes `depthTraverse`.
 * `typhonjs:object:util:get:accessor:list`: Invokes `getAccessorList`.
 * `typhonjs:object:util:safe:access`: Invokes `safeAccess`.
 * `typhonjs:object:util:safe:equal`: Invokes `safeEqual`.
 * `typhonjs:object:util:safe:set`: Invokes `safeSet`.
 * `typhonjs:object:util:safe:set:all`: Invokes `safeSetAll`.
 * `typhonjs:object:util:validate`: Invokes `validate`.
 * `typhonjs:object:util:validate:array`: Invokes `validateArray`.
 * `typhonjs:object:util:validate:entry`: Invokes `validateEntry`.
 *
 * @param {PluginEvent} ev - The plugin event.
 * @ignore
 */


exports.default = ObjectUtil;
function onPluginLoad(ev) {
   var eventbus = ev.eventbus;

   eventbus.on('typhonjs:object:util:depth:traverse', ObjectUtil.depthTraverse, ObjectUtil);
   eventbus.on('typhonjs:object:util:get:accessor:list', ObjectUtil.getAccessorList, ObjectUtil);
   eventbus.on('typhonjs:object:util:safe:access', ObjectUtil.safeAccess, ObjectUtil);
   eventbus.on('typhonjs:object:util:safe:equal', ObjectUtil.safeEqual, ObjectUtil);
   eventbus.on('typhonjs:object:util:safe:set', ObjectUtil.safeSet, ObjectUtil);
   eventbus.on('typhonjs:object:util:safe:set:all', ObjectUtil.safeSetAll, ObjectUtil);
   eventbus.on('typhonjs:object:util:validate', ObjectUtil.validate, ObjectUtil);
   eventbus.on('typhonjs:object:util:validate:array', ObjectUtil.validateArray, ObjectUtil);
   eventbus.on('typhonjs:object:util:validate:entry', ObjectUtil.validateEntry, ObjectUtil);
   eventbus.on('typhonjs:object:util:validate:entry|array', ObjectUtil.validateEntryOrArray, ObjectUtil);
}

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Creates a new error of type `clazz` adding the field `_objectValidateError` set to true.
 *
 * @param {Error}    clazz - Error class to instantiate.
 *
 * @param {string}   message - An error message.
 *
 * @returns {*}
 * @ignore
 * @private
 */
function _validateError(clazz) {
   var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

   var error = new clazz(message);
   error._objectValidateError = true;
   return error;
}

/**
 * Private implementation of depth traversal.
 *
 * @param {object|Array}   data - An object or array.
 *
 * @param {function}       func - A callback function to process leaf values in children arrays or object members.
 *
 * @param {boolean}        modify - If true then the result of the callback function is used to modify in place
 *                                  the given data.
 * @returns {*}
 * @ignore
 * @private
 */
function _depthTraverse(data, func, modify) {
   if (modify) {
      if (Array.isArray(data)) {
         for (var cntr = 0; cntr < data.length; cntr++) {
            data[cntr] = _depthTraverse(data[cntr], func, modify);
         }
      } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
         for (var key in data) {
            if (data.hasOwnProperty(key)) {
               data[key] = _depthTraverse(data[key], func, modify);
            }
         }
      } else {
         data = func(data);
      }
   } else {
      if (Array.isArray(data)) {
         for (var _cntr4 = 0; _cntr4 < data.length; _cntr4++) {
            _depthTraverse(data[_cntr4], func, modify);
         }
      } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
         for (var _key in data) {
            if (data.hasOwnProperty(_key)) {
               _depthTraverse(data[_key], func, modify);
            }
         }
      } else {
         func(data);
      }
   }

   return data;
}

/**
 * Private implementation of `getAccessorList`.
 *
 * @param {object}   data - An object to traverse.
 *
 * @returns {Array}
 * @ignore
 * @private
 */
function _getAccessorList(data) {
   var accessors = [];

   var _loop = function _loop(key) {
      if (data.hasOwnProperty(key)) {
         if ((0, _typeof3.default)(data[key]) === 'object') {
            var childKeys = _getAccessorList(data[key]);

            childKeys.forEach(function (childKey) {
               accessors.push(Array.isArray(childKey) ? key + '.' + childKey.join('.') : key + '.' + childKey);
            });
         } else {
            accessors.push(key);
         }
      }
   };

   for (var key in data) {
      _loop(key);
   }

   return accessors;
}