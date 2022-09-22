const Character = require("./character")
const express = require('express');
const Router = express.Router();
const { Op } = require('sequelize');
const multer = require("multer");
const path = require('path');
const slugify = require('slugify');






//multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/onepiece/character')
    },
    filename: (req, file, cb) => {
        const regex = /\./g;
        cb(null, slugify(req.body.portugueseName.toLowerCase().replace(regex, '')) + '-' + file.fieldname + '.png')

    }
})

const upload = multer({
    storage, limits: {
        fileSize: '5MB'//5MB,
    }
});


//Routes
//getting all characters
Router.get("/characters", (req,res)=>{

    Character.findAll().then(characteres =>{
        if(characteres[0] === null)
        {
            res.status(404).send("EMPTY")
        }
        else{
            res.status(200).json(characteres)
        }
    })
})

//finding character by name

Router.get('/character/:name', (req, res) => {


    const name = req.params.name;
    const param = `%${name}%`;
    Character.findAll({
        where: {
            portugueseName: {
                [Op.like]: param
            }
        }
    }).then(character => {

        if (character[0] === undefined) {
            res.status(404).send('character not found');
        } else {
            res.status(200).json(character);
        }
    })

})

// creating characters

Router.post('/character', upload.fields([{ name: 'beforeTimeSkipPicture' }, { name: 'afterTimeSkipPicture' }]), async (req, res) => {
    const regex = /\./g;
    const { portugueseName, beforeTimeSkipPicture, afterTimeSkipPicture, ...character} = await req.body;
    const beforeTimeSkipPic =  slugify(portugueseName).toLowerCase().replace(regex, '')+ '-' + 'beforeTimeSkipPicture.png'
    const afterTimeSkipPic = slugify(portugueseName).toLowerCase().replace(regex, '')+'-' + 'afterTimeSkipPicture.png'


    const name = portugueseName.toLowerCase();
    Character.create({ portugueseName: name, beforeTimeSkipPicture: beforeTimeSkipPic, afterTimeSkipPicture: afterTimeSkipPic, ...character})
        .then(result => {
            res.status(200).send('created!')
        })
        .catch(error => {
            console.log(error);
        })

    
})

//delete character by id
Router.delete('/character/:id', (req, res) => {


    const id = req.params.id;
   
    Character.findOne({
        where: {
            id
        }
    }).then(character =>{
        if(character === null)
        {
            res.status(400).send("INVALID ID");
        }
        else{
            Character.destroy({
                where: {
                        id
                }
            }).then(desut => {
               
                
                    res.status(200).json({
                        'response': 'The character was deleted!'
                    });
                
            })
        }
    })

});
//updating by id
//updating the fruit by id
Router.put('/character/:id', upload.fields([{ name: 'beforeTimeSkipPicture' }, { name: 'afterTimeSkipPicture' }]),(req, res) => {


    const {...others} = req.body;


    const id = req.params.id;
   
    Character.findOne({
        where: {
            id
        }
    }).then(character =>{
        if(character === null)
        {
            res.status(400).send("INVALID ID");
        }
        else{
            
            Character.update({...others},{
                where: {
                        id
                }
            }).then(result => {
               
                
                    res.status(200).json({
                        'response': 'The character was updated!'
                    });
                
            })
        }
    })

});
module.exports = Router;