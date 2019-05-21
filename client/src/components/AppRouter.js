import React, { Component } from "react";
import HomePage from "./Home/Homepage";
import Header from "../components/Home/Header"
import Expenses from "./Expenses/Expenses"
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

 class AppRouter extends Component {
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
      .then(response => {
        this.setState({
          authenticated: true,
          user: response.user
        });
      })
      .catch(e => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
  
  render() {
  const {user, authenticated, expenses} = this.state;
  return (
    <Router>
      <Container>
        <Header authed={authenticated}/>
        <Route exact path="/" render={(props) => <HomePage {...props} authed={authenticated} user={user} />} />
        <Route path="/expenses" render={(props) => authenticated ? 
          <Expenses {...props} authed={authenticated} expenses={expenses} /> 
          : 
          <Redirect to="/"/>
        }/>
      </Container>
    </Router>
  );
  }
};

export default AppRouter