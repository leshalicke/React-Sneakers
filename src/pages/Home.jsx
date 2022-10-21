import React from "react";
import { AppContext } from "../App";
import Card from "../components/Card";

function Home({items, 
              searchValue, 
              setSearchValue, 
              onChangeSearchInput, 
              onAddToFavorite, 
              onAddToCart,
              isLoading}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.name
          .toLowerCase().includes(searchValue.toLowerCase()));

    return (isLoading 
            ? [...Array(9)] 
            : filtredItems)
      .map((item, index) => (
        <Card 
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onAddCart={(obj) => onAddToCart(obj)}
        loading = {isLoading}
        {...item}
        />
      ))
  }
  
  return(
    <div className="content">
        <div className="content-info">
          <h1>{searchValue ? `Поиск по запросу:"${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src="../img/search.svg" alt="Search" />
            { searchValue && <img onClick={() => setSearchValue('')} 
              className="cartItemRemove" src="../img/delete.svg" alt="Remove" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="sneakers">
          {renderItems()}
        </div>
      </div>
  )
};

export default Home;