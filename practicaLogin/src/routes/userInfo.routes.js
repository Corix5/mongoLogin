const {Router} = require('express');
const router = Router();

const { renderUserInfo } = require('../controllers/userInfo.controller');

router.get('/userInfo', renderUserInfo);
module.exports = router;