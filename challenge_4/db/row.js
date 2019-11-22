// jshint esversion:6
const Sequelize = require('sequelize');
const sequelize = new Sequelize('connectfour', 'austinliu', null, {
    dialect: 'mysql'
});

const row = sequelize.define('rows', {
    col1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col2: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col3: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col4: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col5: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col6: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    col7: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = row;

