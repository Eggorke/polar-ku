import * as React from 'react'
import WavedText from '../../components/wavedText/WavedText';
import Header from './Header';
import s from './styles.module.scss';

// как будто чего то не хватает на первом экране, надо подумать
const Homepage = () => {
  return (
    <div>
      <Header />
      <div className={s.banner}>
        <div className={s.bannerWrap}>
          <span style={{color: 'white'}}>Define design</span>
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
