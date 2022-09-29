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

var _ASTData = require('./ASTData');

var _ASTData2 = _interopRequireDefault(_ASTData);

var _astSyntax = require('./astSyntax');

var _astSyntax2 = _interopRequireDefault(_astSyntax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ASTState
 */
var ASTState =
/**
 * Creates an instance of ASTState.
 *
 * @param {object}      options - Optional parameters for source code formatting.
 * @property {string}   indent - A string to use for indentation (defaults to `\t`)
 * @property {string}   lineEnd - A string to use for line endings (defaults to `\n`)
 * @property {number}   startingIndentLevel - indent level to start from (default to `0`)
 */
function ASTState() {
   var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
   (0, _classCallCheck3.default)(this, ASTState);

   if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) !== 'object') {
      throw new TypeError('ctor error: \'options\' is not an \'object\'.');
   }

   this.output = new _ASTData2.default();

   // Assign the syntax
   this.generator = _astSyntax2.default;

   // Formatting options
   this.indent = typeof options.indent === 'string' ? options.indent : '\t';

   this.lineEnd = typeof options.lineEnd === 'string' ? options.lineEnd : '\n';

   this.indentLevel = (0, _isInteger2.default)(options.startingIndentLevel) ? options.startingIndentLevel : 0;

   // Internal state
   this.noTrailingSemicolon = false;
};

exports.default = ASTState;
module.exports = exports['default'];