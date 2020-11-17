const express = require('express');
const app = express();
const User = require('../UserModel');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwtIssuer = require('../utils/jwtIssuer');

router.post('/register' , async(request, response)=> {
    const { name , email , password}  = request.body;
 
    const data = await User.findOne({ email : email });
    if(data){
        errors.push({msg : 'Email already exists'});
        return response.status(500).send({  errors  });
    }
    
    const hash = await bcrypt.hash(password,10);

    const newUser = new User({
        name, 
        email, 
        hash
    });
        
        await newUser.save();
        response.send({ msg : 'User is registered '})
});

router.post('/login', (request, response) => {
    const { email, password } = request.body;

    User.findOne({email: request.body.email})
    .then((user) => {
        if (user === null){
            response.status(404)('User does not exist');
        } else {
            bcrypt.compare(request.body.password, user.hash, (err, valid) => {
                if (err) throw err;

                if (valid) {
                    console.log(request.body);
                    response.status(401).send('Access denied, please log in!')
                }
            })
            const token = jwtIssuer(user);
            response.send(token);
        }
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router; // export router from user.js 
