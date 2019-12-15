import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

import { UserConsumer } from "../../context/userContext";

export function ProtectedLink(props) {
    return(
        <UserConsumer>
            {(value) => value.loggedIn ? "Logged in" : "Logged Out"}
        </UserConsumer>
    );
    
}

export function ProtectedRoute(props) {

}


