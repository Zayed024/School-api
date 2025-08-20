
const express = require('express');
require('dotenv').config(); 

const db = require('./db'); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('School Management API is running! ');
});



// API Endpoint to Add a New School
app.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // 1. Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields (name, address, latitude, longitude) are required.' });
        }
        if (typeof latitude !== 'number' || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers.' });
        }

        // 2. Database Insertion
        const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(sql, [name, address, latitude, longitude]);

        // 3. Send Response
        res.status(201).json({
            message: 'School added successfully!',
            schoolId: result.insertId
        });

    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Failed to add school to the database.' });
    }
});



// API Endpoint to List Schools by Proximity
app.get('/listSchools', async (req, res) => {
    try {
        const { lat, lon } = req.query;

        // 1. Validation
        if (!lat || !lon) {
            return res.status(400).json({ error: 'User latitude (lat) and longitude (lon) are required as query parameters.' });
        }
        const userLat = parseFloat(lat);
        const userLon = parseFloat(lon);
        if (isNaN(userLat) || isNaN(userLon)) {
             return res.status(400).json({ error: 'Invalid latitude or longitude format.' });
        }

        // 2. Database Query with Haversine Formula
        // This SQL query calculates the distance and sorts by it.
        // 6371 is the Earth's radius in kilometers.
        const sql = `
            SELECT id, name, address, latitude, longitude,
                ( 6371 * acos(
                    cos( radians(?) )
                    * cos( radians( latitude ) )
                    * cos( radians( longitude ) - radians(?) )
                    + sin( radians(?) )
                    * sin( radians( latitude ) )
                ) ) AS distance
            FROM schools
            ORDER BY distance ASC;
        `;

        const [schools] = await db.execute(sql, [userLat, userLon, userLat]);

        // 3. Send Response
        res.status(200).json(schools);

    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ error: 'Failed to fetch schools from the database.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});