import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { Button, Modal, Form } from 'semantic-ui-react'

class ModalModalExample extends Component {
  state = {
    business: '',
    amount: '',
    due: new Date(),
    modalOpen: false
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleFormChange = (e, {name, value}) => {
    this.setState({
      [name]: value,
    })
  }

  handleDateChange = (date) => {
    this.setState({due: date})
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const {business, amount, due} = this.state
    let data = {
      business,
      amount,
      due: due.toDateString()
    }
    if(business && amount) {
      axios.post('/api/crud/add', data)
      this.props.refresh()
      this.setState({
        business: "",
        amount:"",
        due: new Date()
      })
      this.handleClose()
    } else {
      alert("FORM INCOMPLETE")
    }
  }
 
  render() {
    const { business, amount } = this.state
    return (
      <Modal 
        closeIcon={true} 
        trigger={<Button onClick={this.handleOpen}>New Expense</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
      <Modal.Header>Add Expense</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Business Name</label>
              <Form.Input 
                error={!business ? true : false}
                placeholder="Business Name"
                name="business"
                value={business}
                onChange={this.handleFormChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount Due</label>
              <Form.Input 
                error={!business ? true : false}
                type="number" 
                placeholder="$ Amount Due"
                name="amount"
                value={amount}
                onChange={this.handleFormChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Due Date</label>
              <DatePicker
                selected={this.state.due}
                onChange={this.handleDateChange} 
              />
            </Form.Field>
            <Button positive onClick={this.handleFormSubmit}>Submit</Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }
}

export default ModalModalExample