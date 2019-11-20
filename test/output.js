import React from 'react';

const Com = props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, i) => <Com num={o} key={i} />)}
  </div>;
};

export default (props => {
  const num = [1, 2, 3];
  return <div>
    {num.map((o, i) => <Com num={o} key={i} />)}
  </div>;
});
