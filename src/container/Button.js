import React from 'react'

export const Button = (props) => {
  return (
    <button onClick={(e)=>props.next()}>
      Next
    </button>
  )
}
