import React from 'react'

function Employee(props) {
  return (
    <div>
      <h1>name:{props.name}, age: {props.age} </h1>
    </div>
  )
}

export default Employee
