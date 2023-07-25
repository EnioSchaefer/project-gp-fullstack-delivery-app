const OrderService = require('../services/OrderService');

const checkoutOrder = async (req, res) => {
  try {
    const { id } = req.userData;
    const orderInfo = req.body;
    orderInfo.userId = id;
    const { message } = await OrderService.checkoutOrder(orderInfo);
  
    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSellers = async (req, res) => {
  try {
    const { message } = await OrderService.getSellers();
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = await OrderService.getOrders(id);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getSalesFromSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = await OrderService.getSellersId(id);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

 const getOrder = async (req, res) => {
  try {
    const { id: rawId } = req.params;
    const id = Number(rawId);
   const { message } = await OrderService.getOrder(id);
   return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
 };

 const updateOrderStatus = async (req, res) => {
  try {
    const { id: rawId } = req.params;
    const id = Number(rawId);
    const { status } = req.body;

    const { message } = await OrderService.updateOrderStatus(id, status);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json(error.message);
  }
 };

module.exports = { 
  checkoutOrder,
  getSellers,
  getOrder,
  getSales,
  updateOrderStatus,
  getSalesFromSeller,
};
