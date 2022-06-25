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
      <a href='#activity'>Деятельность компании</a>
      <a href='#clients'>Клиенты</a>
      <a href='#feedbacks'>Отзывы</a>
      <a href='#contacts'>Контакты</a>
    </Menu>
  )
}

export default Burger
