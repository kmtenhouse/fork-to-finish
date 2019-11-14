import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ExampleList, ExampleItem } from './components/Example';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 jumbotron">
          <h1 className="text-center">Examples</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-3 mx-auto">
          <ExampleList>
          </ExampleList>
        </div>
      </div>
    </div>
  );
}

export default App;
