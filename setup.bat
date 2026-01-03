@echo off
echo 🚀 Setting up Carbon Credits Marketplace...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install root dependencies
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
cd ..

REM Create backend .env file if it doesn't exist
if not exist backend\.env (
    echo 📝 Creating backend\.env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/carbon-credits
        echo NODE_ENV=development
    ) > backend\.env
    echo ✅ Created backend\.env
) else (
    echo ℹ️  backend\.env already exists
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Seed the database: cd backend ^&^& node seed.js
echo 3. Start the app: npm run dev
echo.
echo Or use Docker: docker-compose -f docker-compose.dev.yml up --build

