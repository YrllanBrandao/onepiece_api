const DevilFruit = require('./devilFruit');
const express = require('express');
const Router = express.Router();
const { Op } = require('sequelize');
const path = require('path');
const slugify = require('slugify');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const middleware = require("../middleware/jwt")

//multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/onepiece/devilFruit')
    },
    filename: (req, file, cb) => {
        const regex = /\./g;
       
        cb(null, slugify(req.body.portugueseName.toLowerCase().replace(regex, ''))  + '.png')

    }
})

const upload = multer({
    storage, limits: {
        fileSize: '5MB'//5MB,
    }
});

/*
---------------------------
    DEVIL FRUIT ROUTES
---------------------------
*/


//finding all fruits
Router.get('/devilfruits', middleware, (req, res) => {

    

    DevilFruit.findAll().then(devilFruit => {
       
        if (devilFruit[0] === undefined) {
            res.status(404).send("don't exists devil fruits");
        } else {
            res.status(200).json(devilFruit);
        }
    })

});

//creating devil fruit
Router.post('/devilfruit', upload.single("picture"), async (req, res) => {
 

    const {portugueseName, ...character} = await req.body;

    
    const regex = /\./g;
    const picturePath = `${portugueseName.toLowerCase().replace(regex, '')}.png`;
    const name =  portugueseName.toLowerCase();

   
    DevilFruit.create({picture: picturePath,portugueseName:name,...character})
        .then(result => {
            res.status(200).send('created!')
        })
        .catch(error => {
            console.log(error);
        })

    
});

//find devil fruit by name
Router.get('/devilfruit/:name', (req, res) => {


    const name = req.params.name;
    const param = `%${name.toLowerCase()}%`;
    DevilFruit.findAll({
        where: {
            portugueseName: {
                [Op.like]: param
            }
        }
    }).then(devilFruit => {
        console.log(devilFruit[0])
        if (devilFruit[0] === undefined) {
            res.status(404).send('Devil fruit not found');
        } else {
            res.status(200).json(devilFruit);
        }
    })

});

//deleting devil fruit by name

Router.delete('/devilfruit/:id',(req, res) => {


    const id = req.params.id;
   
    DevilFruit.findOne({
        where: {
            id
        }
    }).then(devilfruit =>{
        if(devilfruit === null)
        {
            res.status(400).send("INVALID ID");
        }
        else{
            DevilFruit.destroy({
                where: {
                        id
                }
            }).then(devilFruit => {
               
                
                    res.status(200).json({
                        'response': 'devil fruit was deleted!'
                    });
                
            })
        }
    })

});

//updating the fruit by id
Router.put('/devilfruit/:id', upload.single('picture'),(req, res) => {


    const {...others} = req.body;


    const id = req.params.id;
   
    DevilFruit.findOne({
        where: {
            id
        }
    }).then(devilfruit =>{
        if(devilfruit === null)
        {
            res.status(400).send("INVALID ID");
        }
        else{
            
            DevilFruit.update({...others},{
                where: {
                        id
                }
            }).then(devilFruit => {
               
                
                    res.status(200).json({
                        'response': 'devil fruit was updated!'
                    });
                
            })
        }
    })

});


module.exports = Router;