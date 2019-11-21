import React from 'react';

const Com = props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, k) => <Com num={o} key={k} />)}
  </div>;
};

export default (props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, i) => {
      return <Com num={o} key={i} />;
    })}
  </div>;
});
