import React from 'react';
import '../../styles/App.css';
import Home from '../home/Home';

interface Iprops {
  name: string;
}

const App: React.FC<Iprops> = (props) => {
  return (
    <div className="App">
      <h1>Hello ,{props.name}</h1>
      <Home propsText={props.name} />
    </div>
  );
};

export default App;
