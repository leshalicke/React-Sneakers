import React from 'react'
import { AppContext } from '../App';
import s from '../components/Cart/Cart.module.css'

const Info = ({image, title, description}) => {
  const {setCartOpened} = React.useContext(AppContext)
  return (
    <div className={s.cartEmpty}>
          <img width={120}  src={image} alt='Empty' />
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={() => setCartOpened(false)} className={s.greenButton}>
            <img src='../img/arrow.svg' alt='Arrow' />
            Вернуться назад
          </button>
        </div>
  )
}

export default Info;
