const { query } = require('express-validator');

exports.validateLocation = [

    query('latitude')
        .notEmpty().withMessage('Latitude is required!')
        .isFloat({min: -90, max: 90}).withMessage('Latitude must be between -90 and 90!'),
    
    query('longitude')
        .notEmpty().withMessage('Longitude is required!')
        .isFloat({min: -180, max: 180}).withMessage('Longitude must be between -180 and 180!'),
];