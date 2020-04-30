import React from 'react';
import Navbar from './components/Navbar'; 
import Facebook from './components/Facebook'; 
import './scss-style/App.scss'; 

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Facebook/>
    </div>
  );
}

export default App;