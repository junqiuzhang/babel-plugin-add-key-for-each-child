module.exports = function(babel) {
  var t = babel.types;
  return {
    name: "babel-plugin-add-key-for-each-child",
    visitor: {
      CallExpression(path, state) {
        var hasMap = path.node && path.node.callee && path.node.callee.property && path.node.callee.property.name === 'map';
        var jsxPath = path.node && path.node.arguments && path.node.arguments[0] && path.node.arguments[0].body;
        if (!!jsxPath) {
          jsxPath = (path.node && path.node.arguments && path.node.arguments[0] && path.node.arguments[0].body && path.node.arguments[0].body.body && path.node.arguments[0].body.body.find(b => b.type === 'ReturnStatement') || {argument: false}).argument;
        }
        if (hasMap && !!jsxPath) {
          var params = path.node.arguments[0].params;
          var attrib = jsxPath.openingElement.attributes;
          if (params.length < 2) {
            params.push(t.identifier('i'));
          }
          if (attrib.findIndex(a => a.name && a.name.name === 'key') < 0) {
            attrib.push(t.jsxAttribute(t.jsxIdentifier('key'), t.jsxExpressionContainer(t.identifier('i'))));
          }
          path.skip();
        }
      }
    }
  };
};