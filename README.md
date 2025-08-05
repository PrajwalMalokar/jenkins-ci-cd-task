# Jenkins CI/CD Pipeline Project

A complete CI/CD pipeline implementation using Jenkins, Docker, and GitHub for a Node.js web application.

## 🚀 Project Overview

This project demonstrates a modern DevOps workflow with automated building, testing, and deployment of a Node.js web application using Jenkins pipeline-as-code approach.

### Features

- **Automated CI/CD Pipeline** with Jenkins
- **Dockerized Application** for consistent deployments
- **GitHub Webhook Integration** for automatic builds
- **Multi-Environment Deployment** (Staging & Production)
- **Automated Testing & Security Scanning**
- **Rollback Capabilities** for production deployments
- **Clean Code Structure** with proper error handling

## 📋 Project Structure

```
├── Dockerfile              # Docker configuration
├── Jenkinsfile             # Jenkins pipeline definition
├── main.js                 # Main Node.js application
├── test.js                 # Test suite
├── package.json            # Node.js dependencies
└── README.md              # Project documentation
```

## 🛠️ Technology Stack

- **Runtime:** Node.js 18
- **CI/CD:** Jenkins
- **Containerization:** Docker
- **Version Control:** Git & GitHub
- **Testing:** Custom test suite
- **Deployment:** Multi-environment (Staging/Production)

## 📦 Application Details

### Web Server Features

- **REST API Endpoints:**
  - `GET /` - Home page
  - `GET /about` - About page
  - `GET /api/status` - Health check endpoint
  - `GET /api/time` - Current time API

- **Health Monitoring:** Built-in status endpoint for deployment verification
- **Error Handling:** Custom 404 pages and graceful shutdowns
- **Logging:** Comprehensive application logging

## 🔧 Setup Instructions

### Prerequisites

- **Jenkins Server** (v2.516.1+)
- **Docker** (for containerization)
- **Node.js 18+** (for local development)
- **Git** (for version control)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PrajwalMalokar/jenkins-ci-cd-task.git
   cd jenkins-ci-cd-task
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Access the application:**
   - Local: http://localhost:3000
   - Health Check: http://localhost:3000/api/status

## 🐳 Docker Usage

### Build Docker Image
```bash
docker build -t my-js-app .
```

### Run Container
```bash
docker run -d --name my-app -p 3000:3000 my-js-app
```

### Health Check
```bash
curl http://localhost:3000/api/status
```

## 🔄 CI/CD Pipeline

### Pipeline Stages

1. **Checkout** - Source code retrieval
2. **Install Dependencies** - npm install
3. **Lint & Code Quality** - Code quality checks
4. **Test** - Automated testing
5. **Build Docker Image** - Container creation
6. **Security Scan** - Vulnerability scanning
7. **Deploy to Staging** - Development environment deployment
8. **Deploy to Production** - Production environment deployment
9. **Cleanup** - Old image cleanup

### Branch Strategy

- **`main` branch:** Production deployments (port 3000)
- **`develop/staging` branches:** Staging deployments (port 3001)
- **Other branches:** Build and test only

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_VERSION` | Node.js version | 18 |
| `APP_NAME` | Application name | my-js-app |
| `DOCKER_IMAGE` | Docker image name | my-js-app |
| `PORT` | Application port | 3000 |

## 🔗 GitHub Webhook Setup

### Configure Webhook in GitHub

1. Go to repository **Settings** → **Webhooks**
2. Click **Add webhook**
3. Configure:
   ```
   Payload URL: http://YOUR_JENKINS_URL:8080/github-webhook/
   Content type: application/json
   Events: Just the push event
   Active: ✅
   ```

### Jenkins Configuration

1. Install required plugins:
   - GitHub Plugin
   - Docker Pipeline Plugin
   - NodeJS Plugin

2. Configure Global Tools:
   - Add NodeJS 18 installation

3. Create Pipeline Job:
   - Repository URL: `https://github.com/PrajwalMalokar/jenkins-ci-cd-task.git`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
   - Enable: "GitHub hook trigger for GITScm polling"

## 📊 Testing

### Test Suite

The project includes comprehensive tests:

- **Server Export Test** - Module export validation
- **Server Response Test** - HTTP response verification
- **Application Constants Test** - Configuration validation

### Run Tests
```bash
npm test
```

### Test Coverage
- ✅ Server module exports
- ✅ HTTP response handling
- ✅ Application configuration
- ✅ Docker container health

## 🚀 Deployment

### Staging Environment
- **URL:** http://localhost:3001
- **Trigger:** Push to `develop` or `staging` branches
- **Features:** Full testing environment

### Production Environment
- **URL:** http://localhost:3000
- **Trigger:** Push to `main` branch
- **Features:** 
  - Automatic backup creation
  - Health checks
  - Rollback on failure

### Deployment Commands

**Manual Staging Deploy:**
```bash
docker run -d --name my-js-app-staging -p 3001:3000 my-js-app:latest
```

**Manual Production Deploy:**
```bash
docker run -d --name my-js-app-prod -p 3000:3000 my-js-app:latest
```

## 🔒 Security Features

- **Automated Security Scanning** with npm audit
- **Container Security** with minimal base image
- **Environment Isolation** between staging and production
- **Secure Webhook** configuration

## 📈 Monitoring & Health Checks

### Health Check Endpoint
```bash
curl http://localhost:3000/api/status
```

**Response:**
```json
{
  "status": "running",
  "appName": "My JS App",
  "version": "1.0.0",
  "uptime": 25.422,
  "port": 3000,
  "nodeVersion": "v18.20.8"
}
```

### Application Logs
- Startup information
- Request logging
- Error tracking
- Deployment status


## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Prajwal Malokar**
- GitHub: [@PrajwalMalokar](https://github.com/PrajwalMalokar)
- Repository: [jenkins-ci-cd-task](https://github.com/PrajwalMalokar/jenkins-ci-cd-task)

## 🏷️ Version

**Current Version:** 1.0.0

---

⭐ **Star this repository if you found it helpful!**
