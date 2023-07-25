import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { checkoutOrder, getSellers, setToken } from '../Utils/axios';
import Input from './Input';

function Checkout() {
  const [sellerId, setSellerId] = useState(2);
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const history = useHistory();

  const products = JSON.parse(localStorage.getItem('cartItems')) || [];
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const sumPrices = products.reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0);

  useEffect(() => {
    const requestSellers = async () => {
      const response = await getSellers('/orders/sellers');
      return setSellers(response);
    };
    requestSellers();
  }, []);

  async function finishOrder() {
    setToken(userInfo.token);
    const orderInfo = {
      sellerId,
      status: 'Pendente',
      deliveryAddress: address,
      deliveryNumber: number,
      totalPrice: sumPrices,
      products,
    };

    try {
      const order = await checkoutOrder('/orders/finish', orderInfo);

      history.push(`/customer/orders/${order.id}`);
      // localStorage.removeItem('cartItems');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center bg-gray-200 w-6/12 p-6">
        <h2 className="text-center font-semibold text-3xl mb-2">Detalhes e Endereço de Entrega</h2>
        <div>
          <form className="space-y-6">
            <div className="flex justify-evenly mt-2">
              <label
                htmlFor="input-seller"
                className="text-sm font-semibold leading-6 text-gray-900 text-center place-self-center"
              >
                P. Vendedora Responsável:
                {' '}
              </label>
              <select
                data-testid="customer_checkout__select-seller"
                onChange={ ({ target }) => setSellerId(target.value) }
                id="input-seller"
              >
                { sellers.map(({ id, name }, index) => (
                  <option key={ index } value={ id }>{ name }</option>
                )) }
              </select>
            </div>
            <div>
              <Input
                type="text"
                id="input-address"
                label="Endereço: "
                dataTestid="customer_checkout__input-address"
                onChange={ ({ target }) => setAddress(target.value) }
                labelClass="block text-sm font-semibold leading-6 text-gray-900"
                divClass="mt-2"
                inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <Input
                type="text"
                id="input-number"
                label="Número: "
                dataTestid="customer_checkout__input-address-number"
                onChange={ ({ target }) => setNumber(target.value) }
                labelClass="block text-sm font-semibold leading-6 text-gray-900"
                divClass="mt-2"
                inputClass="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex justify-center w-full mt-5">
              <button
                data-testid="customer_checkout__button-submit-order"
                type="button"
                className="w-56 h-11 text-white bg-green-600 rounded-full baseline hover:bg-green-500"
                onClick={ () => finishOrder() }
              >
                Finalizar Pedido - R$
                {' '}
                {sumPrices.toFixed(2).replace('.', ',')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
