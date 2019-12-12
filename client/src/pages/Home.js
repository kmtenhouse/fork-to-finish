import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { UserConsumer } from "../context/userContext"


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
                <UserConsumer>
                    {(value) => (<Display user={value} />)}
                </UserConsumer>
            </div>
        );
    }
}

Home.propTypes = {
    title: PropTypes.string
}

function Display(props) {
    if (!props.user.loggedIn) {
        return <p><a href="http://localhost:4000/auth/google">Sign in to begin</a></p>
    } else {
        return <p>Welcome, valued member!</p>
    }
}

export default Home;