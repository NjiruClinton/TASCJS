'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _AggregateReport2 = require('./AggregateReport');

var _AggregateReport3 = _interopRequireDefault(_AggregateReport2);

var _AnalyzeError = require('../../analyze/AnalyzeError');

var _AnalyzeError2 = _interopRequireDefault(_AnalyzeError);

var _ObjectUtil = require('../../utils/ObjectUtil');

var _ObjectUtil2 = _interopRequireDefault(_ObjectUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides the method report object which stores data pertaining to a single method / function.
 */
var MethodReport = function (_AggregateReport) {
  (0, _inherits3.default)(MethodReport, _AggregateReport);

  /**
   * Initializes method report.
   *
   * @param {string}   name - Name of the method.
   * @param {number}   paramNames - Array of any associated parameter names.
   * @param {number}   lineStart - Start line of method.
   * @param {number}   lineEnd - End line of method.
   */
  function MethodReport() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : void 0;
    var paramNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var lineStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var lineEnd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    (0, _classCallCheck3.default)(this, MethodReport);

    /**
     * Stores any analysis errors.
     * @type {Array}
     */
    var _this = (0, _possibleConstructorReturn3.default)(this, (MethodReport.__proto__ || (0, _getPrototypeOf2.default)(MethodReport)).call(this, lineStart, lineEnd));

    _this.errors = [];

    /**
     * Stores the end line for the method.
     * @type {number}
     */
    _this.lineEnd = lineEnd;

    /**
     * Stores the start line for the method.
     * @type {number}
     */
    _this.lineStart = lineStart;

    /**
     * The name of the method.
     * @type {string}
     */
    _this.name = name;

    /**
     * Stores any parameter names.
     * @type {Array<string>}
     */
    _this.paramNames = paramNames;

    /**
     * The number of parameters for the method.
     * @type {number}
     */
    _this.paramCount = paramNames.length;
    return _this;
  }

  /**
   * Clears all errors stored in the method report.
   *
   * @param {boolean}  clearChildren - (Optional) If false then nested method errors are not cleared; default (true).
   */


  (0, _createClass3.default)(MethodReport, [{
    key: 'clearErrors',
    value: function clearErrors() {
      var clearChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.errors = [];

      if (clearChildren && Array.isArray(this.nestedMethods)) {
        this.nestedMethods.forEach(function (report) {
          report.clearErrors();
        });
      }
    }

    // TODO: Remove? Old implementation
    // /**
    //  * Gets all errors stored in the method report.
    //  *
    //  * @param {object}   options - Optional parameters.
    //  * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
    //  * @property {boolean}  includeReports - If true then results will be an array of object hashes containing `source`
    //  *                                      (the source report object of the error) and `error`
    //  *                                      (an AnalyzeError instance) keys; default (false).
    //  *
    //  * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
    //  */
    // getErrors(options = { includeChildren: true, includeReports: false })
    // {
    //   /* istanbul ignore if */
    //   if (typeof options !== 'object') { throw new TypeError(`getErrors error: 'options' is not an 'object'.`); }
    //
    //   // By default set includeChildren to true.
    //   /* istanbul ignore if */
    //   if (typeof options.includeChildren !== 'boolean') { options.includeChildren = true; }
    //
    //   // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
    //   return options.includeReports ? this.errors.map((entry) => { return { error: entry, source: this }; }) :
    //    [].concat(...this.errors);
    // }

    /**
     * Gets all errors stored in the method report and by default any nested methods.
     *
     * @param {object}   options - Optional parameters.
     * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
     * @property {boolean}  includeReports - If true then results will be an array of object hashes containing `source`
     *                                      (the source report object of the error) and `error`
     *                                      (an AnalyzeError instance) keys; default (false).
     *
     * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
     */

  }, {
    key: 'getErrors',
    value: function getErrors() {
      var _this2 = this,
          _ref;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { includeChildren: true, includeReports: false };

      /* istanbul ignore if */
      if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
        throw new TypeError('getErrors error: \'options\' is not an \'object\'.');
      }

      // By default set includeChildren to true.
      /* istanbul ignore if */
      if (typeof options.includeChildren !== 'boolean') {
        options.includeChildren = true;
      }

      // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
      var errors = options.includeReports ? this.errors.map(function (entry) {
        return { error: entry, source: _this2 };
      }) : (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(this.errors));

      // If `includeChildren` is true then traverse all children reports for errors.
      if (options.includeChildren && Array.isArray(this.nestedMethods)) {
        // Add class to all children errors.
        if (options.includeReports) {
          var _errors;

          var childErrors = [];

          this.nestedMethods.forEach(function (report) {
            childErrors.push.apply(childErrors, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });

          // Add module to object hash.
          childErrors.forEach(function (error) {
            error.method = _this2;
          });

          // Push to all module errors.
          (_errors = errors).push.apply(_errors, childErrors);
        } else {
          this.nestedMethods.forEach(function (report) {
            var _errors2;

            (_errors2 = errors).push.apply(_errors2, (0, _toConsumableArray3.default)(report.getErrors(options)));
          });
        }
      }

      // If `options.query` is defined then filter errors against the query object.
      if ((0, _typeof3.default)(options.query) === 'object') {
        errors = errors.filter(function (error) {
          return _ObjectUtil2.default.safeEqual(options.query, error);
        });
      }

      return errors;
    }

    /**
     * Returns the name / id associated with this report.
     * @returns {string}
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }

    /**
     * Deserializes a JSON object representing a ClassMethodReport.
     *
     * @param {ClassMethodReport|ModuleMethodReport}   targetObject - A target object to hydrate.
     *
     * @param {object}   jsonObject - A JSON object of a class or module method report that was previously serialized.
     *
     * @returns {ClassMethodReport|ModuleMethodReport}
     * @protected
     */

  }], [{
    key: '_parse',
    value: function _parse(targetObject, jsonObject) {
      /* istanbul ignore if */
      if ((typeof jsonObject === 'undefined' ? 'undefined' : (0, _typeof3.default)(jsonObject)) !== 'object') {
        throw new TypeError('parse error: \'jsonObject\' is not an \'object\'.');
      }

      var methodReport = (0, _assign2.default)(targetObject, jsonObject);

      if (methodReport.errors.length > 0) {
        methodReport.errors = methodReport.errors.map(function (error) {
          return _AnalyzeError2.default.parse(error);
        });
      }

      // TODO unimplemented yet!
      // if (methodReport.nestedMethods.length > 0)
      // {
      //    methodReport.nestedMethods = methodReport.nestedMethods.map((method) => NestedMethodReport.parse(method));
      // }

      return methodReport;
    }
  }]);
  return MethodReport;
}(_AggregateReport3.default);

// import NestedMethodReport     from './NestedMethodReport';

exports.default = MethodReport;
module.exports = exports['default'];