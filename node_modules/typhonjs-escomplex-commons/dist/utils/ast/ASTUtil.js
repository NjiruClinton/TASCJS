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

var _expressionPrecedence = require('./expressionPrecedence');

var _expressionPrecedence2 = _interopRequireDefault(_expressionPrecedence);

var _operatorPrecedence = require('./operatorPrecedence');

var _operatorPrecedence2 = _interopRequireDefault(_operatorPrecedence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ASTUTil
 */
var ASTUtil = function () {
   function ASTUtil() {
      (0, _classCallCheck3.default)(this, ASTUtil);
   }

   (0, _createClass3.default)(ASTUtil, null, [{
      key: 'formatSequence',

      /**
       * Formats a sequence of `nodes`.
       *
       * @param {Array<object>}  nodes - A sequence of AST nodes.
       * @param {object}         state -
       * @param {object}         traveler -
       */
      value: function formatSequence(nodes, state, traveler) {
         var output = state.output;


         output.write('(');

         if (Array.isArray(nodes) && nodes.length > 0) {
            traveler[nodes[0].type](nodes[0], state);

            for (var i = 1; i < nodes.length; i++) {
               output.write(', ');

               var param = nodes[i];
               traveler[param.type](param, state);
            }
         }

         output.write(')');
      }

      /**
       * Formats into the `output` stream a left-hand or right-hand expression `node` from a binary expression applying the
       * provided `operator`. The `isRightHand` parameter should be `true` if the `node` is a right-hand argument.
       *
       * @param {object}   node - An AST node.
       * @param {object}   parentNode - The AST parent node.
       * @param {boolean}  isRightHand - Represents a right-hand target when true.
       * @param {object}   state -
       * @param {object}   traveler -
       */

   }, {
      key: 'formatBinaryExpressionPart',
      value: function formatBinaryExpressionPart(node, parentNode, isRightHand, state, traveler) {
         var nodePrecedence = _expressionPrecedence2.default[node.type];
         var parentNodePrecedence = _expressionPrecedence2.default[parentNode.type];

         if (nodePrecedence > parentNodePrecedence) {
            traveler[node.type](node, state);
            return;
         } else if (nodePrecedence === parentNodePrecedence) {
            if (nodePrecedence === 13 || nodePrecedence === 14) {
               // Either `LogicalExpression` or `BinaryExpression`
               if (isRightHand) {
                  if (_operatorPrecedence2.default[node.operator] > _operatorPrecedence2.default[parentNode.operator]) {
                     traveler[node.type](node, state);
                     return;
                  }
               } else {
                  if (_operatorPrecedence2.default[node.operator] >= _operatorPrecedence2.default[parentNode.operator]) {
                     traveler[node.type](node, state);
                     return;
                  }
               }
            } else {
               traveler[node.type](node, state);
               return;
            }
         }

         state.output.write('(');
         traveler[node.type](node, state);
         state.output.write(')');
      }

      /**
       * Returns `true` if the provided `node` contains a call expression and `false` otherwise.
       *
       * @param {object}   node - An AST node.
       *
       * @returns {boolean}
       */

   }, {
      key: 'hasCallExpression',
      value: function hasCallExpression(node) {
         while ((typeof node === 'undefined' ? 'undefined' : (0, _typeof3.default)(node)) === 'object') {
            var _node = node,
                type = _node.type;


            if (type[0] === 'C' && type[1] === 'a') {
               return true; // Is CallExpression
            } else if (type[0] === 'M' && type[1] === 'e' && type[2] === 'm') {
               node = node.object; // Is MemberExpression
            } else {
               return false;
            }
         }
      }
   }]);
   return ASTUtil;
}();

exports.default = ASTUtil;
module.exports = exports['default'];