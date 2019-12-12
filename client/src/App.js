import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import Home from "./pages/Home";
import axios from "axios";
import { UserProvider, UserConsumer } from "./context/userContext";

// Note: In development, we want a couple routes to direct to the backend for ouath flow
const baseURL = (process.env.NODE_ENV === "development" ? "http://localhost:4000" : '');

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
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <UserConsumer>
                    {(value) => (value.loggedIn ? <a href={`${baseURL}/auth/logout`}>Log Out</a> : <a href={`${baseURL}/auth/google`}>Log In</a>)}
                  </UserConsumer>
                </li>
              </ul>
            </nav>

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