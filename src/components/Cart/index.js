import React from 'react';
import s from '../Cart/Cart.module.css';
import Info from '../Info';
import axios from 'axios';
import { useCart } from '../hook/useCart';

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

function Cart({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://634fe02cdf22c2af7b5c879b.mockapi.io/order', {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://634fe02cdf22c2af7b5c879b.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert('Ошибка при создании заказа :(');
    }
    setIsLoading(false);
  };


  return (
    <div className={`${s.overlay} ${opened ? s.overlayVisible : ''}`}>
      <div className={s.drawer}>
        <h2>Корзина<img onClick={onClose} className={s.cartItemRemove} src="https://i.ibb.co/h9FrVbd/delete.png" alt="Close" />
        </h2>

        {items.length > 0 ? ( <><div className={s.items}>
          {items.map((obj) => (
            <div key={obj.id} className={s.cartItem}>
              <div style={{ backgroundImage: `url(${obj.image})` }} className={s.cartItemImg}></div>
              <div>
                <p>{obj.name}</p>
                <b>${obj.price} руб.</b>
              </div>
              <img onClick={() => onRemove(obj.id)} 
              className={s.cartItemRemove} src="https://i.ibb.co/h9FrVbd/delete.png" alt="Remove" />
            </div>
          ))
          }
        </div>
        <div className={s.cartBlock}>
        <ul className={s.cartTotalBlock}>
          <li className={s.cartFooter}>
            <span>Итого:</span>
            <div></div>
            <b>{totalPrice} руб.</b>
          </li>
          <li className={s.cartFooter}>
            <span>Налог 5%:</span>
            <div></div>
            <b>{totalPrice / 100 * 5} руб.</b>
          </li>
        </ul>
        <button disabled={isLoading} onClick={onClickOrder} className={s.designBtn}>Оформить заказ <img src="https://i.ibb.co/HdMQCmQ/arrow.png" /></button>
      </div> </> ) : (<Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
                            description={isOrderComplete ? `Ваш заказ № ${orderId} будет передан курьерской службе` : "Добавьте хотя бы что-то" }
                            image={isOrderComplete ? "https://i.ibb.co/cv59PJ1/logo.png" : 'https://i.ibb.co/ryjm8zR/empty-cart.jpg'} />
        )
      }

        
        

        
      </div>
    </div>
  )
}
export default Cart;