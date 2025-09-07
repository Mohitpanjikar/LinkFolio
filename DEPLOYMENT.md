# LinkFolio Deployment Guide

## 🚀 Deploying to Netlify

### Frontend (Next.js Site)

1. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Select the LinkFolio repository

2. **Build Settings:**
   - Build command: `cd Site && npm ci && npm run build && npm run export`
   - Publish directory: `Site/out`
   - Node version: `18`

3. **Environment Variables:**
   Set these in Netlify dashboard under Site settings > Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   NEXT_PUBLIC_SITE_URL=https://your-netlify-domain.netlify.app
   NEXT_PUBLIC_SITE_NAME=LinkFolio
   ```

### Backend (Express Server)

**Option 1: Railway**
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Deploy the `server` folder
4. Set environment variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=8080
   NODE_ENV=production
   CORS_ORIGIN=https://your-netlify-domain.netlify.app
   ```

**Option 2: Render**
1. Go to [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Set environment variables as above

**Option 3: Heroku**
1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Set buildpack: `heroku buildpacks:set heroku/nodejs`
4. Set environment variables: `heroku config:set SUPABASE_URL=your_url`
5. Deploy: `git subtree push --prefix server heroku main`

## 🔐 Security Checklist

- [ ] All sensitive data moved to environment variables
- [ ] `.env` files added to `.gitignore`
- [ ] Environment example files created
- [ ] CORS properly configured for production domains
- [ ] HTTPS enabled on all services
- [ ] Database credentials secured

## 📝 Environment Variables Reference

### Frontend (.env)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=LinkFolio
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=8080
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com,https://backup-domain.com
JWT_SECRET=your_secure_random_string
```

## 🔄 After Deployment

1. Update CORS_ORIGIN with your actual Netlify domain
2. Test all functionality in production
3. Set up custom domain (optional)
4. Configure SSL certificates
5. Set up monitoring and error tracking

## 🛠 Local Development

1. Copy `.env.example` to `.env` in both `server` and `Site` directories
2. Fill in your actual values
3. Run `npm run dev` in both directories

## 📱 Custom Domain Setup

1. **Netlify:** Site settings > Domain management > Add custom domain
2. **Backend:** Update CORS_ORIGIN environment variable
3. **DNS:** Point your domain to Netlify's servers
4. **SSL:** Netlify provides free SSL certificates automatically
