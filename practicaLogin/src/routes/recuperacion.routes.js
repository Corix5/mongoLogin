const {Router} = require('express');
const router = Router();

const { renderRecuperacion, updatePassword} = require('../controllers/recuperacion.controller');


router.get('/recuperacion/:id', renderRecuperacion);

router.put('/recuperacion/:id', updatePassword);

module.exports = router;

