module.exports = function({ types: babelTypes }) {
  return {
    name: "add-key-for-each-child",
    visitor: {
      Identifier(path, state) {
        if (path.node.name === 'map') {
          path.node.name = 'for'
        }
      }
    }
  };
};