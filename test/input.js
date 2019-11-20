import React from 'react'
const Com = (props) => {
  const num = [1, 2, 3]
  return <div>
    {
      num.map(o => <Com num={o} />)
    }
  </div>
}
export default (props) => {
  const num = [1, 2, 3]
  return <div>
    {
      num.map(o => <Com num={o} />)
    }
  </div>
}