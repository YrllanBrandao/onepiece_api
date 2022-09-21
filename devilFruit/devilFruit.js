const Connection = require('../database/database');
const Sequelize = require('sequelize');





const DevilFruit = Connection.define('devilfruit', {
    picture:{
        type:Sequelize.STRING,
        defaultValue: './src/onepiece/devilfruit/placeholder.svg'
    },
    japaneseName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    portugueseName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    englishName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    meaning:{
        type: Sequelize.STRING,
        allowNull: false  
    },
    currentUser:{

        type: Sequelize.STRING,
        allowNull: false
        
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    resume:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

DevilFruit.sync({force:false});


module.exports = DevilFruit;
