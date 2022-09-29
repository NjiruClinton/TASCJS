'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Defines the output data from parsing an AST tree.
 */
var ASTData = function () {
  /**
   * Initializes ASTData
   */
  function ASTData() {
    (0, _classCallCheck3.default)(this, ASTData);

    this.source = '';
    this.operands = [];
    this.operators = [];
  }

  /**
   * Appends a string.
   *
   * @param {string} string - A string to append.
   */


  (0, _createClass3.default)(ASTData, [{
    key: 'write',
    value: function write(string) {
      this.source += string;
    }

    /**
     * Convert to string
     *
     * @returns {string|*|string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.source;
    }
  }]);
  return ASTData;
}();

exports.default = ASTData;
module.exports = exports['default'];