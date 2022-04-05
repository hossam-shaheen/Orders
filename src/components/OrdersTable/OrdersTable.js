import React from 'react'
import classes from './OrdersTable.module.css'

const OrdersTable = ({ orders }) => {
    const renderOrderRow = (order) => {
        return (
            <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderItemID}</td>
                <td>{order.orderItemName}</td>
                <td>{order.orderItemQuantity}</td>
                <td>{order.customerFirstName}</td>
                <td>{order.customerLastName}</td>
                <td>{order.customerAddress}</td>
                <td>{order.customerCity}</td>
                <td>{order.customerZIPCode}</td>
                <td>{order.customerEmail}</td>
            </tr>
        )
    }

    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Customer First Name</th>
                    <th>Customer Last Name</th>
                    <th>Customer Address</th>
                    <th>Customer City</th>
                    <th>Customer ZIP Code</th>
                    <th>Customer Email</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => {
                    return renderOrderRow(order)
                })}
            </tbody>
        </table>
    )
}

export default OrdersTable
