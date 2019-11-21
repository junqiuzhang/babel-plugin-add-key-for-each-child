# Babel Plugin Add Key For Each Child
a babel plugin that add key for each react element in list
## Example
**before:**

```
export default (props) => {
  const num = [1, 2, 3]
  return <div>
    {
      num.map(o => {
        return <Com num={o} />
      })
    }
  </div>
}
```
**after:**

```
export default (props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, i) => {
      return <Com num={o} key={i} />;
    })}
  </div>;
});
```

## Usage
**.babelrc**

```
{
  "plugins": [
    "@babel/plugin-transform-react-jsx",
    "./src/index.js"
  ]
}
```