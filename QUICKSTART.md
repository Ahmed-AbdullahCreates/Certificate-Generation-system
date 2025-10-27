# Quick Start Guide 🚀

## Installation & Running

### Option 1: Quick Start (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate sample files (optional):**
   ```bash
   node generate-samples.js
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** - The app will automatically open at `http://localhost:5173`

### Option 2: Simple HTTP Server (No Build Required)

If you don't want to use npm, you can use any static file server. However, since we're using ES modules, Vite is recommended.

## Testing the Application

### Using Sample Files

1. After running `node generate-samples.js`, you'll find:
   - `examples/students.xlsx` - Sample student data
   - `examples/template.docx` - Basic certificate template

2. **Important**: Open `template.docx` in Microsoft Word and format it nicely:
   - Add borders
   - Change fonts
   - Add colors
   - Insert logos or images
   - Save the file

3. Upload both files in the application and generate certificates!

### Creating Your Own Files

#### Excel File Format
Your Excel file should have columns like:

| name | course | grade | date |
|------|--------|-------|------|
| John | Web Dev | A+ | 2025-10-27 |

#### Template File Format
Create a Word document with placeholders:

```
CERTIFICATE

This certifies that {{name}} completed {{course}}
with grade {{grade}} on {{date}}.
```

## Common Issues

### "Module not found" errors
- Make sure you ran `npm install`
- Check that all dependencies are listed in `package.json`

### Template not generating correctly
- Verify placeholders use `{{name}}` format (double curly braces)
- Ensure placeholder names match Excel column headers exactly
- Column headers are case-sensitive

### Files not downloading
- Check browser settings allow downloads
- Disable pop-up blocker for localhost
- Try a different browser (Chrome recommended)

### PDF quality issues
- PDFs are generated with a simple layout
- For better quality, use DOCX format and convert to PDF manually
- Or customize the `generatePdfCertificate` function in `app.js`

## File Structure

```
Potintial/
├── index.html              # Main application UI
├── app.js                  # Core application logic
├── styles.css              # Styling
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── generate-samples.js     # Sample file generator
├── examples/               # Sample files
│   ├── students.xlsx       # Sample data
│   ├── template.docx       # Sample template
│   └── template_instructions.md
└── README.md              # Full documentation
```

## Next Steps

1. ✅ **Test with samples**: Use the generated sample files
2. 🎨 **Customize template**: Make your certificate beautiful in Word
3. 📊 **Add your data**: Create your own Excel file
4. 🚀 **Generate**: Upload and generate your certificates!

## Production Deployment

When ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder. Upload these files to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Need Help?

- Check the full `README.md` for detailed documentation
- Review `examples/template_instructions.md` for template guidance
- Check browser console for error messages

---

**Happy Certificate Generating! 🎓**
