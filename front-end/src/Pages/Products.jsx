import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import { productsRequest } from '../Utils/axios';
import { getProductsCart, getUser } from '../Utils/LocalStorage';

export default function Products({ history }) {
  const [isLogged, setIsLogged] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [cartProduct, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editionCount, setEditionCount] = useState(0);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.token) return setIsLogged(true);
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      const products = await productsRequest('/customer/products');
      return setDataProducts(products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const cart = getProductsCart() || [];
    setCartProducts(cart);
  }, [editionCount]);

  useEffect(() => {
    const total = cartProduct
      .reduce((acc, { price, quantity }) => acc + (Number(price) * Number(quantity)), 0);
    setTotalPrice(total.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  }, [cartProduct]);

  return (
    <div>
      {isLogged && <Redirect to="/login" />}
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {dataProducts.map(({ id, name, price, urlImage }) => (
            <ProductCard
              key={ id }
              id={ id }
              productName={ name }
              price={ price }
              urlImage={ urlImage }
              forceRender={ setEditionCount }
            />
          ))}
        </div>
      </section>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ cartProduct.length === 0 }
        className="fixed bottom-12 right-12 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Ver carrinho: R$
        <span data-testid="customer_products__checkout-bottom-value">
          {' '}
          {totalPrice}
        </span>
      </button>
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.func,
}.isRequired;
