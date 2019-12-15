import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import axios from "axios";
import { UserProvider, UserConsumer } from "./context/userContext";
import { ProtectedLink } from "./components/ProtectedRoute";

import "./App.css";

import Home from "./pages/Home";
import Nav from "./components/Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    const result = await axios.get("/auth/whoami").catch((err) => { console.log(err) });
    this.setState({ user: result.data });
  }

  render() {
    return (
      <UserProvider>
        <Router>
          <Nav />
          <div>
            <Switch>
              <Route exact path="/home">
                <Home title="Home page" />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Home title="Home page" />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }

}

function About() {
  return <h2>About</h2>;
}

function NotFound() {
  return <h2>404</h2>;
}

export default App;  