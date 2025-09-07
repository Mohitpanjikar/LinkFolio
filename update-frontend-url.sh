#!/bin/bash
# Script to update frontend API URL after backend deployment

echo "🔄 Updating frontend API URL..."
echo "Replace 'YOUR_BACKEND_URL' with your actual Render backend URL"
echo ""
echo "Command to run after you get your backend URL:"
echo "netlify env:set NEXT_PUBLIC_API_URL https://your-backend-url.onrender.com"
echo ""
echo "Then redeploy frontend:"
echo "netlify deploy --prod --dir=Site/out"
