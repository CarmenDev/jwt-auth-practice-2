const express = require('express');
const app = express();
const User = require('../UserModel');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register' , async(request, response)=> {
    const { name , email , password}  = request.body;
 
    const data = await User.findOne({ email : email });
    if(data){
        errors.push({msg : 'Email already exists'});
       return  response.status(500).send({  errors  });
    }
    const newUser = new User({
        name, 
        email, 
        password
    });
    await bcrypt.hash(password,10,(err, hash)=> {
            if (err) throw err;
            console.log('hashed pass : ',hash);
            newUser.password = hash;
            console.log(newUser.password)
    
        });
        
        await newUser.save();
        response.send({ msg : 'User is registered '})
});

router.post('/login', (request, response) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user === null){
            response.status(404)('User does not exist');
        } else {
            bcrypt.compare(req.body.hash, user.hash, (err, valid) => {
                if (err) throw err;

                if (valid) {
                    console.log(req.body);
                    res.status(401).send('Access denied, please log in!')
                }
            })
        }
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router; // export router from user.js 
