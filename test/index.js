import React from 'react'
const num = [1, 2, 3]
const Com = () => {
  return <div />
}
export default () => {
  return <div>
    {
      num.map(o => <Com num={o} />)
    }
  </div>
}