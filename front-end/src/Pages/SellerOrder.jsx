import React, { useEffect, useState } from 'react';
import CardSeller from '../Components/CardSeller';
import Navbar from '../Components/Navbar';
import { getUser } from '../Utils/LocalStorage';
import { getOrders } from '../Utils/axios';

function SellerOrder() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const { id } = getUser();
    const request = async () => {
      const response = await getOrders(`/orders/sales/${id}`);
      setSales(response);
    };
    request();
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ml-20 mt-10 mr-20">
        {
          sales.map((e) => (
            <CardSeller
              key={ e.id }
              id={ e.id }
              status={ e.status }
              saleDate={ e.saleDate }
              totalPrice={ e.totalPrice }
              deliveryAddress={ e.deliveryAddress }
              deliveryNumber={ e.deliveryNumber }
            />

          ))
        }
      </div>
    </>
  );
}

export default SellerOrder;
