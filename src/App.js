import React from "react";
import axios from "axios"
import Cart from "./components/Cart";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get('https://634fe02cdf22c2af7b5c879b.mockapi.io/cart'),
            axios.get('https://634fe02cdf22c2af7b5c879b.mockapi.io/Favorites'),
            axios.get('https://634fe02cdf22c2af7b5c879b.mockapi.io/items')
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://634fe02cdf22c2af7b5c879b.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error)
    }
  };

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    try {
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://634fe02cdf22c2af7b5c879b.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://634fe02cdf22c2af7b5c879b.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    } catch (error) {
      alert('Проблема с корзиной');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://634fe02cdf22c2af7b5c879b.mockapi.io/Favorites/${obj.id}`);
        setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://634fe02cdf22c2af7b5c879b.mockapi.io/Favorites', obj);

        setFavorites(prev => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в Избранное');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{
      items, onAddToFavorite, onAddToCart,
      cartItems, favorites, isItemAdded, setCartOpened, setCartItems
    }}>
      <div className="wrapper">
        <Cart items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/React-Sneakers/"
            element={<Home items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading} />} />
          <Route path="favorites"
            element={<Favorites items={favorites}
              onAddToFavorite={onAddToFavorite} />} />
          <Route path="orders"
            element={<Orders items={favorites}
              onAddToFavorite={onAddToFavorite} />} />
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
