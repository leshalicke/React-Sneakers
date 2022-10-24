import React from 'react';
import s from '../Header/Header.module.css';
import {Link} from 'react-router-dom';
import { useCart } from '../hook/useCart';


function Header (props) {
  const { totalPrice } = useCart();
  return (
    <header>
        <div className={s.headerLeft}>
        <Link to ='/'>
          <img src="https://i.ibb.co/cv59PJ1/logo.png" width={40} height={40}  />
          </Link>
          <div className={s.headerInfo}>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <div>
          <ul className={s.headerRight}>
            <li onClick={props.onClickCart}>
              <img  width={18} height={18} src="https://i.ibb.co/RjWz4rq/cart.png" alt='Корзина' />
              <span>{totalPrice} руб</span>
            </li>
            <li> 
              <Link to ='/favorites'>
                <img width={18} height={18} src="https://i.ibb.co/fYCG9np/like.png" alt='Избранное' />
              </Link> 
              </li>
              <li> 
              <Link to ='/orders'>
              <img width={18} height={18} src="https://i.ibb.co/y6y5730/user.png" alt='Users' />
              </Link> 
              </li>
          </ul>
        </div>
      </header>
  )
}

export default Header;