'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ClassReport = require('../ClassReport');

var _ClassReport2 = _interopRequireDefault(_ClassReport);

var _ClassMethodReport = require('../ClassMethodReport');

var _ClassMethodReport2 = _interopRequireDefault(_ClassMethodReport);

var _ModuleMethodReport = require('../ModuleMethodReport');

var _ModuleMethodReport2 = _interopRequireDefault(_ModuleMethodReport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ModuleScopeControl
 */
var ModuleScopeControl = function () {
   /**
    * Creates ModuleScopeControl instance with given ModuleReport.
    *
    * @param {ModuleReport} moduleReport - An associated module report.
    */
   function ModuleScopeControl(moduleReport) {
      (0, _classCallCheck3.default)(this, ModuleScopeControl);

      this._report = moduleReport;

      this._anonClassCntr = 1;

      this._anonMethodCntr = 1;

      /**
       * Stores the current class report scope stack which is lazily created in `createScope`.
       * @type {Array<ClassReport>}
       */
      this._scopeStackClass = [];

      /**
       * Stores the current method report scope stack which is lazily created in `createScope`.
       * @type {Array<ClassMethodReport|ModuleMethodReport>}
       */
      this._scopeStackMethod = [];

      /**
       * Stores the current nested method report scope stack which is lazily created in `createScope`.
       * @type {Array<ClassMethodReport|ModuleMethodReport>}
       */
      this._scopeStackNestedMethod = [];
   }

   /**
    * Creates a report scope when a class or method is entered.
    *
    * @param {object}   newScope - An object hash defining the new scope including:
    * ```
    * (string) type - Type of report to create.
    * (string) name - Name of the class or method.
    * (number) lineStart - Start line of method.
    * (number) lineEnd - End line of method.
    * (Array<string>) paramNames - (For method scopes) An array of parameters names for method.
    * ```
    *
    * @return {object}
    */


   (0, _createClass3.default)(ModuleScopeControl, [{
      key: 'createScope',
      value: function createScope() {
         var newScope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

         var report = void 0;

         if ((typeof newScope === 'undefined' ? 'undefined' : (0, _typeof3.default)(newScope)) !== 'object') {
            throw new TypeError('createScope error: \'newScope\' is not an \'object\'.');
         }

         if (typeof newScope.type !== 'string') {
            throw new TypeError('createScope error: \'newScope.type\' is not a \'string\'.');
         }

         if (typeof newScope.name !== 'string') {
            throw new TypeError('createScope error: \'newScope.name\' is not a \'string\'.');
         }

         if (!(0, _isInteger2.default)(newScope.lineStart)) {
            throw new TypeError('createScope error: \'newScope.lineStart\' is not an \'integer\'.');
         }

         if (!(0, _isInteger2.default)(newScope.lineEnd)) {
            throw new TypeError('createScope error: \'newScope.lineEnd\' is not an \'integer\'.');
         }

         switch (newScope.type) {
            case 'class':
               {
                  // Create a specific anonymous class name if applicable.
                  var className = newScope.name !== '<anonymous>' ? newScope.name : '<anon class-' + this._anonClassCntr++ + '>';

                  var superClassName = newScope.superClassName !== '<anonymous>' ? newScope.superClassName : '<anon class-' + this._anonClassCntr++ + '>';

                  report = new _ClassReport2.default(className, superClassName, newScope.lineStart, newScope.lineEnd);
                  this._report.classes.push(report);
                  this._scopeStackClass.push(report);
                  break;
               }

            case 'method':
               {
                  if (!Array.isArray(newScope.paramNames)) {
                     throw new TypeError('createScope error: \'newScope.paramNames\' is not an \'array\'.');
                  }

                  // Create a specific anonymous method name if applicable.
                  var methodName = newScope.name !== '<anonymous>' ? newScope.name : '<anon method-' + this._anonMethodCntr++ + '>';

                  // If an existing class report / scope exists also push the method to the class report.
                  var classReport = this.getCurrentClassReport();

                  if (classReport) {
                     report = new _ClassMethodReport2.default(methodName, newScope.paramNames, newScope.lineStart, newScope.lineEnd);
                     classReport.methods.push(report);
                  } else {
                     report = new _ModuleMethodReport2.default(methodName, newScope.paramNames, newScope.lineStart, newScope.lineEnd);

                     // Add this report to the module methods as there is no current class report.
                     this._report.methods.push(report);
                  }

                  this._scopeStackMethod.push(report);

                  break;
               }

            default:
               throw new Error('createScope error: Unknown scope type (' + newScope.type + ').');
         }

         return report;
      }

      /**
       * Returns the current class report.
       *
       * @returns {ClassReport}
       */

   }, {
      key: 'getCurrentClassReport',
      value: function getCurrentClassReport() {
         if (!Array.isArray(this._scopeStackClass)) {
            return void 0;
         }
         return this._scopeStackClass.length > 0 ? this._scopeStackClass[this._scopeStackClass.length - 1] : void 0;
      }

      /**
       * Returns the current method report.
       *
       * @returns {ClassMethodReport|ModuleMethodReport}
       */

   }, {
      key: 'getCurrentMethodReport',
      value: function getCurrentMethodReport() {
         if (!Array.isArray(this._scopeStackMethod)) {
            return void 0;
         }
         return this._scopeStackMethod.length > 0 ? this._scopeStackMethod[this._scopeStackMethod.length - 1] : void 0;
      }

      /**
       * Pops a report scope.
       *
       * @param {object}   scope - An object hash defining the scope including:
       * ```
       * (string) type - Type of report scope to pop off the stack.
       * ```
       */

   }, {
      key: 'popScope',
      value: function popScope(scope) {
         if ((typeof scope === 'undefined' ? 'undefined' : (0, _typeof3.default)(scope)) !== 'object') {
            throw new TypeError('popScope error: \'scope\' is not an \'object\'.');
         }

         if (typeof scope.type !== 'string') {
            throw new TypeError('popScope error: \'scope.type\' is not a \'string\'.');
         }

         switch (scope.type) {
            case 'class':
               this._scopeStackClass.pop();
               break;

            case 'method':
               this._scopeStackMethod.pop();
               break;

            default:
               throw new Error('popScope error: Unknown scope type (' + scope.type + ').');
         }
      }
   }]);
   return ModuleScopeControl;
}();

exports.default = ModuleScopeControl;
module.exports = exports['default'];