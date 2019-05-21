import React from 'react'
import _ from 'lodash'
import { Table, Button, Label } from 'semantic-ui-react'

const filterData = (start, end, array) => {
  return (
    _.filter(array, (o) => o.due >= new Date(start).toISOString() && o.due <= new Date(end).toISOString())
  )
}
const ExpenseTable = (props) => {
  const filtered = filterData(props.startDate, props.endDate, props.expenses)
  const tableData = filtered.map((ele) => {
    return (
        <Table.Row key={ele._id}>
          <Table.Cell>
            {ele.paid ? <Label color={"green"} ribbon>PAID</Label> : null}
            {ele.business}
          </Table.Cell>
          <Table.Cell>${ele.amount}</Table.Cell>
          <Table.Cell>{new Date(ele.due).toDateString()}</Table.Cell>
          <Table.Cell width={4} textAlign={"center"}>
            <Button onClick={() => {props.paid(ele._id); props.refresh();}} color="green">Mark Paid</Button>
            <Button onClick={() => {props.delete(ele._id); props.refresh();}} color="red">DELETE</Button>
          </Table.Cell>
        </Table.Row>
    )
  })
  return (
    <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>BUSINESS</Table.HeaderCell>
        <Table.HeaderCell>AMOUNT</Table.HeaderCell>
        <Table.HeaderCell>DUE</Table.HeaderCell>
        <Table.HeaderCell>PAID</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {tableData}
    </Table.Body>
  </Table>
  )
}

export default ExpenseTable