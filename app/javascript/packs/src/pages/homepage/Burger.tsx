import * as React from 'react'
import { Link } from 'react-router-dom'
import PublicRoutes from '../../navigation/PublicRoutes'
import { slide as Menu } from 'react-burger-menu'
import s from './styles.module.scss'

interface BurgerProps {
  pageWrapId: string
  outerContainerId: string
}

const Burger = (props: BurgerProps) => {
  return (
    <Menu {...props}>
      <Link to={PublicRoutes.login.path}>Вход</Link>
      <Link to={PublicRoutes.registration.path}>Регистрация</Link>
    </Menu>
  )
}

export default Burger
