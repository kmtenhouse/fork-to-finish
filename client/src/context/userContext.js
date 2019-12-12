import React from 'react'
import axios from "axios"

const UserContext = React.createContext()

class UserProvider extends React.Component {
  state = { loggedIn: false }

  checkLogIn = async () => {
    try {
      const result = await axios.get("/auth/whoami");
      console.log(`Current Log In State: ${result.data.loggedIn}`);
      const logInState = (result.data && result.data.loggedIn === true ? true : false);
      this.setState({
        loggedIn: logInState
      });

    } catch(err) {
      console.log(`Error checking log in state - logged out!`);
      this.setState({loggedIn: false});
    }
  }

  componentDidMount() {
    this.checkLogIn();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          loggedIn: this.state.loggedIn
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const UserConsumer = UserContext.Consumer

export { UserProvider, UserConsumer }
