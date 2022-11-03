import {useState,useEffect} from 'react'
import Axios from 'axios';

import './app.css'

function App() {
   const [foodName, setFood] = useState("");
   const [updateName, setUpdate]=useState("")
   const [Days, setDay] = useState(0);
   const [foodList, setList]=useState([]) 
   

   useEffect(()=>{
    Axios.get('http://localhost:3001/read').then((res)=>{
      setList(res.data)
    })
   },[])
//function to add data 
const addtoList=()=>{
   Axios.post("http://localhost:3001",{
    foodName:foodName,
    Days:Days,
  
  })
}

//function for update
const updateList=(id)=>{
  Axios.put("http://localhost:3001/update",{
    id:id,
    updateName:updateName,
  
 
 })
} 
//function for delete
const deleteList=(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`)
} 
  return (
    <div className="App">
      <h1>log in</h1>

        <label>FoodName</label>
         <input type="text" className='foodLabel' onChange={(e)=>{
          setFood(e.target.value)
           }} />

        <label>Days</label>
          <input type="number" className='day' onChange={(e)=>{
          setDay(e.target.value)
           }}/><br/>
        <button onClick={addtoList}>submit</button>


    <div className='read'>
      <h1>added list</h1>
        {foodList.map((res ,index)=>{
        
          return(
          <div key={index} className="food">
            <h2>{res.foodName}</h2>
            <h5>{res.Days} </h5>

              <input type='text' placeholder='update the name' onChange={(e)=>{
                setUpdate(e.target.value)
              }} />
              <button onClick={()=>updateList(res._id)} >update</button>
              <button onClick={()=>deleteList(res._id)}>delete</button>
          </div>
        )
      })
      }
        
    </div>
  </div> 

    

  )
}

export default App;
