import React from 'react'
import { UserConsumer } from "../../context/userContext";
import { Link } from 'react-router-dom'

const headerStyle = {
  display: 'flex',
  backgroundColor: '#26c6da',
  justifyContent: 'space-between',
  padding: 10
}

const linkStyle = {
  color: 'white',
  textDecoration: 'underline'
}

export default () => (
  <header>
    <UserConsumer>
      {({ isUser }) => (
        <div style={headerStyle}>
          <h3>
            <Link style={linkStyle} to="/">
              HOME
            </Link>
          </h3>

          {isUser ? (
            <ul>
              <Link style={linkStyle} to="/">
                Dashboard
              </Link>
              <button>logout</button>
            </ul>
          ) : (
            <button>login</button>
          )}
        </div>
      )}
    </UserConsumer>
  </header>
)
