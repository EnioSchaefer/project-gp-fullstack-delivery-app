import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import mountClassName from '../Utils/mountClassName';

function CardSeller({ id, status, saleDate,
  totalPrice }) {
  const data = new Date(saleDate);
  const dia = data.getDate();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const formatedData = `${dia.toString().padStart(2, '0')}/${mes}/${ano}`;

  return (
    <Link to={ `/seller/orders/${id}` } className="flex h-24 shadow w-full p-2 bg-white rounded-lg">
      <div className="flex flex-wrap items-center w-2/4 h-full">
        <p
          data-testid={ `seller_orders__element-order-id-${id}` }
          className="w-full text-center"
        >
          Pedido
          <br />
          {id.toString().padStart(4, '0')}
        </p>
      </div>
      <div className={ mountClassName('flex flex-wrap items-center w-4/6 h-full rounded-lg', status) }>
        <p
          data-testid={ `seller_orders__element-delivery-status-${id}` }
          className="w-full text-center"
        >
          {status}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full h-full">
        <p
          data-testid={ `seller_orders__element-order-date-${id}` }
          className="bg-gray-300 rounded-lg p-1 w-5/6 text-center"
        >
          {formatedData}
        </p>
        <p
          data-testid={ `seller_orders__element-card-price-${id}` }
          className="bg-gray-300 rounded-lg p-1 w-4/6 text-center"
        >
          R$
          {' '}
          {(totalPrice).replace('.', ',')}
        </p>
      </div>
    </Link>
  );
}

CardSeller.propTypes = {
  id: PropTypes.number,
  saleDate: PropTypes.Date,
  status: PropTypes.string,
  totalPrice: PropTypes.string,
  devliveryAdress: PropTypes.number,
  deliveryNumber: PropTypes.number,
}.isRequired;

export default CardSeller;
