// const { validationResult } = require('express-validator');
// const { School } = require('../models'); // Adjust if needed

// // Haversine formula to compute distance in kilometers
// function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Earth radius in kilometers
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
// }

// function deg2rad(deg) {
//     return deg * (Math.PI / 180);
// }

// exports.listSchools = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const userLat = parseFloat(req.query.latitude);
//         const userLon = parseFloat(req.query.longitude);

//         if (isNaN(userLat) || isNaN(userLon)) {
//             return res.status(400).json({ error: 'Invalid latitude or longitude' });
//         }

//         const schools = await School.findAll();

//         const schoolsWithDistance = schools.map(school => {
//             const distance = getDistanceFromLatLonInKm(
//                 userLat,
//                 userLon,
//                 school.latitude,
//                 school.longitude
//             );

//             return {
//                 id: school.id,
//                 name: school.name,
//                 address: school.address, // ✅ included
//                 latitude: school.latitude,
//                 longitude: school.longitude,
//                 distanceInKm: parseFloat(distance.toFixed(2)) // Rounded to 2 decimal places
//             };
//         });

//         // Sort by ascending distance
//         schoolsWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);

//         return res.status(200).json({
//             userLocation: {
//                 latitude: userLat,
//                 longitude: userLon
//             },
//             totalSchools: schoolsWithDistance.length,
//             sortedSchools: schoolsWithDistance
//         });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Server error' });
//     }
// };


const { validationResult } = require('express-validator');
const { School } = require('../models');
const { getDistanceFromLatLonInKm } = require('../utils/geoUtils');

exports.listSchools = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }

    try {
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

        // Sort by ascending distance
        schoolsWithDistance.sort((a, b) => a.distanceInKm - b.distanceInKm);

        return res.status(200).json({
            userLocation: { latitude: userLat, longitude: userLon },
            totalSchools: schoolsWithDistance.length,
            sortedSchools: schoolsWithDistance
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};
