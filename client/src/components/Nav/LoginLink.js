import React from "react";
import { UserConsumer } from "../../context/userContext";

// Note: In development, we want a couple routes to direct to the backend for ouath flow
const baseURL = (process.env.NODE_ENV === "development" ? "http://localhost:4000" : '');

function LoginLink(props) {
    const signInText = props.loginText || "Log In";
    const signOutText = props.logoutText || "Log Out"
    const classesToApply = props.className || '';

    return (
        <UserConsumer>
            {(value) => (value.loggedIn ? 
            <a href={`${baseURL}/auth/logout`} className={classesToApply}>{signOutText}</a> 
            : 
            <a href={`${baseURL}/auth/google`} className={classesToApply}>{signInText}</a>
            )}
        </UserConsumer>
    );
}

export default LoginLink;