const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin')
const errorRoutes = require('./routes/error404');


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 4000

app.use('/home', homeRoutes);
app.use('/admin', adminRoutes);
app.use(errorRoutes);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0mrcjbt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then((result) => {
        app.listen(port, () => {
            console.log(`*********************Port is running at port ${port}****************************`);
        });
    })
    .catch((err) => {
        console.log(err);
    });



