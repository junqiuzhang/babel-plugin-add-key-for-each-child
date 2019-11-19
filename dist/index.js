"use strict";

module.exports = function (_ref) {
  var babelTypes = _ref.types;
  return {
    name: "add-key-for-each-child",
    visitor: {
      Identifier: function Identifier(path, state) {
        if (path.node.name === 'bad') {
          path.node.name = 'good';
        }
      }
    }
  };
};
