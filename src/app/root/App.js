import React from 'react';
import '../../styles/App.css';
import Home from '../home/Home';

const App = (props) => {
  return (
    <div className="App">
      <h1>Hello ,{props.name}</h1>
      <Home propsText={props.name} />
    </div>
  );
};

export default App;
