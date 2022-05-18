const {Router} = require('express');
const router = Router();

const { renderEmailForm, emailForm} = require('../controllers/email.controller')

router.get('/email', renderEmailForm);

router.post('/email', emailForm);

module.exports = router;