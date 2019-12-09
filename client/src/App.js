import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import axios from "axios";
import { userContext } from "./context/userContext";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    const result = await axios.get("/auth/whoami").catch((err) => { console.log(err)});
    this.setState({ user: result.data });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="http://localhost:4000/auth/google">Log In</a>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <userContext.Provider test={this.state.user} value={this.state.user}>
                <Home title="Home page" />
              </userContext.Provider>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

function About() {
  return <h2>About</h2>;
}

export default App;