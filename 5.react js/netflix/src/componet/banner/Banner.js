import React from 'react'
import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
        <div className='content'>
            <h1 className='title'>Movie name</h1>
              <div className='bannerButtons'>
                  <button className='button'>play</button>
                  <button className='button'>My list</button>
              </div>  
              <h1 className='discription'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or</h1>  

        </div>
        <div className='fade'></div>
    </div>
  )
}

export default Banner
