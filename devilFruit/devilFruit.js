const Connection = require('../database/database');
const Sequelize = require('sequelize');





const DevilFruit = Connection.define('devilfruit', {
    picture:{
        type:Sequelize.STRING,
        // defaultValue: 'https://i.postimg.cc/1XNjfL24/placeholder.webp'
        allowNull:false
    },
    japaneseName:{
        type: Sequelize.STRING,
        defaultValue: "",
    },
    portugueseName:{
        type: Sequelize.STRING,
        defaultValue: "",
    },
    englishName:{
        type: Sequelize.STRING,
        defaultValue: "",
        
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
