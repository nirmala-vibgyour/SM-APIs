const { validationResult } = require('express-validator')
const School = require('../models/school');
const { getDistanceFromLatLonInKm } = require('../utils/geoUtils');

exports.addSchool = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { name, address, latitude, longitude } = req.body;

        const newSchool = new School({name, address, latitude, longitude});
        await newSchool.save();

        res.status(201).json({message: 'School added successfully!', school: newSchool});

    } catch (err) {
        console.error('Add School Error:', err);
        res.status(500).json({error:'Failed to add school'});
    }
};

exports.listSchools = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:erros.array()});
    }
    
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({error: 'Invalid latitude or longitude'});
        }

        const schools = await School.findAll();

        const schoolsWithDistance = schools.map(school => {
            const distance = getDistanceFromLatLonInKm(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );
            return {
                id: school.id,
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distanceInKm: parseFloat(distance.toFixed(2))
            };
        });

        schoolsWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);

        return res.status(200).json({
            userLocation: {
                latitude: userLat,
                longitude: userLon,
            },
            totalSchools: schoolsWithDistance.length,
            sortedSchools: schoolsWithDistance
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Server error' });
    }

};

