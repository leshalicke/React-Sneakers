import React from "react";
import Card from "../components/Card";
import axios from 'axios'

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://634fe02cdf22c2af7b5c879b.mockapi.io/order');
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false);
      } catch(error){
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })()
  }, [])
  return(
    <div className="content">
        <div className="content-info">
          <h1>Мои заказы</h1>
        </div>
        <div className="sneakers">
        {(isLoading ? [...Array(9)] : orders).map((item, index) => (
            <Card 
            key={index}
            loading = {isLoading}
            {...item}
            />
          ))}
        </div>
      </div>
  )
};

export default Orders;