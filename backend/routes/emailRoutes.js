const express = require('express');
const router = express.Router();
const EmailControl = require('../control/EmailControl.js');

router.post('/enviar-email', EmailControl.enviarEmail);

module.exports = router;
