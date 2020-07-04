const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv/config');

// Middleware 
app.use(cors()); // https://expressjs.com/en/resources/middleware/cors.html
app.use(bodyParser.json());

// Routes
const authRoute = require('./routes/auth');
const pagesRoute = require('./routes/pages');

app.get('/', (req, res) => {
    res.json({test: 'Hello worlds start this is a plan'});
});

app.use('/user', authRoute);
app.use('/pages',pagesRoute);



// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db')
);

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));