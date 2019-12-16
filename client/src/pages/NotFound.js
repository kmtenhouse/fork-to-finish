import React from "react";
import "./page.css";

function NotFound(props) {
    return(
        <div className="page">
            <h1 className="page__heading">404</h1>
            <p>
                Sorry, we weren't able to find what you were looking for!
            </p>
        </div>
    );
}

export default NotFound;