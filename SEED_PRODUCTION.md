# 🌱 How to Seed Your Production Database

Your app is deployed on Vercel but showing **"No projects found"** because the database is empty. Here's how to fix it:

## ✅ Quick Fix - Use the Seed API Endpoint

I've added a seed endpoint to your backend. Here's how to use it:

### Method 1: Using Browser (Easiest)

1. **Visit this URL in your browser:**
   ```
   https://mettl-stack-hack-3-0-iota.vercel.app/api/seed
   ```
   But wait - this is a POST endpoint, so you need to use a tool...

### Method 2: Using curl (Recommended)

**Windows PowerShell:**
```powershell
Invoke-WebRequest -Uri "https://mettl-stack-hack-3-0-iota.vercel.app/api/seed" -Method POST
```

**Or using curl (if installed):**
```bash
curl -X POST https://mettl-stack-hack-3-0-iota.vercel.app/api/seed
```

### Method 3: Using Postman or Browser Extension

1. Install **Postman** or **REST Client** browser extension
2. Create a POST request to: `https://mettl-stack-hack-3-0-iota.vercel.app/api/seed`
3. Send the request

### Method 4: Using Online Tool

Visit: https://reqbin.com/
- Method: POST
- URL: `https://mettl-stack-hack-3-0-iota.vercel.app/api/seed`
- Click "Send"

## ✅ Alternative: Seed via MongoDB Atlas Directly

If the API endpoint doesn't work, you can seed directly:

1. **Get your MongoDB Atlas connection string** from Vercel environment variables
2. **Update `backend/.env` locally:**
   ```env
   MONGODB_URI=your-production-mongodb-uri-from-vercel
   ```
3. **Run seed script locally:**
   ```bash
   cd backend
   node seed.js --standalone
   ```

## ✅ Verify It Worked

After seeding, check these URLs:

1. **API Projects:** https://mettl-stack-hack-3-0-iota.vercel.app/api/projects
   - Should return JSON with 57 projects

2. **Homepage:** https://mettl-stack-hack-3-0-iota.vercel.app
   - Should show project cards instead of "No projects found"

## 📊 What Gets Seeded

- ✅ **57 premium carbon credit projects**
- ✅ **30+ countries** across 6 continents
- ✅ **6 categories** (Forestry, Renewable Energy, Infrastructure, Agriculture, Waste Management, Water Management)
- ✅ **Complete project data** (prices, SDG goals, VERRA certification, locations, etc.)

## 🔒 Security Note

The seed endpoint is currently open. For production, you should:
1. Add authentication (API key or admin token)
2. Or remove the endpoint after seeding
3. Or add IP whitelisting

## 🚀 After Seeding

Once seeded, your marketplace will show:
- Beautiful project cards
- All 57 projects
- Working filters
- Country linking
- Mobile-responsive design

**Your app will be fully functional!** 🎉
