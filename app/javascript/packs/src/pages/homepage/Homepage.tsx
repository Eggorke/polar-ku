import * as React from 'react'
import Burger from './Burger';
import s from './styles.module.scss';
import './burger.css';


// вместо бургера сделать обычный хэдер наверно
const Homepage = () => {
  return (
    <div id="Homepage">
      <Burger pageWrapId={"page-wrap"} outerContainerId={"Homepage"} />
      <div id="page-wrap">
        <div className={s.firstScreen}>
          ПОЛАР
        </div>
        <div className={s.secondScreen} id='activity'>
          <div className={s.secondScreenTitle}>
            Деятельность компании
          </div>
          <div className={s.secondScreenImagesWrapper}>
            <div className={s.secondScreenImageCart}>
              <div className={s.secondScreenImageWrap}></div>
              <div className={s.secondScreenImageTitle}>Title</div>
              <div className={s.secondScreenImageDesc}>Какое то описание Какое то описание Какое то описание Какое то описание Какое то описание</div>
            </div>
            <div className={s.secondScreenImageCart}>
              <div className={s.secondScreenImageWrap}></div>
              <div className={s.secondScreenImageTitle}>Title</div>
              <div className={s.secondScreenImageDesc}>Какое то описание Какое то описание Какое то описание Какое то описание Какое то описание</div>
            </div>
            <div className={s.secondScreenImageCart}>
              <div className={s.secondScreenImageWrap}></div>
              <div className={s.secondScreenImageTitle}>Title</div>
              <div className={s.secondScreenImageDesc}>Какое то описание Какое то описание Какое то описание Какое то описание Какое то описание</div>
            </div>
          </div>
        </div>
        <div className={s.thirdScreen} id='clients'>
          Наши клиенты
        </div>
        <div className={s.fourthScreen} id='feedbacks'>
          Отзывы
        </div>
        <div className={s.footer} id='contacts'>
          Footer
        </div>
      </div>
    </div>
  )
}

export default Homepage
