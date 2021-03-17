import React from 'react'
import './app.css'
import TownContainer from './components/Town/TownContainer';
import AddNewCityContainer from './components/Modals/AddNewCity/AddNewCityContainer';

const App = () => {
  
  return (
    <div className="app">
        <TownContainer/>
        <AddNewCityContainer />      
    </div>
  );
};

export default App;
