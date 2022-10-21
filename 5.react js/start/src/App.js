import './style.css'
import Header from './Header'
import Counter from './counter'
import Employee from './employee'
import ShowHide from './showHide'
import {useState} from 'react'

//countdown 
function App() {
  
  const [num ,setNum] = useState(0)
  const[state,setState] =useState(false)

  const addnum=()=>{
   setNum(num+1)
    console.log(num);
  }
 let first= {
  name:"first name",
  num

 }
 let emp=[
  {name:'sho ',age:16},
  {name:'sho ',age:16},
  {name:'sho ',age:16}
]


  return (
    <div>
       <Header/>
       <button onClick={addnum}>add+</button>
       <Counter {...first} />  
       <Counter name="second" num={num} /> 
       
       {
        emp.map((obj , index) => 
          (
            <Employee key={index} {...obj} />
          )
        
        )
      } 

      <button onClick={()=>setState(!state)}>show/hide</button>
      {state &&<ShowHide/> }
    </div>
  );
}

export default App;
