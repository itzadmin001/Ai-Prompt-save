const bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt
const jwt = require('jsonwebtoken');

const GenrateToken = (email, id) => {
    return jwt.sign(
        { email, id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}


const GenrateHash = (password) => {
    return new Promise((res, rej) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                rej(err)
            } else {
                res(hash)
            }
        });
    })
}

module.exports = { GenrateHash, GenrateToken };