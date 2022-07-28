import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiService from '../../../lib/services/api-service'
import { matchStates, normalizedOrderData } from './Orders'

interface orderDataResponse {
  data: {
    id: string
    type: string
    attributes: {
      created_at: string
      due_date: string
      internal_id: string
      organization_id: string
      state: string
      user_id: string
      user_info: string
    }
  }
  included: orderItemResponse[]
}

interface orderItemResponse {
  id: string
  type: 'order_item'
  attributes: {
    description: string
    place: string
    subject: string
  }
}

interface orderI extends normalizedOrderData {
  included: orderItemResponse[]
}

const apiService = new ApiService()

const Order = () => {

  const navigate = useNavigate()
  const { id } = useParams()
  const [orderData, setOrderData] = React.useState<orderI>()

  const redirect = () => {
    navigate("/app/orders", {replace: true})
  }

  const getOrder = () => {
    apiService.getOrder(id)
      .then((res: {status: number, data: orderDataResponse}) => {
        if (res.status !== 200) {
          redirect()
        } else {
          normalizeData(res.data)
        }
      })
      .catch(() => {
        redirect()
      })
  }

  const normalizeData = (response: orderDataResponse) => {
    let data = {
      id: response.data.id,
      internalId: response.data.attributes.internal_id,
      dueDate: response.data.attributes.due_date,
      createdAt: response.data.attributes.created_at,
      organizationId: response.data.attributes.organization_id,
      state: matchStates(response.data.attributes.state),
      origState: response.data.attributes.state,
      userId: response.data.attributes.user_id,
      userInfo: response.data.attributes.user_info,
      included: response.included
    }
    setOrderData(data)
  }

  React.useEffect(() => {
    getOrder()
  }, [])

  return (
    <div>
      {
        orderData && (
          <div>
            <div>Author: {orderData.userInfo}</div>
            <div>State: {orderData.state}</div>
            <div>Created At: {orderData.createdAt}</div>
            <div>Due to: {orderData.dueDate}</div>
            {
              orderData.included.map((el) => {
                return (
                  <div key={el.id}>
                    <div>Description: {el.attributes.description}</div>
                    <div>Place: {el.attributes.place}</div>
                    <div>Subject: {el.attributes.subject}</div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Order
