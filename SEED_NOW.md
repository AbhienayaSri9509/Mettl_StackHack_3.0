# 🌱 Seed Your Database NOW!

## ✅ Method 1: Visit in Browser (Easiest - After Vercel Deploys)

**Wait 1-2 minutes** for Vercel to deploy your changes, then simply visit:

```
https://mettl-stack-hack-3-0-iota.vercel.app/api/seed
```

You should see a success message with:
```json
{
  "success": true,
  "message": "✅ Successfully seeded 57 premium carbon credit projects!",
  "projectsCount": 57
}
```

## ✅ Method 2: PowerShell Command

```powershell
Invoke-WebRequest -Uri "https://mettl-stack-hack-3-0-iota.vercel.app/api/seed" -Method GET
```

## ✅ Method 3: Use Online Tool

1. Go to: https://reqbin.com/
2. Method: **GET**
3. URL: `https://mettl-stack-hack-3-0-iota.vercel.app/api/seed`
4. Click **Send**

## ✅ Method 4: Seed Locally (If You Have MongoDB Access)

If you have your MongoDB connection string:

1. Update `backend/.env`:
   ```env
   MONGODB_URI=your-mongodb-atlas-connection-string
   ```

2. Run:
   ```bash
   cd backend
   node seed.js --standalone
   ```

## 🎯 After Seeding

1. **Verify Projects**: Visit `https://mettl-stack-hack-3-0-iota.vercel.app/api/projects`
   - Should return JSON with 57 projects

2. **See Your App**: Visit `https://mettl-stack-hack-3-0-iota.vercel.app`
   - Should show beautiful project cards!
   - Works on mobile AND desktop! 📱💻

## ⏱️ Deployment Status

Your code is pushed to GitHub main branch. Vercel should auto-deploy in **1-2 minutes**.

Check deployment status: https://vercel.com/dashboard

## 🎉 What You'll Get

- ✅ 57 premium carbon credit projects
- ✅ 30+ countries
- ✅ 6 categories
- ✅ Fully responsive (mobile + desktop)
- ✅ Beautiful UI with all features

**Your marketplace will be LIVE!** 🚀

