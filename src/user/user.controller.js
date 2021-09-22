const Router = require('express').Router;
const log = require('../logger/logger.connect');
const userService = require('./user.service');
const router = Router();
const auth = require('basic-auth')


//REGISTRATION
router.post('/registration/:root?', async (req, res) => {
    try {
        log.debug("user.controller.js: Register user req.body= ", req.body, "\n", "root = ", req.params.root)
        if (!Object.values(req.body).length) return res.status(400).json({message: "Bad Request"});

        const user = await userService.registration(req.body, req.params.root)

        if (!user) return res.status(400).json({message: "Bad Request"});
        log.debug("user.controller.js: Register user= ", user);

        return res.status(201).json({message: "success", root: user.permission, data: user.token});
    } catch (error) {
        log.error("user.controller.js: Register user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//LOGIN IN SYSTEM
router.get('/login', async (req, res) => {
    try {
        log.debug("user.controller.js: login user req = ", req.headers.authorization)

        const login = await userService.login(auth(req))

        if (!login) return res.status(404).json({message: "Not found"});
        log.debug("user.controller.js: login user= ", login.token);

        return res.status(200).json({message: "successful login", root: login.permission, data: login.token});
    } catch (error) {
        log.error("user.controller.js: login user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//GET USERS BY ROOT
router.get('/', async (req, res) => {
    try {
        log.debug("user.controller.js: get user req = ", req.headers.authorization)

        const findUsers = await userService.findUsers(auth(req))
        if (!findUsers) return res.status(404).json({message: "Not found"});
        log.debug("user.controller.js: get user = ", findUsers);

        return res.status(200).json({message: "success", data: findUsers});
    } catch (error) {
        log.error("user.controller.js: get user error= ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

//CREATE OR CHANGE BOSS FROM USER BY ADMIN
router.put('/', async (req, res) => {
    try {
        log.debug("user.controller.js: Create boss req.body = ", req.body)
        if (!Object.values(req.body).length) return res.status(400).json({message: "Bad Request"});

        const boss = await userService.updateBoss(auth(req), req.body)

        if (!boss) return res.status(400).json({message: "Bad Request"});
        log.debug("user.controller.js: Create boss = ", boss);

        return res.status(201).json({message: "success"});
    } catch (error) {
        log.error("user.controller.js: Create boss error = ", error);
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;