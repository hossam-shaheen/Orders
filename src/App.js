import { useCallback, useState, useEffect } from 'react'
import './App.css'
import OrdersTable from './components/OrdersTable/OrdersTable'
import Error from './components/Error/Error'
import Loader from './components/Loader/Loader'

function App() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const mapToOrders = (items, orders, customers) => {
        const orderFullInfo = orders.reduce((previousOrder, currentOrder) => {
            const currentItem = items.find(
                (item) => item.orderId === currentOrder.id
            )
            const currentCustomer = customers.find(
                (customer) => customer.id === currentOrder.customerId
            )
            const currentCustomerAddress = currentCustomer.addresses.find(
                (address) => address.type === 'shipping'
            )

            if (currentItem && currentCustomer) {
                return [
                    ...previousOrder,
                    {
                        orderID: currentOrder.id,
                        orderDate: currentOrder.createdAt,
                        orderItemID: currentItem.id,
                        orderItemName: currentItem.name,
                        orderItemQuantity: currentItem.quantity,
                        customerFirstName: currentCustomer.firstName,
                        customerLastName: currentCustomer.lastName,
                        customerAddress: currentCustomerAddress.address,
                        customerCity: currentCustomerAddress.city,
                        customerZIPCode: currentCustomerAddress.zip,
                        customerEmail: currentCustomer.email,
                    },
                ]
            }
        }, [])

        setOrders(orderFullInfo)
    }

    const fetchOrders = useCallback(async () => {
        const orderUrls = [
            fetch(
                'https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/items.json'
            ),
            fetch(
                'https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/orders.json'
            ),
            fetch(
                'https://storage.googleapis.com/neta-interviews/MJZkEW3a8wmunaLv/customers.json'
            ),
        ]
        setLoading(true)
        setError("")
        try {
            const response = await Promise.all(orderUrls)
            if (!response.every((r) => r.ok)) {
                throw Error('failed to fetch orders')
            }
            const [items, orders, customers] = await Promise.all(
                response.map((r) => r.json())
            )

            mapToOrders(items, orders, customers)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return (
        <div className="App">
            {orders.length > 0 && !loading && !error && (
                <OrdersTable orders={orders} />
            )}

            {orders.length === 0 && !loading && error && (
                <Error error={error} />
            )}

            {orders.length === 0 && loading && !error && <Loader />}
        </div>
    )
}

export default App
