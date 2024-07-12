const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
// const helmet = require('helmet');
// const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin')
const errorRoutes = require('./routes/error404');


// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(helmet({ contentSecurityPolicy: false }));
// app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 4000

app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use(errorRoutes);
// console.log(process.env.CONNECTION_STRING)
mongoose.connect(process.env.CONNECTION_STRING)
    .then((result) => {
        app.listen(port, () => {
            console.log(`*********************Port is running at port ${port}****************************`);
        });
    })
    .catch((err) => {
        console.log(err);
    });



