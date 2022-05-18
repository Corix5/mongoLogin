const userInfoCtrl = {};
const User = require('../models/User');

userInfoCtrl.renderUserInfo = async (req, res)=>{
    const users = await User.findById().lean();
    res.render('userInfo/userInfo', {users});
};

module.exports = userInfoCtrl;