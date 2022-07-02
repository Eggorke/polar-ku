import classNames from 'classnames'
import * as React from 'react'
import s from './styles.module.scss'

const Dashboard = () => {
  return (
    <div className={s.container}>
      <div className={classNames(s.widgetWrapper, s.total)}>
        <div className={s.widgetTitle}>Всего заявок</div>
        <div className={s.widgetAmount}>40</div>
      </div>
      <div className={classNames(s.widgetWrapper, s.inProgress)}>
        <div className={s.widgetTitle}>В работе</div>
        <div className={s.widgetAmount}>10</div>
      </div>
      <div className={classNames(s.widgetWrapper, s.completed)}>
        <div className={s.widgetTitle}>Выполнено</div>
        <div className={s.widgetAmount}>20</div>
      </div>
      <div className={classNames(s.widgetWrapper, s.rejected)}>
        <div className={s.widgetTitle}>Отменено</div>
        <div className={s.widgetAmount}>10</div>
      </div>
      <div className={classNames(s.widgetWrapper, s.widgetGraph)}>
        <div className={s.widgetTitle}>График по месяцам</div>
      </div>
    </div>
  )
}

export default Dashboard
