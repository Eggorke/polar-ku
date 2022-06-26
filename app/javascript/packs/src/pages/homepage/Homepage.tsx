import * as React from 'react'
import Header from './Header';
import s from './styles.module.scss';
import { useDimensions } from '../../lib/hooks/useDimension';

// как будто чего то не хватает на первом экране, надо подумать
const Homepage = () => {
  return (
    <div>
      <Header />
      <div className={s.banner}>
        <div className={s.bannerTitle}>
          <span>ПОЛАР</span>
          <span>ПОЛАР</span>
        </div>
      </div>
      <div className={s.about} id='about'>
        <div className={s.aboutTitle}>
          <span>О компании</span>
        </div>
      </div>
      <div className={s.clients} id='clients'>clients</div>
      <div className={s.feedbacks} id='feedbacks'>feedbacks</div>
      <div className={s.contacts} id='contacts'>footer</div>
    </div>
  )
}

export default Homepage
