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
    console.log(id);
    const request = async () => {
      const response = await getOrders(`/customer/orders/${id}`);
      setOrders(response);
    };
    request();
  }, []);
  return (
    <div>
      <Navbar />
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
  );
}
MyOrders.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default MyOrders;
