import React from "react";
import HomePage from "./Home/Homepage";
import Header from "../components/Home/Header"
import Expenses from "./Expenses/Expenses"
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Router>
      <Container>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/expenses" component={Expenses} />
      </Container>
    </Router>
  );
};