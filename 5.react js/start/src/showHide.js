import React from 'react'
import { useState } from "react"

function ShowHide() {
  const [count,setCount]=useState(0)
  return (
    <div>
      <button onClick={()=>{setCount(count+1)}}>update</button>
      <h1 >this is show and hide: {count}</h1>
    </div>
  )
}

export default ShowHide
