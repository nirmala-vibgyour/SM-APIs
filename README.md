# School Management APIs

A RESTful API built using **Node.js**, **Express.js**, and **MySQL** to manage school data. It allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## Features

- Add a new school with name, address, and coordinates  
- List schools sorted by proximity to a given location  
- Calculates geographical distances using the Haversine formula  
- Input validation for all fields

## How to use??

- /api/addSchool : to add school
    `Sample body`:
    {
    "name": "Oceanview International",
    "address": "89 Seaside Blvd, Coast City",
    "latitude": 48.8566,
    "longitude": 2.3522
    }

- /api/listSchools?latitude=22.5&longitude=88.3
    : to get the list of all the Schools sorted and their distances in km.

## Deployed on Railway

---

