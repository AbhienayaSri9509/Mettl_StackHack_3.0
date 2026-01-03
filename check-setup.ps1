# Carbon Credits Marketplace - Setup Checker

Write-Host "Checking setup..." -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -NoNewline
try {
    $nodeVersion = node --version
    Write-Host " OK - $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host " FAILED - Not installed" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -NoNewline
try {
    $npmVersion = npm --version
    Write-Host " OK - $npmVersion" -ForegroundColor Green
} catch {
    Write-Host " FAILED - Not installed" -ForegroundColor Red
    exit 1
}

# Check MongoDB
Write-Host "Checking MongoDB..." -NoNewline
try {
    $mongod = Get-Command mongod -ErrorAction SilentlyContinue
    if ($mongod) {
        Write-Host " OK - Installed locally" -ForegroundColor Green
    } else {
        Write-Host " WARNING - Not found locally" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Tip: Use MongoDB Atlas (free cloud option)" -ForegroundColor Cyan
    }
} catch {
    Write-Host " WARNING - Not found" -ForegroundColor Yellow
}

# Check .env file
Write-Host "Checking backend/.env..." -NoNewline
if (Test-Path "backend\.env") {
    Write-Host " OK - Exists" -ForegroundColor Green
    $envContent = Get-Content "backend\.env" -Raw
    if ($envContent -match "mongodb\+srv://") {
        Write-Host "  Using MongoDB Atlas" -ForegroundColor Cyan
    } elseif ($envContent -match "mongodb://localhost") {
        Write-Host "  Using local MongoDB" -ForegroundColor Cyan
    }
} else {
    Write-Host " FAILED - Missing" -ForegroundColor Red
    Write-Host "  Run setup.bat first" -ForegroundColor Yellow
}

# Check dependencies
Write-Host "Checking dependencies..." -NoNewline
if ((Test-Path "backend\node_modules") -and (Test-Path "frontend\node_modules")) {
    Write-Host " OK - Installed" -ForegroundColor Green
} else {
    Write-Host " WARNING - Missing" -ForegroundColor Yellow
    Write-Host "  Run: npm install in root, backend, and frontend" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Set up MongoDB - Atlas or local installation" -ForegroundColor White
Write-Host "2. Update backend/.env with MongoDB connection string" -ForegroundColor White
Write-Host "3. Seed database: cd backend; node seed.js" -ForegroundColor White
Write-Host "4. Start app: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "See SETUP_INSTRUCTIONS.md for detailed guide" -ForegroundColor Cyan
