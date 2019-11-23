import React from "react";
import axios from "axios";

export class ExampleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examples: []
        };
    }

    componentDidMount() {
        //call our API and get a list of examples, then display them
        console.log("Mounted!");
        axios.get("http://localhost:3001/api/examples")
            .then(results => {
                console.log(results);
                this.setState({ examples: results.data })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (<ul>
            <ExampleItem>Hey</ExampleItem>
            <ExampleItem>There</ExampleItem>
            <ExampleItem>You</ExampleItem>
        </ul>);
    }
}

function ExampleItem(props) {
    return (<li>{props.children}</li>);
}