require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    'mysql://root:lbogUIhnVtvsSvJRygmc@mysql.railway.internal:3306/railway',
    {
        dialect:'mysql',
        logging:false,
    }
);

module.exports = sequelize;