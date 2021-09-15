import React from 'react';
import { CompProps } from '../../model/types';
import '../../styles/App.css';
import Home from '../home/Home';

const App: React.FC<CompProps> = (props) => {
  return (
    <div className="App">
      <h1>Hello ,{props.name}</h1>
      <Home propsText={props.name} />
    </div>
  );
};

export default App;
