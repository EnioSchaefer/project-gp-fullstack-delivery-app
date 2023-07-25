import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import { getOrderInfo, updateOrderStatus } from '../Utils/axios';
import mountClassName from '../Utils/mountClassName';

export default function CustomerDetailsOrder() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeliveredBtnDisabled, setIsDeliveredBtnDisabled] = useState(true);
  const { id: orderId } = useParams();
  const sellerNameId = 'customer_order_details__element-order-details-label-seller-name';
  const dateId = 'customer_order_details__element-order-details-label-order-date';
  const statusId = 'customer_order_details__element-order-details-label-delivery-status';

  const requestOrder = async () => {
    const order = await getOrderInfo(`/orders/getOrder/${orderId}`);
    if (order.status === 'Em Trânsito') { setIsDeliveredBtnDisabled(false); }
    setOrderInfo(order);
  };

  useEffect(() => {
    requestOrder();
  }, [orderId]);

  useEffect(() => {
    if (orderInfo) setIsLoading(false);
  }, [orderInfo]);

  const checkOrderDelivered = async () => {
    setIsDeliveredBtnDisabled(true);
    setUpdatingStatus(true);
    const updatedStatus = await updateOrderStatus(
      `/orders/update/${orderId}`,
      { status: 'Entregue' },
    );
    const newOrderInfo = { ...orderInfo, status: updatedStatus };
    setOrderInfo(newOrderInfo);
    setUpdatingStatus(false);
  };

  if (isLoading) return <p>Carregando...</p>;
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-8 mt-5 p-4 bg-white p-2 rounded-full baseline">Detalhes do Pedido</h1>
      <div className="flex w-8/12 justify-evenly mb-5 bg-white rounded-full p-4">
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
          className="text-lg bg-purple-200 p-2 rounded-full baseline"
        >
          {`Pedido ${orderId.toString().padStart(4, '0')}`}
        </p>
        <p
          data-testid={ sellerNameId }
          className="text-lg bg-indigo-200 p-2 rounded-full baseline"
        >
          {`P. Vend: ${orderInfo.seller.name}`}
        </p>
        <p
          data-testid={ dateId }
          className="text-lg bg-purple-200 p-2 rounded-full baseline"
        >
          {orderInfo.saleDate}
        </p>
        <p
          data-testid={ statusId }
          className={ mountClassName('text-lg p-2 rounded-full baseline', orderInfo.status) }
        >
          {updatingStatus ? '...' : orderInfo.status}
        </p>
        <Button
          id="deliver_order"
          onClick={ () => checkOrderDelivered() }
          text="MARCAR COMO ENTREGUE"
          dataTestId="customer_order_details__button-delivery-check"
          disabled={ isDeliveredBtnDisabled }
          buttonClass="text-white bg-green-800 p-2 rounded-full baseline disabled:bg-opacity-75 enabled:hover:bg-green-500"
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="py-3">
          <table className="border-2 shadow">
            <thead className="bg-white border-b">
              <tr>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Item</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Descrição</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Quantidade</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Valor Unitário</th>
                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Sub-total</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orderInfo.products.map((p, i) => (
                <tr key={ i } className="bg-gray-100 border-b-0">
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-item-number-${i}`
                    }
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center bg-gray-100"
                  >
                    {i + 1}
                  </td>
                  <td
                    data-testid={ `customer_order_details__element-order-table-name-${i}` }
                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap bg-white"
                  >
                    {p.name}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${i}`
                    }
                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                  >
                    {p.SalesProducts.quantity}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-unit-price-${i}`
                    }
                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-white"
                  >
                    R$
                    {' '}
                    {p.price.replace('.', ',')}
                  </td>
                  <td
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${i}`
                    }
                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center bg-gray-100"
                  >
                    R$
                    {' '}
                    {(Number(p.price) * p.SalesProducts.quantity).toFixed(2).replace('.', ',')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        data-testid="customer_order_details__element-order-total-price"
        className="flex justify-center"
      >
        <p
          className="w-48 h-14 text-lg flex justify-center items-center text-white bg-green-600 rounded-full"
        >
          Total: R$
          {' '}
          {orderInfo.totalPrice.replace('.', ',')}
        </p>
      </div>
    </div>
  );
}
