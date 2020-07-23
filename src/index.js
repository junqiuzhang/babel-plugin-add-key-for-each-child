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
          if (params.length > 1) {
            // 若map callback参数大于1，则identi值取参数值
            identi = params[1].name;
          } else {
            // 若map callback参数小于等于1，则identi值取i、j或随机生成i_xxx名称
            if (params.findIndex(p => p.name === 'i') === -1) {
              identi = 'i';
            } else if (params.findIndex(p => p.name === 'j') === -1) {
              identi = 'j';
            } else {
              identi = `i_${String(Date.now()).slice(-3)}`
            }
            params.push(t.identifier(identi));
          }
          if (attrib.findIndex(a => a.name && a.name.name === 'key') === -1) {
            // 若jsx props中没有key，则props中添加key
            attrib.push(t.jsxAttribute(t.jsxIdentifier('key'), t.jsxExpressionContainer(t.identifier(identi))));
          }
        }
      }
    }
  };
};