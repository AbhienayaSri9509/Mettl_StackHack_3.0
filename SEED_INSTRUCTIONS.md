# 🌱 How to Seed Your Production Database

Your app is showing "No projects found" because the database needs to be seeded. Here are **3 easy ways** to fix this:

---

## ✅ Method 1: Use the Seed API Endpoint (After Deployment)

**First, commit and push your changes to trigger Vercel redeploy:**

```powershell
git add .
git commit -m "feat: Add seed endpoint for database population"
git push origin main
```

**Wait 2-3 minutes for Vercel to redeploy, then:**

### Option A: Visit in Browser
Simply visit: **https://mettl-stack-hack-3-0-iota.vercel.app/api/seed**

### Option B: Use PowerShell Script
```powershell
pwsh -File seed-production.ps1
```

### Option C: Use curl/Postman
```bash
curl https://mettl-stack-hack-3-0-iota.vercel.app/api/seed
```

---

## ✅ Method 2: Direct MongoDB Connection (Fastest - Recommended)

This connects directly to your MongoDB Atlas database:

### Step 1: Get Your MongoDB URI from Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Find `MONGODB_URI` and copy it

### Step 2: Run the Direct Seed Script

**Option A: Set in .env file**
```powershell
# Edit backend/.env and add:
MONGODB_URI=your-mongodb-atlas-connection-string

# Then run:
node seed-production-direct.js
```

**Option B: Pass as argument**
```powershell
node seed-production-direct.js "mongodb+srv://username:password@cluster.mongodb.net/carbon-credits?retryWrites=true&w=majority"
```

**Option C: Set as environment variable**
```powershell
$env:MONGODB_URI="your-mongodb-connection-string"
node seed-production-direct.js
```

---

## ✅ Method 3: Use MongoDB Compass (Visual Method)

1. **Download MongoDB Compass**: https://www.mongodb.com/try/download/compass
2. **Connect** using your MongoDB Atlas connection string
3. **Import the seed data**:
   - Open `backend/seed.js`
   - Copy the `projects` array
   - In Compass, go to your database → `projects` collection
   - Click "Insert Document" → Paste the JSON array

---

## 🎯 Quick Verification

After seeding, verify it worked:

1. **Check API**: https://mettl-stack-hack-3-0-iota.vercel.app/api/projects
   - Should return JSON with 57 projects

2. **Check Homepage**: https://mettl-stack-hack-3-0-iota.vercel.app
   - Should show beautiful project cards instead of "No projects found"

---

## 📊 What Gets Seeded

- ✅ **57 premium carbon credit projects**
- ✅ **30+ countries** across 6 continents
- ✅ **6 categories**: Forestry, Renewable Energy, Infrastructure, Agriculture, Waste Management, Water Management
- ✅ **Complete data**: Prices, SDG goals, VERRA certification, locations, coordinates, timelines

---

## 🚀 Recommended: Method 2 (Direct Connection)

**This is the fastest and most reliable method!**

Just run:
```powershell
# Set your MongoDB URI
$env:MONGODB_URI="your-mongodb-atlas-connection-string"

# Run the seed script
node seed-production-direct.js
```

**Done!** Your database will be populated in seconds! 🎉

---

## ❓ Troubleshooting

**"Cannot connect to MongoDB"**
- Check your connection string is correct
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify username/password are correct

**"Module not found"**
- Make sure you're in the project root directory
- Run `npm install` in both `backend/` and root if needed

**"404 on seed endpoint"**
- The code needs to be deployed to Vercel first
- Commit and push your changes, wait for redeploy
- Or use Method 2 (Direct Connection) instead

---

## 🎉 After Seeding

Your marketplace will be fully functional with:
- ✅ All 57 projects visible
- ✅ Working filters
- ✅ Country linking
- ✅ Mobile-responsive design
- ✅ Beautiful UI with project cards

**Your app is ready to win!** 🏆

