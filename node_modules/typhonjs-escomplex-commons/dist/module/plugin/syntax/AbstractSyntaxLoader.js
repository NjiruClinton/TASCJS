'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the base implementation for all syntax loader plugins which automatically associates member methods
 * to syntax definitions invoking the method with escomplex settings and assigning the result to the same name as
 * the method.
 */
var AbstractSyntaxLoader = function () {
   function AbstractSyntaxLoader() {
      (0, _classCallCheck3.default)(this, AbstractSyntaxLoader);
   }

   (0, _createClass3.default)(AbstractSyntaxLoader, [{
      key: 'onLoadSyntax',

      /**
       * Loads all member methods including from child classes that do not start with a lowercase letter.
       *
       * @param {object}   ev - escomplex plugin event data.
       */
      value: function onLoadSyntax(ev) {
         var _iteratorNormalCompletion = true;
         var _didIteratorError = false;
         var _iteratorError = undefined;

         try {
            for (var _iterator = (0, _getIterator3.default)(s_GET_ALL_PROPERTY_NAMES((0, _getPrototypeOf2.default)(this))), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
               var name = _step.value;

               var first = name.charAt(0);

               // Skip any names that are not a function or are lowercase.
               if (!(this[name] instanceof Function) || first === first.toLowerCase() && first !== first.toUpperCase()) {
                  continue;
               }

               // If an existing syntax exists for the given name then combine the results.
               ev.data.syntaxes[name] = (0, _assign2.default)((0, _typeof3.default)(ev.data.syntaxes[name]) === 'object' ? ev.data.syntaxes[name] : {}, this[name](ev.data.settings));
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
   }]);
   return AbstractSyntaxLoader;
}();

/**
 * Walks an objects inheritance tree collecting property names stopping before `AbstractSyntaxLoader` is reached.
 *
 * @param {object}   obj - object to walks.
 *
 * @returns {Array}
 * @ignore
 */


exports.default = AbstractSyntaxLoader;
var s_GET_ALL_PROPERTY_NAMES = function s_GET_ALL_PROPERTY_NAMES(obj) {
   var props = [];

   do {
      (0, _getOwnPropertyNames2.default)(obj).forEach(function (prop) {
         if (props.indexOf(prop) === -1) {
            props.push(prop);
         }
      });
      obj = (0, _getPrototypeOf2.default)(obj);
   } while (typeof obj !== 'undefined' && obj !== null && !(obj === AbstractSyntaxLoader.prototype));

   return props;
};
module.exports = exports['default'];