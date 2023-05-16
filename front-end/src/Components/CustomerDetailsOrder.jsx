import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from './Button';
import { getOrderInfo, updateOrderStatus } from '../Utils/axios';

export default function CustomerDetailsOrder() {
  const [orderInfo, setOrderInfo] = useState(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    if (orderInfo) setIsLoading(false);
  }, [orderInfo]);

  const checkOrderDelivered = async () => {
    setIsDeliveredBtnDisabled(true);
    await updateOrderStatus(
      `/orders/update/${orderId}`,
      { status: 'Entregue' },
    );
    const newOrderInfo = { ...orderInfo, status: 'Entregue' };
    setOrderInfo(newOrderInfo);
  };

  if (isLoading) return <p>Carregando...</p>;
  return (
    <div>
      <p>Detalhe do Pedido</p>
      <div>
        <div>
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido ${orderId};`}
          </span>
          <span
            data-testid={ sellerNameId }
          >
            {`P. Vend: ${orderInfo.seller.name}`}
          </span>
          <span
            data-testid={ dateId }
          >
            {orderInfo.saleDate}
          </span>
          <span
            data-testid={ statusId }
          >
            {orderInfo.status}
          </span>
          <Button
            id="deliver_order"
            onClick={ () => checkOrderDelivered() }
            text="MARCAR COMO ENTREGUE"
            dataTestId="customer_order_details__button-delivery-check"
            disabled={ isDeliveredBtnDisabled }
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {orderInfo.products.map((p, i) => (
            <tr key={ i }>
              <th
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}
              </th>
              <th
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                {p.name}
              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {p.SalesProducts.quantity}
              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${i}`
                }
              >
                {p.price}
              </th>
              <th
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {(Number(p.price) * p.SalesProducts.quantity).toFixed(2)}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-testid="customer_order_details__element-order-total-price">
        {orderInfo.totalPrice.replace('.', ',')}
      </div>
    </div>
  );
}
