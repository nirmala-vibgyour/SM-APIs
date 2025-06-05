const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { validateSchool } = require('../middleware/validators/validateSchool');
const { validateLocation } = require('../middleware/validators/validateLocation');


router.post('/addSchool', validateSchool, schoolController.addSchool);
router.get('/listSchools', validateLocation, schoolController.listSchools);

module.exports = router;