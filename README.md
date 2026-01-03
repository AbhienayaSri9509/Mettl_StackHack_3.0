# Mettl_StackHack_3.0

# Carbon Credits Marketplace

An online marketplace for carbon credits, similar to CarbonMark, where users can browse, filter, and purchase carbon credits from various projects around the world.
Github Link: https://github.com/AbhienayaSri9509/Mettl_StackHack_3.0
Drive Link : https://drive.google.com/drive/folders/1WgrDt-Li2olu5ibGiSOI_O4Y6ZrHGyOR?usp=drive_link 
Deployment Link : https://mettl-stack-hack-3-0-iota.vercel.app/

## Features

- **Project Listings**: Browse carbon credit projects with detailed information
- **Advanced Filtering**: Filter by category, country, VERRA certification, price range, and SDG goals
- **Project Details**: Comprehensive project information including:
  - Price per credit
  - Project category (Infrastructure, Forestry, Renewable Energy, etc.)
  - SDG goals fulfilled
  - Project location
  - VERRA certification status
- **Statistics Dashboard**: View marketplace statistics and insights
- **Responsive Design**: Modern, mobile-friendly UI built with React and Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- RESTful API architecture

### Frontend
- **React 18** with React Router
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Axios** for API calls

### Deployment
- **Docker** and **Docker Compose** for containerization
- Multi-stage builds for optimized production images

## Project Structure

```
carbon-credits-marketplace/
├── backend/
│   ├── models/
│   │   └── Project.js          # MongoDB schema
│   ├── routes/
│   │   └── projects.js         # API routes
│   ├── server.js               # Express server
│   ├── seed.js                 # Database seeding script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml          # Production Docker setup
├── docker-compose.dev.yml      # Development Docker setup
├── Dockerfile                  # Production Dockerfile
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (or use Docker)
- Docker and Docker Compose (for containerized deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbhienayaSri9509/Mettl_StackHack_3.0.git
   cd Mettl_StackHack_3.0
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   
   Create `backend/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/carbon-credits
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   If you have MongoDB installed locally:
   ```bash
   mongod
   ```
   
   Or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:7
   ```

5. **Seed the database** (optional)
   ```bash
   cd backend
   node seed.js
   ```

6. **Start the development servers**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   Or start them separately:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Docker Deployment

### Development with Docker

1. **Start all services**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Seed the database** (in a new terminal)
   ```bash
   docker exec -it carbon-credits-backend-dev node seed.js
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Deployment

1. **Build and start services**
   ```bash
   docker-compose up --build -d
   ```

2. **Seed the database**
   ```bash
   docker exec -it carbon-credits-backend node seed.js
   ```

3. **Access the application**
   - Application: http://localhost:5000
   - API: http://localhost:5000/api

### Docker Commands

- **View logs**: `docker-compose logs -f`
- **Stop services**: `docker-compose down`
- **Stop and remove volumes**: `docker-compose down -v`
- **Rebuild**: `docker-compose up --build`

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects (with filters)
  - Query parameters:
    - `category`: Filter by category
    - `country`: Filter by country
    - `verraCertified`: Filter by VERRA certification (true/false)
    - `minPrice`: Minimum price per credit
    - `maxPrice`: Maximum price per credit
    - `sdgGoal`: Filter by SDG goal number (1-17)
    - `search`: Search in name and description
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 12)

- `GET /api/projects/:id` - Get single project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats/summary` - Get marketplace statistics

### Health Check

- `GET /api/health` - API health check

## Project Categories

- Infrastructure
- Forestry
- Renewable Energy
- Agriculture
- Waste Management
- Water Management
- Other

## SDG Goals

The application supports all 17 UN Sustainable Development Goals:
1. No Poverty
2. Zero Hunger
3. Good Health
4. Quality Education
5. Gender Equality
6. Clean Water
7. Affordable Energy
8. Decent Work
9. Industry Innovation
10. Reduced Inequalities
11. Sustainable Cities
12. Responsible Consumption
13. Climate Action
14. Life Below Water
15. Life on Land
16. Peace & Justice
17. Partnerships

## VERRA Certification

Projects can be VERRA certified, which indicates they meet the Verified Carbon Standard (VCS) requirements. VERRA certified projects include a VERRA Project ID.

## Deployment Options

### Option 1: Traditional Server Deployment

1. **Set up a server** (Ubuntu/Debian recommended)
2. **Install Node.js, MongoDB, and Nginx**
3. **Clone the repository**
4. **Build the frontend**: `cd frontend && npm run build`
5. **Set up environment variables**
6. **Start MongoDB service**
7. **Start the backend**: `cd backend && npm start`
8. **Configure Nginx** to serve the frontend and proxy API requests

### Option 2: Cloud Platform Deployment

#### Heroku

1. Create Heroku apps for backend and frontend
2. Add MongoDB Atlas as addon
3. Set environment variables
4. Deploy using Git

#### AWS/GCP/Azure

1. Use container services (ECS, Cloud Run, Container Instances)
2. Deploy using Docker images
3. Set up managed MongoDB (Atlas, DocumentDB, etc.)
4. Configure load balancers and auto-scaling

### Option 3: Docker Swarm / Kubernetes

1. Use `docker-compose.yml` as base
2. Convert to Kubernetes manifests or Docker Swarm stack
3. Deploy to cluster
4. Set up persistent volumes for MongoDB
5. Configure ingress/load balancer

## Environment Variables

### Backend

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

### Frontend

- `VITE_API_URL`: Backend API URL (default: http://localhost:5000/api)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on the repository.
