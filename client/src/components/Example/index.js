import React from "react";

export class ExampleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            examples: []
        };
    }

    componentDidMount() {
        //call our API and get a list of examples, then display them
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