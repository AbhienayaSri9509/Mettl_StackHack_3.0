import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import projectRoutes from './routes/projects.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'public')));
}

// Routes
app.use('/api/projects', projectRoutes);

// Seed route (for initial database setup)
// Supports both GET and POST for easy access
app.get('/api/seed', async (req, res) => {
  try {
    const { seedDatabase } = await import('./seed.js');
    const result = await seedDatabase();
    
    res.json({ 
      success: true,
      message: `✅ Successfully seeded ${result.count} premium carbon credit projects!`,
      projectsCount: result.count,
      timestamp: new Date().toISOString(),
      note: 'Database is now populated. Refresh your homepage to see all projects.'
    });
  } catch (error) {
    console.error('Seed endpoint error:', error);
    res.status(500).json({ 
      success: false,
      message: '❌ Error seeding database',
      error: error.message 
    });
  }
});

app.post('/api/seed', async (req, res) => {
  try {
    const { seedDatabase } = await import('./seed.js');
    const result = await seedDatabase();
    
    res.json({ 
      success: true,
      message: `✅ Successfully seeded ${result.count} premium carbon credit projects!`,
      projectsCount: result.count,
      timestamp: new Date().toISOString(),
      note: 'Database is now populated. Refresh your homepage to see all projects.'
    });
  } catch (error) {
    console.error('Seed endpoint error:', error);
    res.status(500).json({ 
      success: false,
      message: '❌ Error seeding database',
      error: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Carbon Credits Marketplace API is running' });
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  });
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carbon-credits');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;

