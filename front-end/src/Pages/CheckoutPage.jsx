import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { getUser } from '../Utils/LocalStorage';
import ProductList from '../Components/ProductList';

function CheckoutPage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
      <Navbar />
      <ProductList />
    </div>
  );
}

export default CheckoutPage;
