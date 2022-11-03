import './App.css';
import axios from 'axios'
import {useState} from 'react'
function App() {
  const [state,setState]=useState([])
  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res)=>{
          console.log(res.data)
          setState(res.data)
        })
      }}>click me</button>
      {state.map((obj,index)=>{
        return(
          <div>
            <h1>{obj.id}</h1>
            <h4>{obj.title} </h4>
            <h5>{obj.body} </h5>
          </div>

        )

      })}
    </div>
  );
}

export default App;
