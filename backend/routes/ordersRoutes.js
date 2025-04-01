const express = require('express');
const authenticateToken = require("../middleware/authMiddleware"); 
const { createorders, getorderss } = require('../controllers/ordersController');
const router = express.Router();

router.post('/orderss', authenticateToken, createorders);
router.get('/orderss', authenticateToken, getorderss);

module.exports = router;
