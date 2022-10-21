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
          <img width={40} height={40} src="../img/logo.png" />
          </Link>
          <div className={s.headerInfo}>
            <h3>React Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <div>
          <ul className={s.headerRight}>
            <li onClick={props.onClickCart}>
              <img  width={18} height={18} src="../img/cart.svg" alt='Корзина' />
              <span>{totalPrice} руб</span>
            </li>
            <li> 
              <Link to ='/favorites'>
                <img width={18} height={18} src="../img/like.svg" alt='Избранное' />
              </Link> 
              </li>
              <li> 
              <Link to ='/orders'>
              <img width={18} height={18} src="../img/user.svg" alt='Users' />
              </Link> 
              </li>
          </ul>
        </div>
      </header>
  )
}

export default Header;