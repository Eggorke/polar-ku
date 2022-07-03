import * as React from 'react'
import { Link } from 'react-router-dom';
import s from './styles.module.scss';
import PublicRoutes from '../../navigation/PublicRoutes';
import WavedText from '../../components/wavedText/WavedText';

const Header = () => {
  return (
    <div className={s.headerWrapper}>
      <div className={s.headerLogo}><WavedText message={'ПОЛАР'}/></div>
      <div className={s.headerLinks}>
        <a href='#about' className={s.link}>О компании</a>
        <a href='#clients' className={s.link}>Клиенты</a>
        <a href='#feedbacks' className={s.link}>Отзывы</a>
        <a href='#contacts' className={s.link}>Контакты</a>
      </div>
      <div className={s.headerLogin}><Link to={PublicRoutes.registration.path} className={s.link}>Личный кабинет</Link></div>
    </div>
  )
}

export default Header
