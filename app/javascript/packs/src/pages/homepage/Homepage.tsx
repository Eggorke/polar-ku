import * as React from 'react'
import Burger from './Burger';
import s from './styles.module.scss';
import './burger.css';

const Homepage = () => {
  return (
    <div id="Homepage">
      <Burger pageWrapId={"page-wrap"} outerContainerId={"Homepage"} />
      <div id="page-wrap">
        <div className={s.firstScreen}>
          ПОЛАР
        </div>
        <div className={s.secondScreen}>
          Second screen
        </div>
        <div className={s.thirdScreen}>
          Third screen
        </div>
      </div>
    </div>
  )
}

export default Homepage
