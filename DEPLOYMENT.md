# Netlify Deployment Guide 🚀

## Option 1: Deploy with GitHub (Recommended - Auto-updates!)

This method enables **automatic deployments** - every time you push changes to GitHub, Netlify automatically rebuilds and deploys your site!

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in (or create an account)
2. Click the **"+"** icon (top right) → **"New repository"**
3. Name it: `certificate-generator` (or any name you prefer)
4. Choose: **Public** or **Private** (both work with Netlify)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open PowerShell in your project folder and run:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - Certificate Generator"

# Add your GitHub repository as remote (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```powershell
git remote add origin https://github.com/john-doe/certificate-generator.git
```

### Step 3: Deploy to Netlify

1. Go to [Netlify](https://www.netlify.com) and sign up (use GitHub to sign in)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub
5. Select your `certificate-generator` repository
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **"Deploy site"**

### Step 4: Wait for Deployment

- Netlify will build your site (takes 1-2 minutes)
- You'll get a random URL like: `https://random-name-12345.netlify.app`

### Step 5: Customize Your URL (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change to something like: `my-certificate-generator`
4. Your new URL: `https://my-certificate-generator.netlify.app`

### 🎉 Done! Auto-Deployment is Active!

Now, whenever you make changes:

```powershell
git add .
git commit -m "Updated feature X"
git push
```

Netlify will **automatically rebuild and deploy** your changes! ✨

---

## Option 2: Quick Deploy (Drag & Drop)

This is faster but **NO auto-updates** - you'll need to manually redeploy for changes.

### Step 1: Build Your Project

```powershell
npm run build
```

This creates a `dist/` folder with your built files.

### Step 2: Deploy to Netlify

1. Go to [Netlify](https://app.netlify.com/drop)
2. Sign up or log in
3. **Drag and drop** the entire `dist/` folder onto the page
4. Wait 30 seconds - Done!

### For Future Updates:

1. Make your changes
2. Run `npm run build`
3. Go to your site on Netlify
4. Go to **Deploys** tab
5. Drag and drop the new `dist/` folder

---

## Option 3: Netlify CLI (Advanced)

### Install Netlify CLI

```powershell
npm install -g netlify-cli
```

### Login to Netlify

```powershell
netlify login
```

### Deploy

```powershell
# Build first
npm run build

# Deploy to Netlify
netlify deploy --prod
```

Follow the prompts to link to a site or create a new one.

### For Future Updates:

```powershell
npm run build
netlify deploy --prod
```

---

## Verifying Your Deployment

Once deployed, test your site:

1. ✅ Upload the sample Excel file (`examples/students.xlsx`)
2. ✅ Upload the sample template (`examples/template.docx`)
3. ✅ Generate certificates in DOCX format
4. ✅ Generate certificates in PDF format
5. ✅ Verify downloads work correctly

---

## Recommended: Option 1 (GitHub + Netlify)

**Why?**
- ✅ Automatic deployments on every push
- ✅ Version control with Git
- ✅ Easy rollback to previous versions
- ✅ Collaboration friendly
- ✅ Free SSL certificate
- ✅ Free custom domain support

---

## Custom Domain (Optional)

If you own a domain:

1. Go to **Domain settings** on Netlify
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `certificates.yourdomain.com`)
4. Follow DNS configuration instructions
5. Netlify provides free SSL automatically!

---

## Environment Variables (If Needed)

If you add features that need API keys:

1. Go to **Site settings** → **Environment variables**
2. Add your variables
3. They'll be available during build time

---

## Troubleshooting

### Build Failed

Check the build log on Netlify:
- Ensure `package.json` has all dependencies
- Verify Node.js version compatibility
- Check for syntax errors

### Site Loads but Doesn't Work

- Check browser console for errors
- Verify all assets loaded correctly
- Check file paths are correct

### Files Not Downloading

- This is a client-side issue, not deployment
- Check browser settings
- Test in different browsers

---

## Next Steps After Deployment

1. Share your certificate generator URL!
2. Add it to your portfolio
3. Customize with your branding
4. Add more features
5. Monitor usage via Netlify Analytics (optional paid feature)

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://www.netlify.com/support
- Check build logs on Netlify dashboard

---

**Ready to deploy? Follow Option 1 for the best experience!** 🚀
