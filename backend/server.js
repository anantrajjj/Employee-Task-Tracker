const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./app/routes/auth');
const taskRoutes = require('./app/routes/tasks');
const employeeRoutes = require('./app/routes/employees');
const dashboardRoutes = require('./app/routes/dashboard');
const { authenticate } = require('./app/middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/tasks', authenticate, taskRoutes);
app.use('/api/employees', authenticate, employeeRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});