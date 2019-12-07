import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Navlist, Navitem } from "./components/Nav";
import { Container } from "./components/Grid";

function App() {
  return (
    <div>
    <Navbar />
    <Container>
     <p>Hello world!</p> 
    </Container>
    </div>
  );
}

export default App;
