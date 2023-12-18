import express from 'express';
import { comparePassword, hashPassword } from '../bcrypt';
import { Account, accounts, Login, ResObj } from '../databases/databases';

// CREATE ACCOUNTS ROUTER
const router = express.Router();

// POST SIGNUP
router.post('/signup', async (req, res) => {
    const credentials: Account = req.body;

    let resObj: ResObj = {
        success: true,
    }

    // check if username already exists in database
    const usernameExist = await accounts.find({
        username: credentials.username
    })

    // if username exists, set success = false
    if (usernameExist.length > 0) {
        resObj.success = false;
    } else {   // if username is available ...
        // hash password 
        const hashedPassword = await hashPassword(credentials.password);
        // update credentials object
        credentials.password = hashedPassword;
        // insert into database
        accounts.insert(credentials);
    };

    res.json(resObj);

});

// POST LOGIN
router.post('/login', async (req, res) => {
    const login: Login = req.body;

    let resObj: ResObj = {
        success: false,
    }

    // check if account with provided username exists
    const account = await accounts.find({
        username: login.username
    })

    // if it does, check if provided password matches with account password
    if (account.length > 0) {
        const correctPassword = await comparePassword(login.password, account[0].password);

        if (correctPassword) {
            resObj.success = true;
        }
    }

    res.json(resObj);
});

module.exports = router;