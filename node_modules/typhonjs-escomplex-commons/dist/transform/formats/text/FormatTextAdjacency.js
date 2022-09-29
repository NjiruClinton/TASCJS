'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _AbstractTextMatrix2 = require('./AbstractTextMatrix');

var _AbstractTextMatrix3 = _interopRequireDefault(_AbstractTextMatrix2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provides a format transform for ModuleReport / ProjectReport instances converting a matrix list into plain text.
 */
var FormatTextAdjacency = function (_AbstractTextMatrix) {
  (0, _inherits3.default)(FormatTextAdjacency, _AbstractTextMatrix);

  /**
   * Initializes text adjacency format.
   *
   * @param {object} headers -
   * @param {object} keys -
   */
  function FormatTextAdjacency() {
    var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, FormatTextAdjacency);
    return (0, _possibleConstructorReturn3.default)(this, (FormatTextAdjacency.__proto__ || (0, _getPrototypeOf2.default)(FormatTextAdjacency)).call(this, (0, _assign2.default)({}, s_DEFAULT_HEADERS, headers), (0, _assign2.default)({}, s_DEFAULT_KEYS, keys)));
  }

  /**
   * Gets the file extension.
   *
   * @returns {string}
   */


  (0, _createClass3.default)(FormatTextAdjacency, [{
    key: 'extension',
    get: function get() {
      return 'txt';
    }

    /**
     * Gets the format name.
     *
     * @returns {string}
     */

  }, {
    key: 'name',
    get: function get() {
      return 'text-adjacency';
    }

    /**
     * Gets the format type.
     *
     * @returns {string}
     */

  }, {
    key: 'type',
    get: function get() {
      return 'adjacency';
    }
  }]);
  return FormatTextAdjacency;
}(_AbstractTextMatrix3.default);

// Module private ---------------------------------------------------------------------------------------------------

/**
 * Defines the default matrix list key accessed.
 * @type {{matrixList: string}}
 * @ignore
 */


exports.default = FormatTextAdjacency;
var s_DEFAULT_KEYS = {
  matrixList: 'adjacencyList'
};

/**
 * Defines the default headers added to any output strings..
 * @type {{entryPrepend: string, entryWrapper: string, textHeader: string}}
 * @ignore
 */
var s_DEFAULT_HEADERS = {
  entryPrepend: '',
  entryWrapper: '',
  textHeader: 'Adjacency (dependencies / numerical indices correspond to ProjectReport modules / reports):\n'
};
module.exports = exports['default'];