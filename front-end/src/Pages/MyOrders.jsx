import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import CardOrder from '../Components/CardOrder';
import { getUser } from '../Utils/LocalStorage';
import { getOrders } from '../Utils/axios';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { id } = getUser();
    const request = async () => {
      const response = await getOrders(`/customer/orders/${id}`);
      setOrders(response);
    };
    request();
  }, []);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ml-20 mt-10 mr-20">
        {
          orders.map((e) => (
            <CardOrder
              key={ e.id }
              id={ e.id }
              status={ e.status }
              saleDate={ e.saleDate }
              totalPrice={ e.totalPrice }
            />
          ))
        }
      </div>
    </>
  );
}
MyOrders.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default MyOrders;
