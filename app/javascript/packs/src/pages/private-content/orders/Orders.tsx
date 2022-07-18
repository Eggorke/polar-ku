import * as React from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../lib/services/api-service'
import PrivateRoutes from '../../../navigation/PrivateRoutes'
import s from './styles.module.scss'
import MaterialTable from "material-table";

// Сделать тут все по уму, сейчас по сути это proof of concept

const apiService = new ApiService()

interface orderResponseI {
  data: {
    data: any[]
  }
}

const Orders = () => {
  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    apiService.getAllOrders()
      .then((res: orderResponseI) => setOrders(res.data.data))
  }

  return (
    <div className={s.container}>
      <Link to={`/app${PrivateRoutes.newOrder.path}`}>New order</Link>
      {
        orders.length > 0 && (
          <div style={{maxHeight: '90vh', overflow: 'auto'}}>


          <MaterialTable
          columns={[
            {
              title: 'Internal ID', field: 'attributes.internal_id'
            },
            {
              title: 'State', field: 'attributes.state'
            },
            {
              title: 'Due To', field: 'attributes.due_date'
            },
            {
              title: 'Created At', field: 'attributes.created_at'
            }
          ]}
          data={orders}
          title="Orders"
          options={{ search: false, paging: false }}
        />
        </div>
        )

      }
    </div>
  )
}

export default Orders
