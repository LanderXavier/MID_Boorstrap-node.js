const Orders = require('../models/orders'); // Correct import

exports.createorders = async (req, res) => {
  console.log('Data received in backend:', req.body); // Debugging line

  const { customer, seller, productName, date, quantity, price, status, userId } = req.body;

  if (!customer) {
    return res.status(400).json({ error: 'Customer field is required' }); // Validation check
  }

  try {
    const order = await Orders.create({
      customer,
      seller,
      productName,
      date,
      quantity,
      price,
      status,
      user_id: userId, // Match the foreign key field
    });
    res.status(201).json({ order });
  } catch (err) {
    console.error('Error creating order:', err.message);
    console.error('Error details:', err);
    res.status(400).json({ error: 'Error creating order', details: err.message });
  }
};

exports.getorderss = async (req, res) => {
  try {
    const orderss = await Orders.findAll(); // Asegúrate de que la base de datos esté conectada
    res.status(200).json({ orderss });
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ error: 'Error fetching orders', details: err.message });
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la orden desde los parámetros
  try {
    const order = await Orders.findByPk(id); // Buscar la orden por su ID
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.destroy(); // Eliminar la orden
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err.message);
    res.status(500).json({ error: 'Error deleting order', details: err.message });
  }
};

