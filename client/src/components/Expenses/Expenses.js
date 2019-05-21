import React, { Component } from 'react'
import ExpenseTable from './ExpenseTable'
import Modal from './ExpenseModal'
import axios from 'axios'

class Expenses extends Component {
  state = {expenses: []}

  componentDidMount() {
    axios.get('/api/crud/expenses')
    .then( (response) => this.setState({expenses: response.data[0].expenses}))
  }

  handleDelete(id) {
    axios.put(`/api/crud/delete/${id}`)
  }

  handlePaid = (id) => {
    axios.put(`/api/crud/update/${id}`)
  }

  refreshList =  () => {
    axios.get('/api/crud/expenses')
    .then( (response) => this.setState({expenses: response.data[0].expenses}))
  }
  
  render() {
    const { authed } = this.props
    return (
      <div>
        <Modal refresh={this.refreshList}/>
        {new Date().toDateString()}
        {!authed ? <div>Loading...</div> 
        : 
        <ExpenseTable 
          paid={this.handlePaid}
          refresh={this.refreshList}
          expenses={this.state.expenses}
          delete={this.handleDelete}
        /> 
        }
      </div>
    )
  }
}

export default Expenses