import React from 'react';
import s from '../Card/Card.module.css';
import ContentLoader from "react-content-loader";
import { AppContext } from '../../App';

function Card({ id, name, image, 
                price, onFavorite, onAddCart, 
                favorited = false,
                loading = false, parentId}) {

  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId :id, name, image, price}

  const onClickPlus = () => {
    onAddCart(obj)
  }

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={s.card}>
      {
        loading ? (<ContentLoader 
        speed={2}
        width={160}
        height={230}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
      </ContentLoader>) : (<>
      {onFavorite && <div className={s.favorite} onClick={onClickFavorite}>
        <img  src={isFavorite ? "https://i.ibb.co/dKNz3yP/heart-like.png" : "https://i.ibb.co/brHCjQS/heart-unlike.png"} alt="Favorite" />
      </div>}
      <img width='85%' height={150} src={image} alt="Sneakers" />
      <h5>{name}</h5>
      <div className={s.cardBottom}>
        <div>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
          {onAddCart && <img onClick={onClickPlus} width={11} height={11} 
          src= {isItemAdded(id) ? "https://i.ibb.co/8M7jk6G/ok.png" : "https://i.ibb.co/K6tBQQ4/plus.png"}  />}
      </div>
      </>)
      }
      
    </div>
  )
}

export default Card;