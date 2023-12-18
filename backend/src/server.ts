import express from 'express';
import cors from 'cors';

// import routers
const gallery = require('./routes/gallery');
const accounts = require('./routes/accounts');

// create app
const app = express();
const PORT = 1337;

// middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// GALLERY ROUTER
app.use('/gallery', gallery);

// ACCOUNTS ROUTER
app.use('/accounts', accounts);


// start server
app.listen(PORT, () => {
    console.log('Server now running on port ', PORT);
});

