const Router = require('express').Router;
const router = Router();
const userController = require('../user/user.controller');

router.use('/user', userController);

module.exports = router;