# Quick Start: Deploy in 5 Minutes

## Step 1: Initialize Git (1 minute)

Open terminal/PowerShell in your project folder and run:

```bash
git init
git add .
git commit -m "Initial GeoHuB deployment"
git branch -M main
```

## Step 2: Create GitHub Repository (2 minutes)

1. Go to https://github.com/new
2. Create repository name: `geohub` (or your choice)
3. **Don't** add README, .gitignore, or license (you already have these)
4. Click "Create repository"
5. Copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/geohub.git`)

## Step 3: Push to GitHub (1 minute)

In terminal, paste and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/geohub.git
git push -u origin main
```

## Step 4: Deploy on Netlify (1 minute)

1. Go to https://app.netlify.com/signup (sign up with GitHub)
2. Authorize with your GitHub account
3. Click "New site from Git"
4. Select "GitHub"
5. Find and click your `geohub` repository
6. Settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.`
7. Click "Deploy site"

✅ **DONE!** Your site is now live at `your-site.netlify.app`

---

## Test Your Form

1. Visit your live site
2. Go to "Contact" section
3. Fill out and submit the form
4. Check Netlify dashboard:
   - Site → Forms → contact
   - You should see your submission!

---

## Add Custom Domain (Optional)

1. In Netlify: **Site settings → Domain management**
2. Click "Add custom domain"
3. Enter your domain (e.g., `geohub.com`)
4. Follow DNS instructions from your domain registrar

---

## Troubleshooting

**Form not submitting?**
- Check browser console (F12 → Console tab)
- Verify you're on the Netlify-deployed site (not localhost)
- Clear browser cache

**Site not loading?**
- Wait 30 seconds for build to complete
- Check Netlify deploy logs for errors
- Verify `netlify.toml` is in root directory

**Custom domain not working?**
- DNS changes take 5-48 hours to propagate
- Use https://mxtoolbox.com to check DNS status

---

## That's It! 🎉

Your site is now:
- ✅ Live and public
- ✅ Has working contact forms
- ✅ Has HTTPS/SSL certificate
- ✅ Can receive worldwide traffic
- ✅ Auto-deployed on git push
- ✅ Free hosting with Netlify

Every time you push to GitHub, Netlify automatically rebuilds and deploys your site.

For detailed deployment info, see `DEPLOYMENT.md`
