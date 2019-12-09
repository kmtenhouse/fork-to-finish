import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { userContext } from '../context/userContext';

class Home extends Component {
    static defaultProps = {
        title: "Hello World"
    }

    constructor(props) {
        super(props);
        this.state = {
            title: props.title
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>Hello World!</p>
                <userContext.Consumer>
                    {(value) => (<Display user={value} />)}
                </userContext.Consumer>
            </div>
        );
    }
}

Home.propTypes = {
    title: PropTypes.string
}

function Display(props) {
    if(!props.user.loggedIn) {
        return <p><a href="http://localhost:4000/auth/google">Sign in with Google</a></p>
    } else {
    return <p>Welcome! Now please <a href="http://localhost:4000/auth/logout">sign out immediately.</a></p>
    }
}

export default Home;