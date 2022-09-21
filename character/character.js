const Connection = require('../database/database');
const Sequelize = require('sequelize');


const Character = Connection.define('character',{
    // japaneseName:{
    //     type: Sequelize.STRING,
    //     allowNull:false
    // },
    // romanizedName:{
    //     type:  Sequelize.STRING,
    //     defaultValue: ''
    // },
    portugueseName:{
        type: Sequelize.STRING,
        allowNull:false
    },
    devilFruit:{
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue: ''
    },
    beforeTimeSkipPicture:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    afterTimeSkipPicture:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    father:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    mother:{
        type: Sequelize.STRING,
        defaultValue: ''
    },
    origin:{
        type:  Sequelize.STRING,
        defaultValue: ''
    },
    bounty:{
        type:  Sequelize.STRING,
        defaultValue: ''
    },
    resume:{
        type:  Sequelize.TEXT,
        defaultValue: ''
    }
    
})

Character.sync({force:false});


module.exports = Character

