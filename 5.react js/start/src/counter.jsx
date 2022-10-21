import React from 'react'

function Counter(props){
    const {name,num}=props
    return(
    <div>
        <h1> {name}{num} </h1>
    </div>
    )
}

 
export default Counter;