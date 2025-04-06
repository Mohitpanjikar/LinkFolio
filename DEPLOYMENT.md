# LinkFolio Deployment Guide (Free Options)

This guide will help you deploy your LinkFolio project using free hosting services.

## Database: MongoDB Atlas (Free Tier)

1. **Create a MongoDB Atlas account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account
   - Create a new project

2. **Set up a free tier cluster**:
   - Click "Build a Database"
   - Select "FREE" tier
   - Choose a cloud provider and region (AWS, Google Cloud, or Azure)
   - Click "Create Cluster" (this may take a few minutes)

3. **Configure database access**:
   - In the left sidebar, go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password (save these securely)
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Set up network access**:
   - In the left sidebar, go to "Network Access"
   - Click "Add IP Address"
   - For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add the IP of your hosting provider if known
   - Click "Confirm"

5. **Get your connection string**:
   - Go back to your cluster dashboard
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `<dbname>` with `linkfolio` or your preferred name

6. **Update your .env file**:
   - Open `server/.env`
   - Add your connection string as `MONGODB_URI=your-connection-string`

## Backend: Render.com (Free Tier)

1. **Create a Render account**:
   - Go to [Render](https://render.com/)
   - Sign up using GitHub or email

2. **Create a new Web Service**:
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository or upload your code directly

3. **Configure your service**:
   - Name: `linkfolio-backend`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set Environment Variables**:
   - Add the following:
     - `PORT`: `8080`
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `SECRET_JWT`: A secure random string for JWT tokens

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete

6. **Note your API URL**:
   - Once deployed, Render will provide a URL like `https://linkfolio-backend.onrender.com`
   - Save this URL for your frontend configuration

## Frontend: Vercel (Free Tier)

1. **Create a Vercel account**:
   - Go to [Vercel](https://vercel.com/signup)
   - Sign up using GitHub, GitLab, or email

2. **Import your repository**:
   - Click "Add New..."
   - Select "Project"
   - Import your GitHub repository
   - If you don't see it, you may need to configure Vercel's GitHub integration

3. **Configure project**:
   - Framework Preset: `Next.js`
   - Root Directory: `Site`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Configure Environment Variables**:
   - Add the following:
     - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://linkfolio-backend.onrender.com`)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the deployment to complete

6. **Your site is now live!**
   - Vercel will provide a URL like `https://linkfolio.vercel.app`
   - You can also configure a custom domain if you have one

## Alternative Backend Hosting: Cyclic.sh (Free Tier)

Cyclic offers a very simple deployment process for Node.js applications:

1. **Create a Cyclic account**:
   - Go to [Cyclic.sh](https://app.cyclic.sh/api/login)
   - Sign in with GitHub

2. **Deploy from your repo**:
   - Click "Link Your Own"
   - Select your GitHub repository
   - Set the app name (e.g., "linkfolio-backend")

3. **Configure**:
   - Set root directory to "server" if needed
   - Add environment variables (MONGODB_URI, SECRET_JWT)

4. **Deploy**:
   - Click "Deploy"
   - Cyclic will automatically detect Node.js and deploy

## Front-end Alternative: Netlify (Free Tier)

1. **Create a Netlify account**:
   - Go to [Netlify](https://app.netlify.com/signup)
   - Sign up with GitHub or email

2. **Deploy from Git**:
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure build settings**:
   - Base directory: `Site`
   - Build command: `npm run build && npm run export`
   - Publish directory: `Site/out`

4. **Add environment variables**:
   - Add `NEXT_PUBLIC_API_URL` with your backend URL

5. **Deploy**:
   - Click "Deploy site"

## Testing Your Deployment

1. **Backend Testing**:
   - Visit your backend URL (e.g., `https://linkfolio-backend.onrender.com`)
   - You should see "LinkFolio API is running"

2. **Frontend Testing**:
   - Visit your frontend URL (e.g., `https://linkfolio.vercel.app`)
   - Try to register and login
   - Test all features

## Troubleshooting

### CORS Issues:
If you experience CORS issues, update your server/index.js:

```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Database Connection Issues:
- Check that your MongoDB Atlas IP whitelist includes your deployment IP
- Verify that your connection string is correct in the environment variables

### Deployment Failures:
- Check the build logs provided by your hosting service
- Ensure all dependencies are correctly listed in package.json

## Maintenance

Both Render and Vercel free tiers may spin down your application after periods of inactivity. To prevent this:

- Set up a scheduled ping to your application (using services like UptimeRobot)
- Be aware that the first request after inactivity may be slow

## Future Upgrades

As your application grows, you may want to consider:
- Adding a custom domain
- Upgrading to paid plans for better performance
- Setting up a CDN for static assets
- Implementing CI/CD pipelines 