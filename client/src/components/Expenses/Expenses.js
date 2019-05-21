import React, { Component } from 'react'
import ExpenseTable from './ExpenseTable'
import DatePicker from 'react-datepicker'
import Modal from './ExpenseModal'
import axios from 'axios'

class Expenses extends Component {
  state = {
    expenses: [],
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date()
  }

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

  handleChangeStart = (date) => {
    this.setState({startDate: date})
  }

  handleChangeEnd = (date) => {
    this.setState({endDate: date})
  }
  
  render() {
    const { authed } = this.props
    const { startDate, endDate } = this.state
    return (
      <div>
        <Modal refresh={this.refreshList}/>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
        />
        {!authed ? <div>Loading...</div> 
        : 
        <ExpenseTable 
          startDate={startDate}
          endDate={endDate}
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