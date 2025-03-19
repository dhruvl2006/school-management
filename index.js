import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import Database from 'better-sqlite3';

const app = express();
const port = process.env.PORT || 3000;
const db = new Database('schools.db');

// Middleware
app.use(express.json());
app.use(cors());

// Database initialization
db.exec(`
  CREATE TABLE IF NOT EXISTS schools (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
  )
`);

// Validation schemas
const schoolSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

const locationSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
});

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Add School API
app.post('/addSchool', (req, res) => {
    try {
        const school = schoolSchema.parse(req.body);

        const stmt = db.prepare(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)'
        );

        const result = stmt.run(
            school.name,
            school.address,
            school.latitude,
            school.longitude
        );

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Invalid input data'
        });
    }
});

// List Schools API
app.get('/listSchools', (req, res) => {
    try {
        const userLocation = locationSchema.parse({
            latitude: Number.parseFloat(req.query.latitude),
            longitude: Number.parseFloat(req.query.longitude)
        });

        const schools = db.prepare('SELECT * FROM schools').all();

        // Add distance to each school and sort by distance
        const schoolsWithDistance = schools.map(school => ({
            ...school,
            distance: calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                school.latitude,
                school.longitude
            )
        }));

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json({
            schools: schoolsWithDistance.map(school => ({
                ...school,
                distance: Math.round(school.distance * 100) / 100 // Round to 2 decimal places
            }))
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Invalid location parameters'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`School Management API running on port ${port}`);
});