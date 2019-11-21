module.exports = function(babel) {
  var t = babel.types;
  return {
    name: 'babel-plugin-add-key-for-each-child',
    visitor: {
      CallExpression(path, state) {
        // 可能返回jsx，可能在函数体里返回jsx
        var jsxNode = path.node && path.node.arguments && path.node.arguments[0] && path.node.arguments[0].body;
        if (!t.isJSXElement(jsxNode)) {
          jsxNode = (path.node && path.node.arguments && path.node.arguments[0] && path.node.arguments[0].body && path.node.arguments[0].body.body && path.node.arguments[0].body.body.find(b => b.type === 'ReturnStatement') || {}).argument;
        }
        // 是否map
        var isMap = path.node && path.node.callee && path.node.callee.property && path.node.callee.property.name === 'map';
        // 是否jsx
        var isJsx = t.isJSXElement(jsxNode);
        // 若满足map、jsx的条件
        if (isMap && isJsx) {
          // map参数
          var params = path.node.arguments[0].params;
          // jsx属性
          var attrib = jsxNode.openingElement.attributes;
          var identi;
          // map callback三个参数
          if (params.findIndex(p => p.name === 'i') === -1) {
            identi = 'i';
          } else if (params.findIndex(p => p.name === 'j') === -1) {
            identi = 'j';
          } else if (params.findIndex(p => p.name === 'k') === -1) {
            identi = 'k';
          } else {
            identi = 'l';
          }
          if (params.length > 1) {
            identi = params[1].name;
          } else {
            params.push(t.identifier(identi));
          }
          if (attrib.findIndex(a => a.name && a.name.name === 'key') === -1) {
            attrib.push(t.jsxAttribute(t.jsxIdentifier('key'), t.jsxExpressionContainer(t.identifier(identi))));
          }
        }
      }
    }
  };
};