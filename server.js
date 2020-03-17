const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

const roomRouter = require('./routes/rooms');
const hostelRouter = require('./routes/hostel');
const hostlerRouter = require('./routes/hostler');
const mealsRouter = require('./routes/meals');
const notificationRouter = require('./routes/notification');
const complaintRouter = require('./routes/complaint');
const attendanceRouter = require('./routes/attendance');

//middlewares
app.use(bodyParser.json());
app.use(cors());

//routes
app.use('/api/rooms', roomRouter);
app.use('/api/hostel', hostelRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/hostler', hostlerRouter);
app.use('/api/complaint', complaintRouter);
app.use('/api/meals', mealsRouter);
app.use('/api/notification', notificationRouter);


app.get("/api", (req, res) => {
    res.json({ "status": 200, "message": "API Server has been started and running successfully..." });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

module.exports = app;