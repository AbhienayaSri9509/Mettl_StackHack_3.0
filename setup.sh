#!/bin/bash

echo "🚀 Setting up Carbon Credits Marketplace..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create backend .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env file..."
    cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carbon-credits
NODE_ENV=development
EOF
    echo "✅ Created backend/.env"
else
    echo "ℹ️  backend/.env already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running (or use Docker: docker run -d -p 27017:27017 mongo:7)"
echo "2. Seed the database: cd backend && node seed.js"
echo "3. Start the app: npm run dev"
echo ""
echo "Or use Docker: docker-compose -f docker-compose.dev.yml up --build"

