import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

export default class Expenses extends Component {
  state = {
    expenses: {},
    authenticated: false
  }

  componentDidMount() {
    fetch("/api/crud/expenses", {
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
          expenses: responseJson[0].expenses
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  addExpense =  () => {
    const expense = { 
      business: "ATT", 
      amount: 200, 
      due: 333
    }
    axios.post('/api/crud/add', expense)
  }

  render() {
    const { authenticated, expenses } = this.state;
    return (
      <div>
        {!authenticated ? <div>Please Login</div> 
        : 
        <div>
        <Button onClick={this.addExpense}>ADD EXPENSE</Button>
        <ul>
        {authenticated ? expenses.map((ele, i) => <li key={i}>{ele.business} {ele.amount} {ele.due}</li>) : null}
        </ul>
        </div>
        }
      </div>
    )
  }
}