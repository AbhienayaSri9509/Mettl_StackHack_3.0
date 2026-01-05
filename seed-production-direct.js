/**
 * Direct MongoDB Seeding Script for Production
 * 
 * This script connects directly to your MongoDB Atlas database
 * and seeds it with 57 premium carbon credit projects.
 * 
 * Usage:
 * 1. Set your MongoDB URI in backend/.env or as environment variable
 * 2. Run: node seed-production-direct.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import Project model and seed data
const Project = (await import('./backend/models/Project.js')).default;
const { projects } = await import('./backend/seed.js');

dotenv.config({ path: './backend/.env' });

const MONGODB_URI = process.env.MONGODB_URI || process.argv[2];

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is required');
  console.log('');
  console.log('Usage:');
  console.log('  node seed-production-direct.js');
  console.log('  (Make sure MONGODB_URI is set in backend/.env)');
  console.log('');
  console.log('Or:');
  console.log('  node seed-production-direct.js "mongodb+srv://..."');
  process.exit(1);
}

const seedProduction = async () => {
  try {
    console.log('🌱 Starting production database seed...');
    console.log('📡 Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log('');

    console.log('🧹 Clearing existing projects...');
    await Project.deleteMany({});
    console.log('✅ Cleared existing projects');
    console.log('');

    console.log('📦 Inserting projects...');
    await Project.insertMany(projects);
    console.log(`✅ Successfully seeded ${projects.length} premium projects!`);
    console.log('');

    // Statistics
    const countries = [...new Set(projects.map(p => p.location.country))];
    const categories = [...new Set(projects.map(p => p.category))];
    const verraCount = projects.filter(p => p.verraCertified).length;

    console.log('📊 Database Statistics:');
    console.log(`   🌍 Countries: ${countries.length}`);
    console.log(`   📂 Categories: ${categories.length}`);
    console.log(`   ✅ VERRA Certified: ${verraCount}`);
    console.log(`   💰 Price Range: $${Math.min(...projects.map(p => p.pricePerCredit)).toFixed(2)} - $${Math.max(...projects.map(p => p.pricePerCredit)).toFixed(2)}`);
    console.log('');

    console.log('🎉 Database seeding completed successfully!');
    console.log('🌐 Your marketplace is now ready with all projects!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedProduction();

