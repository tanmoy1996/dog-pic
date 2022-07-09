import React from 'react'

export const Selector = (props) => {
  const options = ['Random','Beagle','Boxer','Dalmatian','Husky'];
  return (
      <select 
      value={props.selected}
      onChange={(e)=>props.reload(e.target.value)}>
        {
          options.map((op,idx)=>{
            return (
              <option key={idx} value={op.toLowerCase()}>{op}</option>
            )
          })
        }
      </select>
  )
}
