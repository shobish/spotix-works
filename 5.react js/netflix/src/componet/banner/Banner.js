import React from 'react'
import {useEffect,useState  } from "react";
import {  BaseUrl,API_KEY,ImageUrl} from "../../constant/Base";
import './Banner.css'
import axios from '../../constant/Axios'
import {action,originals} from '../../constant/Urls'
function Banner() {

  const [Movie, setMovie] = useState()

useEffect(()=>{
  axios.get(originals).then((e)=>{    
    setMovie(e.data.results[4])
  })

},[])
  return (

    <div className='Banner' style={{backgroundImage:`url(${ Movie ? ImageUrl+Movie.backdrop_path : ""  })`}}>
      
        <div className="wrapper">
            <h1 className="text">{Movie ? Movie.name:""}</h1>    
            <div className="Buttons">
                <button className="play">Play</button>
                <button className="list">My List</button>
            </div>
            <div className="dis">
                <h4 className="distext">{Movie ? Movie.overview :""}</h4>
            </div>
        </div>
        <div className="fade"></div>


    </div>
  )
}

export default Banner
