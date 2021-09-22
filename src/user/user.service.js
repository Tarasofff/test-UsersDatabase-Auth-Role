const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDto = require('./user.dto');
const adminDto = require('./user.admin.dto');
const bossDto = require('./user.boss.dto');

//create user or admin
const registration = async (body, root) => {
    const hashPassword = await bcrypt.hash(body.password, 5)
    const user = new userDto(await User.create({
        name: body.name,
        surname: body.surname,
        login: body.login,
        password: hashPassword,
        permission: root === "admin" ? "admin" : "user"
    }))
    const {id, login, name, surname, permission} = user;
    const token = jwt.sign({id, login, name, surname, permission}, process.env.JWT_ACCESS, {expiresIn: "24h"})
    return {user, token, permission}
}

//login in system
const login = async auth => {
    const user = await findOneByLogin(auth.name)
    const validPassword = await bcrypt.compare(auth.pass, user.password)
    if (!validPassword) return "Incorrect password"
    const {id, login, permission, name, surname,} = user;
    const token = jwt.sign({id, login, name, surname,}, process.env.JWT_ACCESS, {expiresIn: "24h"})
    return {user, token, permission}
}

//find one user by login
const findOneByLogin = async user => {
    const data = new userDto(await User.findOne({where: {login: user}}))
    if (data.permission === "admin") return new adminDto(await User.findOne({where: {login: user}}))
    if (data.permission === "boss") return new bossDto(await User.findOne({where: {login: user}}))
    return data;
}

//find users by root
const findUsers = async auth => {
    const find = await login(auth)
    if (find.user.permission === "admin") return findAll()
    if (find.user.permission === "boss") return {id: find.user.id, subordinate: find.user.subordinate}
    return findOneByLogin(find.user.login)
}

//find all for admin
const findAll = async () => {
    const array = []
    const users = await User.findAll({raw: true});
    users.map(item => {
        if (item.permission === "admin") array.push(new adminDto(item))
        if (item.permission === "user") array.push(new userDto(item))
        if (item.permission === "boss") array.push(new bossDto(item))
    })
    return array;
}

//create or change boss
const updateBoss = async (auth, body) => {
    const loginData = await login(auth)
    const userData = new userDto(await User.findOne({where: {id: body.userId}}))

    if (userData.permission === "admin") return false
    if (loginData.user.permission === "admin") await User.update({
        permission: "boss",
        subordinate: body.subordinate
    }, {where: {id: userData.id}})
    if (loginData.user.permission === "boss") {
        let difference = loginData.user.subordinate.filter(x => body.subordinate.indexOf(x) === -1);
        await User.update({
            permission: "boss",
            subordinate: difference
        }, {where: {id: loginData.user.id}})
        await User.update({
            permission: "boss",
            subordinate: body.subordinate
        }, {where: {id: userData.id}})
    }
    return true
}

module.exports = {
    registration,
    login,
    findOneByLogin,
    findUsers,
    updateBoss
}