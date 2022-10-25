import './App.css';
import Header from './componets/Header'

function App() {
  const name='Shobish'
  return (
    <div>
    <Header data={name}/> 
      <h1>this is the main app text</h1>
      
    </div>
    
    )
  }

export default App;
