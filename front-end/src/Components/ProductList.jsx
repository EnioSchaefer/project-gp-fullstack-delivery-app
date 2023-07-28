import React, { useEffect, useState } from 'react';
import { getProductsCart, removeProduct } from '../Utils/LocalStorage';
import Checkout from './Checkout';

export default function ProductList() {
  const [cartProduct, setCartProducts] = useState([]);
  useEffect(() => {
    const cart = getProductsCart() || [];
    setCartProducts(cart);
  }, []);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="py-3">
          <h1 className="text-center text-4xl mb-4 p-4 bg-indigo-200 rounded-full">Verifique os dados do seu pedido</h1>
          <table className="border-2 shadow">
            <thead className="bg-white border-b">
              <tr>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Item</th>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Descrição</th>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Quantidade</th>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Valor Unitário</th>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Sub-Total</th>
                <th className="font-medium text-gray-900 px-6 py-4 text-left">Remover</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {cartProduct.map((product, index) => (
                <tr key={ product.id } className="bg-gray-100 border-b-0">
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                    className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-center bg-gray-100"
                  >
                    {index + 1}
                  </td>

                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                    className="text-gray-900 font-light px-6 py-4 whitespace-nowrap bg-white"
                  >
                    {product.productName}
                  </td>

                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                    className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                  >
                    {product.quantity}
                  </td>

                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                    className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-white"
                  >
                    R$
                    {' '}
                    {(product.price).replace('.', ',')}
                  </td>

                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                    className="text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                  >
                    R$
                    {' '}
                    {(product.price * product.quantity).toFixed(2).replace('.', ',')}
                  </td>

                  <td
                    data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                    className="bg-white"
                  >
                    <div className="flex justify-center align-center">
                      <button
                        type="button"
                        onClick={ () => { setCartProducts(removeProduct(product.id)); } }
                        className="w-20 h-8 text-white bg-red-600 rounded-full baseline hover:bg-red-500"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Checkout />
    </>
  );
}
