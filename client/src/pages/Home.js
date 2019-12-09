import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* function Home({ children, title = 'Dr.' }) {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    )
} */

class Home extends Component {
    static defaultProps = {
        title: "Hello World"
    }

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: null
        };
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p><a href="/auth/google">Log In With Google</a></p>
                { (this.state.user ? <p>Welcome, valued member!</p> : "" )}
            </div>
        );
    }
}

Home.propTypes = {
    title: PropTypes.string
}

export default Home;