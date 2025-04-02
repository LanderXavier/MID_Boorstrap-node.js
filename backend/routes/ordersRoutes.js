const express = require('express');
const authenticateToken = require("../middleware/authMiddleware"); 
const { createorders, getorderss, deleteOrder } = require('../controllers/ordersController');
const router = express.Router();

router.post('/orderss', authenticateToken, createorders);
router.get('/orderss', authenticateToken, getorderss);
router.delete('/orderss/:id', authenticateToken, deleteOrder); // Nueva ruta para eliminar

module.exports = router;
