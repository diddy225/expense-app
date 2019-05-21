import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";

export default class Header extends Component {
 
  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open google login page
    window.open("http://localhost:3001/auth/google", "_self");
  };

  _handleLogoutClick = () => {
    // Logout using google passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  render() {
    const { authed } = this.props;
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
          to={authed ? "/expenses" : "/"}
          disabled={authed ? false : true}
        />
        {authed ? (
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
}