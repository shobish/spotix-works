import React from "react";
import Navbar from "./componet/navBar/Navbar";
import Banner from "./componet/banner/Banner";
import './App.css';
import RowPost from "./componet/RowPost/RowPost";

function App() {
  return (
    <div className="App">        
      <Navbar/>
      <Banner/>
      <RowPost/>    
      
    </div>
    )
}

export default App;
