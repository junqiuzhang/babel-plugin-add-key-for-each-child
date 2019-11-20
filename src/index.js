module.exports = function(babel) {
  var t = babel.types;
  return {
    name: "babel-plugin-add-key-for-each-child",
    visitor: {
      JSXAttribute(path, state) {
        var hasKey = path.container.findIndex(p => p.name.name === 'key') > -1;
        if (hasKey) {
          path.stop();
        }
        var parentPath = path.findParent(p => t.isCallExpression(p.node));
        if (!parentPath) {
          path.stop();
        }
        var hasMap = parentPath.node.callee && parentPath.node.callee.property && parentPath.node.callee.property.name === 'map';
        if (hasMap) {
          path.insertBefore(t.jsxAttribute(t.JSXIdentifier('key'), path.node.value));
          path.stop();
        }
      }
    }
  };
};