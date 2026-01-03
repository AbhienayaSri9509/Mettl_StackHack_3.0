# Quick Start Guide

Get the Carbon Credits Marketplace up and running in 5 minutes!

## Option 1: Docker (Recommended - Easiest)

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. **Start everything with Docker**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Seed the database** (in a new terminal)
   ```bash
   docker exec -it carbon-credits-backend-dev node seed.js
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

That's it! 🎉

## Option 2: Local Development

### Prerequisites
- Node.js 18+ installed
- MongoDB running (or use Docker: `docker run -d -p 27017:27017 mongo:7`)

### Steps

1. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install && cd ..
   cd frontend && npm install && cd ..
   ```

2. **Set up environment**
   ```bash
   # Create backend/.env file
   echo "PORT=5000
   MONGODB_URI=mongodb://localhost:27017/carbon-credits
   NODE_ENV=development" > backend/.env
   ```

3. **Seed the database**
   ```bash
   cd backend
   node seed.js
   cd ..
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## What's Included

✅ 8 sample carbon credit projects
✅ Full filtering system (category, country, VERRA, price, SDG goals)
✅ Project detail pages
✅ Statistics dashboard
✅ Responsive design
✅ Docker configuration

## Next Steps

- Check out the [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment guides
- Customize projects in `backend/seed.js`
- Modify the UI in `frontend/src/`

## Troubleshooting

**Port already in use?**
- Change ports in `backend/.env` and `frontend/vite.config.js`

**MongoDB connection failed?**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `backend/.env`

**Docker issues?**
- Make sure Docker is running
- Try: `docker-compose -f docker-compose.dev.yml down -v` then restart

Happy coding! 🚀

