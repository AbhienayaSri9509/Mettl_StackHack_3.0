# Setup Instructions for Local Development

## Step 1: MongoDB Setup (Choose One Option)

### Option A: MongoDB Atlas (Cloud - Recommended for Quick Start)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carbon-credits?retryWrites=true&w=majority
   ```
   Replace `username` and `password` with your Atlas credentials.

### Option B: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. MongoDB usually runs automatically as a Windows service
4. If not, start it manually:
   ```powershell
   # Navigate to MongoDB bin directory (usually)
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   mongod.exe
   ```

**Or use Chocolatey:**
```powershell
choco install mongodb
```

## Step 2: Seed the Database

Once MongoDB is running (local or Atlas), seed the database:

```powershell
cd backend
node seed.js
```

You should see: "Seeded 8 projects"

## Step 3: Start the Application

From the root directory:

```powershell
npm run dev
```

This will start both backend (port 5000) and frontend (port 3000).

## Step 4: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## Troubleshooting

### MongoDB Connection Issues

**If using MongoDB Atlas:**
- Make sure your IP is whitelisted in Atlas (Network Access)
- Check your connection string is correct
- Ensure username/password are correct

**If using Local MongoDB:**
- Make sure MongoDB service is running
- Check if port 27017 is available
- Try: `netstat -an | findstr 27017` to check if MongoDB is listening

### Port Already in Use

If port 5000 or 3000 is in use:
- Change `PORT` in `backend/.env`
- Change port in `frontend/vite.config.js`

### Module Not Found Errors

Reinstall dependencies:
```powershell
cd backend
npm install
cd ../frontend
npm install
```

## Quick Test

Test the API directly:
```powershell
# Health check
curl http://localhost:5000/api/health

# Get projects
curl http://localhost:5000/api/projects
```

Or open in browser:
- http://localhost:5000/api/projects

