const express = require('express');
const Router = express.Router();
const User = require("./user");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv/config');
const bcrypt = require('bcrypt');

//auth

Router.post("/authentication", async (req,res)=>{
    const {email, password} = req.body;

    User.findOne({
        where:{
            email
        }
    }).then(user =>{
        if(user === null || user === undefined)
        {
            res.status(400).send("authentication failed, verify your information!");
        }
        else{
            const correct = bcrypt.compareSync(password, user.password)

            if(correct)
            {
               const token = jwt.sign({
                    email
                }, process.env.JWTSECRET, {expiresIn: '2d'});
                
                res.status(200).json({
                    'acessToken': token
                })
            }
        }
    })

})
//creating user

Router.post("/user",  (req, res)=>{

    const {email, password} =  req.body;
   
    if(email === undefined || password === undefined)
    {
        res.status(400).send("field empty");
    }

    //hashing password before save at database
    const rounds = 10;
    const salt = bcrypt.genSaltSync(rounds);
    const passwordHashed = bcrypt.hashSync(password, salt)
    User.create({
        email,
        password: passwordHashed
    }).then(user =>{

        res.status(200).send("User created!")
    })

});

//deleting user 

Router.delete("/user/:id", (req, res)=>{

   const id =req.params.id;

   User.fidnOne({
    where: {
        id
    }
   }).then(user =>{

    if(user ===  null)
    {
        res.status(400).send("the user don't exists")
    }
    else{
        User.destroy({
            where:{
                id
            }
        }).then(result =>{
            res.status(200).send("user deleted!")
        })
    }
   })

});


//updating user
Router.put("/user/:id", async (req, res)=>{

    const {email, password} =  req.body;
    const id = req.params.id;

    if(email === undefined || password === undefined)
    {
        res.status(400).send("field empty");
    }

    //hashing password before save at database
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    User.update({
        email,
        password: passwordHashed
    },{
        where:{
            id
        }
    }).then(user =>{

        res.status(200).send("User updated!")
    })

});

module.exports = Router;