const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    create
};

async function create(req, res) {
    try {
        // 1) create the user
        const user = await User.create(req.body);
        // 2) create the jwt by passing in the user info for the jwt payload
        const token = createJWT(user); // creates a "JSON" webtoken
        // 3) send the new jwt to the client using res.json
        res.json(token);
    } catch (error) {
        // if error, we'll send the error to the client
        res.status(400).json(error);
    }
}


function createJWT(user) {
    return jwt.sign({ user }, process.env.SECRET, {expiresIn: '24h'});
    // jwt.sign() is a special method that does two things:
    // 1) creates a json web token with the provided payload, server secret and optional settings
    // 2) crytographically signs the token with the provided secret so it can be validated later
}
