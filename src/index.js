module.exports = function(babel) {
  var t = babel.types;
  return {
    name: "babel-plugin-add-key-for-each-child",
    visitor: {
      CallExpression(path, state) {
        var hasMap = path.node && path.node.callee && path.node.callee.property && path.node.callee.property.name === 'map';
        var hasJsx = path.node && path.node.arguments && path.node.arguments[0] && path.node.arguments[0].body && path.node.arguments[0].body.type === 'JSXElement';
        if (hasMap && hasJsx) {
          path.node.arguments[0].params.push(t.identifier('i'));
          path.node.arguments[0].body.openingElement.attributes.push(t.jsxAttribute(t.jsxIdentifier('key'), t.jsxExpressionContainer(t.identifier('i'))));
          path.skip();
        }
      }
    }
  };
};