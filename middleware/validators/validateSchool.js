const { body } = require('express-validator');

exports.validateSchool = [
    body('name')
        .notEmpty().withMessage('Name is required!')
        .isString().withMessage('Name must be a string!'),

    body('address')
        .notEmpty().withMessage('Address is required!')
        .isString().withMessage('Address must be a string!'),

    body('latitude')
        .notEmpty().withMessage('Latitude is required!')
        .isFloat({min: -90, max: 90}).withMessage('Latitude must be between -90 and 90!'),
    
    body('longitude')
        .notEmpty().withMessage('Longitude is required!')
        .isFloat({min: -180, max: 180}).withMessage('Longitude must be between -180 and 180!'),
];