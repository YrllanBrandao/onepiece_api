const Character = require("./character")
const express = require('express');
const Router = express.Router();
const { Op } = require('sequelize');
const multer = require("multer");
const path = require('path');
const slugify = require('slugify');






//multer
const filefilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
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
}, filefilter);


//Routes
Router.get('/character/:name', (req, res) => {


    const name = req.params.name;
    const param = `%${name}`;
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

module.exports = Router;