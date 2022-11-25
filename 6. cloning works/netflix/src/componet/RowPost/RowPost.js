import React from 'react'
import {useEffect,useState} from 'react' 
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../constant/Axios'
import {API_KEY,ImageUrl} from '../../constant/Base'



function RowPost(props) {
 const [Movie, setMovie] = useState([])
 const [UrlId, setUrlId] = useState('')
 useEffect(() => {
   axios.get(props.Url).then((res)=>{
     
     setMovie(res.data.results)
     
     
   }).catch(err=>{
     alert('error')
   })
 }, [])

 const opts = {
   height: '390',
   width: '100%',
   playerVars: {
     //https://developers.google.com/youtube/player_parameters
     autoplay: 1,
   },
 };

 const handleYoutubePlay=(id)=>{
   console.log(id)
   axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
     console.log(res.data);
     if(res.data.results.length!==0){
       setUrlId(res.data.results[0])
     }else{
       console.log('empty')
     }


 })
  
 }

 return (
   <div className='row'>
       <h2>{props.name}</h2>
           <div className="posters" >

                 {Movie.map((e,index)=>
                  <img onClick={()=>handleYoutubePlay(e.id)}  key ={index} className={props.isSmall ? 'smallPoster' :'poster'} src={`${ImageUrl+e.backdrop_path}`}/>
                 
                 )}
               
           </div>
              { UrlId &&  <YouTube videoId={UrlId.key} opts={opts} />}
   </div>
 )
}

export default RowPost
