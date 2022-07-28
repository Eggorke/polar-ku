import * as React from 'react'
import s from './styles.module.scss'
import { normalizedOrderData } from '../../pages/private-content/orders/Orders'
import Table from 'react-bootstrap/Table';
import classNames from 'classnames';
import './rowColors.scss';
import { useNavigate } from 'react-router-dom';
import PrivateRoutes from '../../navigation/PrivateRoutes';

interface Props {
  variant: 'orders' | 'add more if needed'
  data: normalizedOrderData[] | []
}

const CustomTable = (props: Props) => {
  const navigate = useNavigate()
  const { variant, data } = props

  const renderTable = () => {
    switch(variant) {
      case 'orders': {
        return renderOrders()
      }
      default: {
        return null
      }
    }
  }

  const handleClick = (id: string) => {
    navigate(`${id}`)
  }

  const renderOrders = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Статус</th>
            <th>Выполнить до</th>
            <th>Дата создания</th>
            <th>Автор</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((el: normalizedOrderData) => {
              return (
                <tr
                  key={el.id}
                  className={classNames(s.row, el.origState)}
                  onClick={() => handleClick(el.id)}
                >
                  <td>{el.internalId}</td>
                  <td>{el.state}</td>
                  <td>{el.dueDate}</td>
                  <td>{el.createdAt}</td>
                  <td>{el.userInfo}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }

  return (
    <div className={s.root}>
      {
        renderTable()
      }
    </div>
  )
}

export default CustomTable
