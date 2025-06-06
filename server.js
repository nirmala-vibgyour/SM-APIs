require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const routeSchool = require('./routes/routeSchool');

const app = express();

app.use(express.json());

app.use('/api', routeSchool);

// Connect to DB and Listen to port
sequelize.sync()
    .then(()=>{
        console.log('DB Synced!!');
        const PORT = process.env.PORT;
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('DB sync failed!!', err);
        process.exit(1);
    });
