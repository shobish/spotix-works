import React from 'react';
 import {useState,useEffect} from 'react'
import Axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';
import {Modal, Button } from 'react-bootstrap'
//import { ToastContainer, toast } from 'react-toastify';

import './app.css'



function App() {
  const [Name, setName] = useState("");
  const [Order,setOrder] = useState(0);
  const [TotalList, setTotalList] = useState([]);
  const [show, setshow] = useState(false);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [UpdateText, setUpdateText] = useState("");
  const [updatingEntry, setupdatingEntry] = useState("");




useEffect(() => {
  Axios.get('http://localhost:3001/list')
  .then((res)=>{
    setTotalList(res.data)
    
  }).catch(()=>{
    console.log('err');
  })
  
}, []);


  const addFun=()=>{
    Axios.post('http://localhost:3001/insertItem',{
      name:Name,
      order:Order
    }).then(()=>{
      alert('success')
    }).catch(()=>{
      alert('ooopss')
    })
  }
const updateData=()=>{  
  
   Axios.put(`http://localhost:3001/${updatingEntry._id}/update`,
  {
    UpdateText:UpdateText,
    


   }

   )
}

const deleteData=(id)=>{
  setshow(true)
  console.log(id);
  Axios.delete(`http://localhost:3001/delete/${id._id}`)
}

const handleClose=()=>{
  setshow(false)
}
const handleCloseUpdateModal=()=>{
  setshowUpdateModal(false)
}

const handleShowUpdateModal=(val)=>{
  setshowUpdateModal(true)
  setupdatingEntry(val)
}


return(

  <div className='App'>

    
    <div className='Login'>
      <div  className='loginForm' >
        <label>FoodName</label>
        <input 
          type="text" 
          className='foodLabel' 
          placeholder='Choose your food'
          onChange={(e)=>{
          setName(e.target.value)
          }}       
        />

        <label>How Many</label>
          <input 
            type="number" 
            className='day' 
            placeholder='order' 
            onChange={(e)=>{
            setOrder(e.target.value)
            }}
          />
          <br/>
        <button className='btn btn-success' onClick={addFun}>Add+</button>
      </div>    
    </div> 

<div className='showData'>

  {TotalList.map((val,index)=>{


    return(

      <div  key={index} className="dataWrapper" >

        <div className='dataForm'>
          <div  className='dataContainer'>
            <h6>Name: {val.name}</h6>
            <h6>Order: {val.order}</h6>          
          </div>

          <div className='dataButtonWrapper'>
            <button className='btn btn-primary' onClick={()=>{handleShowUpdateModal(val)}}  >Update</button>
            <button className='btn btn-danger' onClick={()=>{deleteData(val)}}>delete</button>         
          
          </div>
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure</Modal.Title>
          </Modal.Header>
          <Modal.Body>your going to miss this</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteData}>
              Delete
            </Button>
          </Modal.Footer>
          </Modal>
          </div> 

        <div>

        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>

            <Modal.Header closeButton>
                <Modal.Title>Are You sure</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>You Want to Update the Data</p>
            </Modal.Body>
            
            <Modal.Body>
                <input type='text' placeholder='update' value={UpdateText} onChange={(e)=>{setUpdateText(e.target.value)}}  />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
                <Button variant="primary" onClick={updateData} >Save changes</Button>
            </Modal.Footer>

        </Modal>
    </div>
      </div>
    )

  })}

</div> 
      

  </div> 
)
}
export default App;
