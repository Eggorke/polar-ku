import * as React from 'react'
import s from './styles.module.scss'

interface WaveProps {
  message: string
}

const WavedText = (props: WaveProps) => {
  const { message } = props
  return (
    <div className={s.waveTitle}>
      <span>{message}</span>
      <span>{message}</span>
    </div>
  )
}

export default WavedText
