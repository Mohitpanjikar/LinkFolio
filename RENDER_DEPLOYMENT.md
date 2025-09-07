# 🚀 Deploy LinkFolio Backend to Render (Free Tier)

## Step-by-Step Guide

### 1. 📋 Prerequisites
- ✅ GitHub repository with your code (already done)
- ✅ Supabase account and credentials
- 🔗 Render account (free): https://render.com

### 2. 🎯 Deploy to Render

#### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://render.com
   - Sign up/Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if not already connected
   - Select "LinkFolio" repository

3. **Configure Service Settings**
   ```
   Name: linkfolio-backend
   Region: Oregon (US West)
   Branch: master
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Plan**
   - Select "Free" plan
   - Note: Free tier has limitations (spins down after 15 min of inactivity)

5. **Environment Variables**
   Add these in the "Environment" section:
   ```
   SUPABASE_URL=https://ewcgkprnzbfbojuqsqqf.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Y2drcHJuemJmYm9qdXFzcXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNDQ4MjcsImV4cCI6MjA3MjgyMDgyN30.vGwI6Su91ogK3-wHpz7o4G4JycIkiLclFlYsguRs35Y
   NODE_ENV=production
   CORS_ORIGIN=https://linkfolioo.netlify.app
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (usually 2-5 minutes)

#### Option B: Using Render CLI (Alternative)

1. **Install Render CLI**
   ```bash
   npm install -g @render/cli
   ```

2. **Login to Render**
   ```bash
   render auth login
   ```

3. **Deploy**
   ```bash
   cd /Users/mohitpanjikar/Desktop/LinkFolio
   render deploy
   ```

### 3. 📝 After Deployment

1. **Get Your Backend URL**
   - Your backend will be available at: `https://linkfolio-backend-XXXX.onrender.com`
   - Copy this URL

2. **Update Netlify Environment Variables**
   ```bash
   cd /Users/mohitpanjikar/Desktop/LinkFolio
   netlify env:set NEXT_PUBLIC_API_URL https://your-backend-url.onrender.com
   ```

3. **Redeploy Frontend**
   ```bash
   netlify deploy --prod --dir=Site/out
   ```

### 4. 🧪 Test Your Deployment

1. **Test Backend API**
   - Visit: `https://your-backend-url.onrender.com`
   - Should show: "LinkFolio API is running"

2. **Test Frontend**
   - Visit: `https://linkfolioo.netlify.app`
   - Try creating an account and logging in

### 5. ⚠️ Free Tier Limitations

- **Cold Starts**: Service spins down after 15 minutes of inactivity
- **Spin-up Time**: 10-30 seconds when waking up from sleep
- **Monthly Hours**: 750 hours/month (roughly 1 month of continuous usage)

### 6. 🔧 Troubleshooting

**Common Issues:**

1. **Build Fails**
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json

2. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Verify Supabase credentials

3. **CORS Errors**
   - Ensure CORS_ORIGIN includes your Netlify domain
   - Check frontend API_URL points to correct backend

4. **Database Connection**
   - Verify Supabase URL and key are correct
   - Check Supabase project is active

### 7. 🎯 Next Steps

- Monitor your app in Render dashboard
- Set up custom domain (optional, paid feature)
- Consider upgrading to paid plan for better performance
- Set up monitoring and error tracking

## 📞 Support

If you encounter issues:
- Check Render documentation: https://render.com/docs
- Review build logs in Render dashboard
- Check Network tab in browser for API errors

Your LinkFolio app should now be fully deployed and functional! 🎉
