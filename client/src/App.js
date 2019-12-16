/* Import packages */
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import axios from "axios";

/* Import context for auth */
import { UserProvider, UserConsumer } from "./context/userContext";

/* Import pages */
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from './pages/NotFound';
import Dashboard from "./pages/Dashboard";

/* Import components */
import Nav from "./components/Nav";
import Container from "./components/Container";

/* Import css */
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    try {
      this.checkLoginState();
    }
    catch(err) {
      console.log(err);
      if(err.response) {
        console.log(err.response.status)
      }
    }

  }

  checkLoginState = async () => {
    const result = await axios.get("/auth/whoami");
    this.setState({ user: result.data });
  }

  render() {
    return (
      <UserProvider>
        <Router>
          <Nav />
          <Container>
            <Switch>
              <Route exact path="/home">
                <UserConsumer>
                  {(value) => (value.loggedIn ? <Dashboard /> : <Home />)}
                </UserConsumer>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <UserConsumer>
                  {(value) => (value.loggedIn ? <Dashboard /> : <Home />)}
                </UserConsumer>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </UserProvider>
    );
  }

}

export default App;

