const dbConnect = require('../database/database.connect');
const Sequelize = require('sequelize');

const User = dbConnect.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    surname: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    login: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },

    subordinate: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: []
    },

    permission : {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            isIn: [["user", "boss", "admin"]]
        },
        defaultValue: "user"
    }
})

module.exports = User;