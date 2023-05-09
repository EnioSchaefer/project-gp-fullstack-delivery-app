const OrderService = require('../services/OrderService');

const checkoutOrder = async (req, res) => {
  const { id } = req.userData;
  const orderInfo = req.body;
  orderInfo.userId = id;
  console.log(orderInfo);
  
  const { message } = await OrderService.checkoutOrder(orderInfo);
  
    return res.status(201).json(message);
};

const getSellers = async (req, res) => {
  const { message } = await OrderService.getSellers();
  return res.status(200).json(message);
 };

module.exports = { checkoutOrder, getSellers };