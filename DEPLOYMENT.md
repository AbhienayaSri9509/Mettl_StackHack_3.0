# Deployment Guide

This guide provides detailed instructions for deploying the Carbon Credits Marketplace application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development](#local-development)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Platform Deployment](#cloud-platform-deployment)
5. [Production Checklist](#production-checklist)

## Prerequisites

- Node.js 18+ and npm
- MongoDB 5.0+ (or use MongoDB Atlas)
- Docker and Docker Compose (for containerized deployment)
- Git

## Local Development

### Step 1: Clone and Install

```bash
# Clone repository
git clone <repository-url>
cd mettl_stackhack_3.0

# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment

Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carbon-credits
NODE_ENV=development
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: Docker MongoDB**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### Step 4: Seed Database

```bash
cd backend
node seed.js
```

### Step 5: Start Application

**Option A: Concurrent (recommended)**
```bash
# From root directory
npm run dev
```

**Option B: Separate terminals**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 6: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Docker Deployment

### Development Mode

```bash
# Start all services
docker-compose -f docker-compose.dev.yml up --build

# Seed database (in new terminal)
docker exec -it carbon-credits-backend-dev node seed.js

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Mode

```bash
# Build and start
docker-compose up --build -d

# Seed database
docker exec -it carbon-credits-backend node seed.js

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

## Cloud Platform Deployment

### Heroku Deployment

#### Backend

1. **Create Heroku app**
   ```bash
   heroku create carbon-credits-api
   ```

2. **Add MongoDB Atlas**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

3. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=$(heroku config:get MONGODB_URI)
   ```

4. **Deploy**
   ```bash
   cd backend
   git subtree push --prefix backend heroku main
   ```

5. **Seed database**
   ```bash
   heroku run node seed.js
   ```

#### Frontend

1. **Create Heroku app**
   ```bash
   heroku create carbon-credits-app
   ```

2. **Set buildpack**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

3. **Set environment variables**
   ```bash
   heroku config:set VITE_API_URL=https://carbon-credits-api.herokuapp.com/api
   ```

4. **Deploy**
   ```bash
   cd frontend
   git subtree push --prefix frontend heroku main
   ```

### AWS Deployment

#### Using Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB**
   ```bash
   cd backend
   eb init -p node.js carbon-credits-api
   ```

3. **Create environment**
   ```bash
   eb create carbon-credits-env
   ```

4. **Set environment variables**
   ```bash
   eb setenv MONGODB_URI=<your-mongodb-uri> NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   eb deploy
   ```

#### Using ECS (Docker)

1. **Build and push Docker image**
   ```bash
   # Build image
   docker build -t carbon-credits-marketplace .

   # Tag for ECR
   docker tag carbon-credits-marketplace:latest <account-id>.dkr.ecr.<region>.amazonaws.com/carbon-credits:latest

   # Push to ECR
   docker push <account-id>.dkr.ecr.<region>.amazonaws.com/carbon-credits:latest
   ```

2. **Create ECS task definition**
   - Use the pushed image
   - Set environment variables
   - Configure port mappings

3. **Create ECS service**
   - Use the task definition
   - Configure load balancer
   - Set desired count

### Google Cloud Platform

#### Using Cloud Run

1. **Build and push image**
   ```bash
   # Build
   docker build -t gcr.io/<project-id>/carbon-credits .

   # Push
   docker push gcr.io/<project-id>/carbon-credits
   ```

2. **Deploy to Cloud Run**
   ```bash
   gcloud run deploy carbon-credits \
     --image gcr.io/<project-id>/carbon-credits \
     --platform managed \
     --region us-central1 \
     --set-env-vars MONGODB_URI=<your-mongodb-uri>
   ```

### Azure Deployment

#### Using Container Instances

1. **Build and push to Azure Container Registry**
   ```bash
   az acr build --registry <registry-name> --image carbon-credits:latest .
   ```

2. **Deploy container**
   ```bash
   az container create \
     --resource-group <resource-group> \
     --name carbon-credits \
     --image <registry-name>.azurecr.io/carbon-credits:latest \
     --environment-variables MONGODB_URI=<your-mongodb-uri>
   ```

## Production Checklist

### Before Deployment

- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB (MongoDB Atlas recommended)
- [ ] Set secure MongoDB credentials
- [ ] Configure CORS properly
- [ ] Set up error logging (e.g., Sentry)
- [ ] Configure rate limiting
- [ ] Set up SSL/TLS certificates
- [ ] Configure domain names
- [ ] Set up monitoring (e.g., New Relic, DataDog)
- [ ] Configure backups for MongoDB
- [ ] Set up CI/CD pipeline
- [ ] Review and update environment variables
- [ ] Test all API endpoints
- [ ] Test frontend build
- [ ] Review security settings

### Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **MongoDB**: Use strong passwords and enable authentication
3. **CORS**: Configure allowed origins properly
4. **Rate Limiting**: Implement API rate limiting
5. **Input Validation**: Validate all user inputs
6. **HTTPS**: Always use HTTPS in production
7. **Dependencies**: Keep dependencies updated
8. **Secrets**: Use secret management services (AWS Secrets Manager, etc.)

### Monitoring

1. **Application Monitoring**
   - Set up application performance monitoring (APM)
   - Monitor error rates
   - Track response times

2. **Infrastructure Monitoring**
   - Monitor server resources (CPU, memory, disk)
   - Set up alerts for high usage
   - Monitor database performance

3. **Logging**
   - Centralize logs (CloudWatch, Stackdriver, etc.)
   - Set up log rotation
   - Configure log levels appropriately

### Scaling

1. **Horizontal Scaling**
   - Use load balancers
   - Deploy multiple instances
   - Configure auto-scaling

2. **Database Scaling**
   - Use MongoDB replica sets
   - Consider sharding for large datasets
   - Use read replicas for read-heavy workloads

3. **Caching**
   - Implement Redis for caching
   - Cache frequently accessed data
   - Set appropriate TTL values

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB is running
   - Verify connection string
   - Check network/firewall settings

2. **Port Already in Use**
   - Change port in `.env`
   - Kill process using the port

3. **Build Failures**
   - Clear `node_modules` and reinstall
   - Check Node.js version
   - Review error messages

4. **Docker Issues**
   - Rebuild images: `docker-compose build --no-cache`
   - Check Docker daemon is running
   - Review container logs

## Support

For deployment issues, check:
1. Application logs
2. Container logs (if using Docker)
3. Server logs
4. MongoDB logs
5. Network connectivity

Open an issue on the repository for additional support.

