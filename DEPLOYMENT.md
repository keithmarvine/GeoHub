# GeoHuB | The Spatial Network — Deployment Guide

## Quick Start

This static website is ready to deploy on **Netlify** or **Vercel**. Both platforms support form submissions and provide free hosting with custom domains.

---

## Deploy on Netlify (Recommended)

### Option 1: Using Netlify UI (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/geohub.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository
   - Build settings:
     - **Build command:** (leave empty - it's a static site)
     - **Publish directory:** `.`
   - Click "Deploy site"

3. **Configure Forms**
   - Netlify automatically detects forms with `data-netlify="true"`
   - No additional setup needed!

### Option 2: Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy
   ```
   - Select "Create & configure a new site"
   - Follow the prompts
   - Publish directory: `.`

3. **For continuous deployment:**
   ```bash
   netlify deploy --prod
   ```

---

## Deploy on Vercel

### Using Vercel CLI or Web UI

1. **Push to GitHub** (same steps as above)

2. **Via Vercel Web UI**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git repository
   - Select repository
   - Framework: **Other** (since it's static HTML)
   - Root Directory: `/`
   - Click "Deploy"

3. **Note on Forms:**
   - Vercel doesn't have built-in form handling like Netlify
   - **IMPORTANT:** You'll need to either:
     - Keep using Netlify for form submissions, OR
     - Use an external service like Formspree, Basin, or Getform
   - **Current setup works best with Netlify**

---

## Form Submission Setup

### Current Configuration (Netlify)
The contact form is already configured to work with Netlify Forms:

```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Netlify automatically captures form submissions -->
</form>
```

**Form receives at:** `netlify.app > Forms > contact`

### If Using Vercel or Another Host

To use Formspree (free alternative):

1. Visit [formspree.io](https://formspree.io)
2. Create an account and new form for your email
3. Update the form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

4. Remove `data-netlify` attributes

---

## Project Structure

```
geohub/
├── index.html          # Main page
├── sector.html         # Sector detail page
├── main.js             # JavaScript (vanilla, no dependencies)
├── style.css           # Main styles
├── sector.css          # Sector page styles
├── GeoHUB.svg          # Logo (used as favicon + branding)
├── survey-*.png        # Portfolio images
├── *.jpg/jpeg          # Project images
├── netlify.toml        # Netlify configuration
├── .gitignore          # Git exclusions
└── DEPLOYMENT.md       # This file
```

---

## Custom Domain Setup

### Netlify
1. Go to Site Settings > Domain Management
2. Click "Add custom domain"
3. Enter your domain (e.g., `geohub.com`)
4. Follow DNS instructions from your registrar

### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records (Vercel provides specific instructions)

---

## Environment Variables

Currently, none needed for this static site. If you add backend features:

**Netlify:** Site settings > Build & deploy > Environment
**Vercel:** Project settings > Environment Variables

---

## Performance Tips

✅ Already implemented:
- Gzip compression (automatic on both platforms)
- Image lazy loading (`loading="lazy"`)
- CSS/JS minification recommended

Optional optimizations:
- Use CDN images (already doing with Unsplash)
- Enable image optimization
- Consider WebP format for images

---

## Troubleshooting

### Forms not submitting
- Ensure `name="contact"` on the form
- Check form field names match in JavaScript
- Verify `data-netlify="true"` is present

### 404 on /sector page
- Check `netlify.toml` redirects are deployed
- Clear browser cache

### Logo not showing
- Verify `GeoHUB.svg` is in root directory
- Check file path in HTML: `/GeoHUB.svg`

---

## CI/CD Pipeline

Both platforms automatically:
- Deploy on git push
- Run on new commits
- Provide preview URLs for PRs

---

## Monitoring & Analytics

**Netlify:**
- Analytics dashboard included
- Site analytics > enable Analytics

**Vercel:**
- Web Analytics (Pro plan)
- Use Google Analytics with script in HTML

---

## Next Steps

1. ✅ Push to GitHub
2. ✅ Connect repository to Netlify/Vercel
3. ✅ Configure custom domain
4. ✅ Test form submission
5. ✅ Monitor deployment logs

---

**Questions?** Check platform-specific docs:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
