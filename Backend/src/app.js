const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const hackathonRoutes = require('./routes/hackathon.routes');

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://hackathon-registration-portal-peach.vercel.app',
        'https://hackathon-registration-portal-pmel2q4ng-sanvi23.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Code-A-Nova Backend is running!');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hackathon', hackathonRoutes);

module.exports = app;