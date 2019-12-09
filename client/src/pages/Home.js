import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

class Home extends Component {
    static defaultProps = {
        title: "Hello World"
    }

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            examples: [],
            err: false
        };
    }

    async componentDidMount() {
        try {
            const whoami = await axios.get("/auth/whoami");
            console.log(whoami.data);
            if (whoami.data._id) {
                const dbExamples = await axios.get("/api/example");
                this.setState({
                    examples: dbExamples.data,
                    loggedIn: whoami.data
                });
            }
        }
        catch (err) {
            console.log(err);
            this.setState({ err: true });
        }
    }

    render() {
        return (!this.state.err ?
            (<div>
                <h1>{this.props.title}</h1>
                {(this.state.user ? <p>Welcome, valued member!</p> : "")}
                {this.state.examples.map(item => (<p key={item._id}>{item.text}</p>))}
            </div>)
            :
            (<p>Sorry, an error has occurred!</p>)
        );
    }
}

Home.propTypes = {
    title: PropTypes.string,
    examples: PropTypes.array
}

export default Home;