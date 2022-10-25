import {Component} from 'react'
//class component
class Header extends Component{
   render(){

    return(  <h1>this is an Header component and welcome {this.props.data}</h1>)


   }
  

   
  
}
export default Header;


//functional Component

// function Header(props){
//     return(
//         <h1>this is an Header component and welcome {props.data}</h1>
//     )
// }
// export default Header;