/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { addProductCart, getProductsCart } from '../Utils/LocalStorage';

export default function ProductCard(product) {
  const { id, productName, price, urlImage, forceRender } = product;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => addProductCart({ ...product, quantity }), [quantity]);
  const changeCart = async ({ target }) => {
    const products = getProductsCart() || [];
    if (target.name === 'add') {
      const productFromCart = products
        .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
      productFromCart.quantity = quantity;
      forceRender((prev) => prev + 1);
      return setQuantity((prev) => Number(prev) + 1);
    }
    const productFromCart = products
      .find(({ id: idProd }) => idProd === id) || { ...product, quantity };
    productFromCart.quantity = quantity;
    forceRender((prev) => prev + 1);
    return setQuantity((prev) => Number(prev) - 1);
  };

  const handleChange = async ({ target }) => {
    setQuantity(Number(target.value));
    forceRender((prev) => prev + 1);
  };

  return (
    <div className="group shadow p-2 bg-white">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={ urlImage }
          alt={ productName }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="h-full w-full object-contain object-center group-hover:opacity-75"
        />
      </div>
      <h3
        data-testid={ `customer_products__element-card-title-${id}` }
        className="mt-4 text-sm text-gray-700"
      >
        {productName}
      </h3>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
        className="mt-1 text-lg font-medium text-gray-900"
      >
        R$
        {' '}
        { Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
      </p>
      <div className="flex items-center border border-gray-200 rounded">
        <Button
          onClick={ changeCart }
          dataTestId={ `customer_products__button-card-rm-item-${id}` }
          disabled={ quantity <= 0 }
          nameButton="sub"
          text="-"
          buttonClass="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        />
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          name="input_card_quantity"
          onChange={ handleChange }
          id={ `product-${id}` }
          min="0"
          value={ quantity }
          className="border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          onClick={ changeCart }
          dataTestId={ `customer_products__button-card-add-item-${id}` }
          disable={ false }
          nameButton="add"
          text="+"
          buttonClass="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
        />
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  productName: PropTypes.string,
  urlImage: PropTypes.string,
  forceRender: PropTypes.func,
}.isRequired;
