import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";

export default class Header extends Component {
  state = { 
    user: {},
    error: null,
    authenticated: false,
  };

  componentDidMount() {
    fetch("http://localhost:3001/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Menu pointing secondary style={{marginTop:"15px"}}>
        <Menu.Item
          name="HOME"
          as={Link}
          to={"/"}
        />
        <Menu.Item
          name="EXPENSES"
          as={Link}
          to={authenticated ? "/expenses" : "/"}
          disabled={authenticated ? false : true}
        />
        {authenticated ? (
          <Menu.Item position="right">
            <Button color="google plus" onClick={this._handleLogoutClick}>
              <Icon name="google" />
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Button color="google plus" onClick={this._handleSignInClick}>
              <Icon name="google" />
              Login with google
            </Button>
          </Menu.Item>
        )}
      </Menu>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open google login page
    window.open("http://localhost:3001/auth/google", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using google passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:3001/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };
}