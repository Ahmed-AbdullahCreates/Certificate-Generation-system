# 🎯 Quick Command Reference

## First Time Setup (Already Done!)
```powershell
npm install              # ✅ Done
git init                # ✅ Done  
git add .               # ✅ Done
git commit -m "msg"     # ✅ Done
```

## Deploy to GitHub (Do This Next!)
```powershell
# Replace YOUR-USERNAME and REPO-NAME with yours
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## After GitHub: Go to Netlify
1. https://app.netlify.com
2. Sign up with GitHub
3. Import your repository
4. Deploy!

## Future Updates (After Initial Deploy)
```powershell
# Edit your code, then:
git add .
git commit -m "Updated XYZ feature"
git push

# Netlify auto-deploys! ✨
```

## Useful Commands
```powershell
npm run dev              # Local development
npm run build            # Build for production
node generate-samples.js # Regenerate sample files
git status              # Check what changed
git log                 # See commit history
```

## Check Your Work
```powershell
git remote -v           # Verify GitHub connection
git status              # See uncommitted changes
git log --oneline       # See commit history
```

---

**NEXT:** Follow the steps in `START_HERE.md`! 📖
