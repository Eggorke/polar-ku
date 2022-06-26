import * as React from 'react'
import { clearProfile, userSignOut } from '../../actions'
import { connect } from 'react-redux'
import s from './styles.module.scss'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Orders from './orders/Orders'
import PrivateRoutes from '../../navigation/PrivateRoutes'
import Navbar from './navbar/Navbar'


const PrivateContent = () => {
  return (
    <div className={s.main}>
      <Navbar />
      <div className={s.content}>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path={PrivateRoutes.orders.path} element={<Orders />}/>
        </Routes>
      </div>
    </div>
  )
}

const mapStateToProps = (state: {}) => {
  return { state }
}

const mapDispatchToProps = {
  clearProfile,
  userSignOut
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateContent)
