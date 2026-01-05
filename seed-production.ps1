# Seed Production Database Script
# This script will seed your production database on Vercel

$PRODUCTION_URL = "https://mettl-stack-hack-3-0-iota.vercel.app"
$SEED_ENDPOINT = "$PRODUCTION_URL/api/seed"

Write-Host "🌱 Seeding Production Database..." -ForegroundColor Green
Write-Host "📍 URL: $SEED_ENDPOINT" -ForegroundColor Cyan
Write-Host ""

try {
    # Try GET first (easier)
    Write-Host "⏳ Calling seed endpoint..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri $SEED_ENDPOINT -Method GET -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        $result = $response.Content | ConvertFrom-Json
        Write-Host ""
        Write-Host "✅ SUCCESS!" -ForegroundColor Green
        Write-Host "📊 Projects Seeded: $($result.projectsCount)" -ForegroundColor Cyan
        Write-Host "💬 Message: $($result.message)" -ForegroundColor White
        Write-Host ""
        Write-Host "🎉 Your database is now populated!" -ForegroundColor Green
        Write-Host "🌐 Visit: $PRODUCTION_URL" -ForegroundColor Cyan
        Write-Host ""
    }
} catch {
    Write-Host ""
    Write-Host "❌ Error seeding database:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Try manually visiting: $SEED_ENDPOINT" -ForegroundColor Cyan
    Write-Host ""
}

