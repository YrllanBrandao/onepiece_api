const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('src'))

//Controllers
const characterController = require('./character/characterController');



app.use('/', characterController);
app.get('/', (req,res)=>{

        res.send('working');
});


app.get('/picture/:name',  (req, res)=>{
    
    const image = req.params.name;
   
    const url = `${__dirname}/src/onepiece/character/${image}`;
    res.sendFile(url)

})



app.listen(PORT, ()=>{
    console.log('===on===');
});