import * as React from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../lib/services/api-service'
import PrivateRoutes from '../../../navigation/PrivateRoutes'
import s from './styles.module.scss'
import OrderStates from '../../../constants/orderStates'
import CustomTable from '../../../components/customTable/CustomTable'
import ReactPaginate from 'react-paginate';

// Сделать тут все по уму, сейчас по сути это proof of concept

const apiService = new ApiService()

interface orderResponseI {
  data: {
    data: orderResponseI[]
    meta: metaI
  }
}

interface metaI {
  count: number
  total_count: number
  total_pages: number
}

interface orderResponseI {
  attributes: orderResponseAttrs
  id: string
  type: string
}

interface orderResponseAttrs {
  created_at: string
  due_date: string
  internal_id: number
  organization_id: number
  state: string
  user_id: string
  user_info: string
}

export interface normalizedOrderData {
  id: string
  internalId: string
  dueDate: string
  createdAt: string
  organizationId: string
  state: string
  userId: string
  origState: string
  userInfo: string
}

export const matchStates = (state: string) => {
  return OrderStates[state] || 'Ошибка'
}

const Orders = () => {
  const [orders, setOrders] = React.useState<normalizedOrderData[] | []>([])
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(10)
  const [meta, setMeta] = React.useState<metaI>({count: 0, total_count: 0, total_pages: 0})
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    getOrders()
  }, [page])

  const getOrders = () => {
    setLoading(true)
    apiService.getAllOrders({page: page, per_page: perPage})
      .then((res: orderResponseI) => {
        setLoading(false)
        normalizeData(res)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const normalizeData = (response: orderResponseI) => {
    let data = []
    response.data.data.map((el) => {
      data.push({
        id: el.id,
        internalId: el.attributes.internal_id,
        dueDate: el.attributes.due_date,
        createdAt: el.attributes.created_at,
        organizationId: el.attributes.organization_id,
        state: matchStates(el.attributes.state),
        origState: el.attributes.state,
        userId: el.attributes.user_id,
        userInfo: el.attributes.user_info
      })
    })
    setOrders(data)
    setMeta(response.data.meta)
  }

  return (
    <div className={s.container}>
      <Link to={`/app${PrivateRoutes.newOrder.path}`}>New order</Link>
      {
        orders.length > 0 && (
          <div className={s.tableWrapper}>
            <div className={s.tableTitle}>
              Заявки
            </div>
            <CustomTable variant='orders' data={orders} />
            {
              meta.total_pages > 1 && (
                <div className={s.tablePagination}>
                  <ReactPaginate
                    className={s.paginateRoot}
                    breakClassName={s.paginateEmpty}
                    activeClassName={s.paginateSelected}
                    previousClassName={s.paginateNav}
                    nextClassName={s.paginateNav}
                    breakLabel="..."
                    nextLabel="Вперед >"
                    onPageChange={(data) => {
                      setPage(data.selected + 1)
                    }}
                    pageRangeDisplayed={3}
                    pageCount={meta.total_pages}
                    previousLabel="< Назад"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={1}
                  />
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Orders
