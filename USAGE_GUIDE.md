# Certificate Generator - Complete Usage Guide

## 🎯 What This Application Does

This is a **100% client-side** web application that:
- Reads student data from Excel files
- Fills Word document templates with that data
- Generates personalized certificates for each student
- Exports them as Word (.docx) or PDF files
- **All processing happens in your browser** - no data sent to any server!

---

## 📋 Prerequisites

### Software Requirements
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Microsoft Word** - For creating templates (or use the sample)
- **Excel** or similar - For creating student data

### Skills Required
- Basic file operations (upload/download)
- Basic Excel knowledge
- Basic Word knowledge

---

## 🚀 Getting Started

### 1. Installation

```bash
# Navigate to project folder
cd Potintial

# Install dependencies
npm install

# Generate sample files (optional but recommended)
node generate-samples.js
```

### 2. Start the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173/`

---

## 📝 Preparing Your Files

### Excel File (Student Data)

#### Format Requirements:
- **File type**: `.xlsx` or `.xls`
- **Structure**: First row = column headers, subsequent rows = data
- **No merged cells** in the header row

#### Example:

| name | course | grade | date | instructor |
|------|--------|-------|------|------------|
| John Doe | Web Development | A+ | 2025-10-27 | Dr. Smith |
| Jane Smith | Data Science | A | 2025-10-27 | Dr. Johnson |
| Bob Wilson | Cloud Computing | B+ | 2025-10-27 | Dr. Smith |

#### Tips:
- Use simple column names (no spaces preferred)
- Keep data clean (no extra formatting)
- All student rows should have the same columns
- You can have as many columns as needed

---

### Word Template (Certificate Design)

#### Format Requirements:
- **File type**: `.docx` (not .doc)
- **Placeholders**: Use `{{columnName}}` syntax
- Match placeholder names to Excel column headers exactly

#### Example Template:

```
═══════════════════════════════════════════════════════════════
                    CERTIFICATE OF ACHIEVEMENT
═══════════════════════════════════════════════════════════════

                      This is to certify that

                            {{name}}

              has successfully completed the course

                           {{course}}

         with outstanding performance, achieving grade

                           {{grade}}

                    Completion Date: {{date}}

                    Instructor: {{instructor}}


_____________________                    _____________________
   Director Signature                         Date
═══════════════════════════════════════════════════════════════
```

#### Design Tips:
1. **Open in Word** for full formatting control
2. **Add styling**:
   - Fonts (Times New Roman, Arial, etc.)
   - Colors and backgrounds
   - Borders and shapes
   - Page borders
3. **Insert elements**:
   - School/company logo
   - Signature images
   - Decorative graphics
4. **Center alignment** usually works best
5. **Use landscape orientation** for traditional certificates

---

## 🎨 Using the Application

### Step-by-Step Process

#### Step 1: Upload Excel File
1. Click the **"Choose Excel File"** button
2. Select your `.xlsx` or `.xls` file
3. Preview will show:
   - First 5 rows of data
   - Total number of students
   - Column headers

#### Step 2: Upload Word Template
1. Click the **"Choose DOCX Template"** button
2. Select your `.docx` template file
3. Preview will show:
   - Template filename
   - Detected placeholders

#### Step 3: Select Output Format
Choose one of:
- **Word (.docx)** - Preserves all formatting, best quality
- **PDF (.pdf)** - Portable, but simplified layout
- **Both** - Generates both formats for each student

#### Step 4: Generate Certificates
1. Click **"Generate Certificates"** button
2. Wait for processing (progress bar shows status)
3. Files automatically download to your Downloads folder

---

## 📊 Advanced Features

### Multiple Data Columns

You can use as many columns as you want:

**Excel:**
| name | course | grade | date | hours | gpa | honors |
|------|--------|-------|------|-------|-----|--------|
| ... | ... | ... | ... | ... | ... | ... |

**Template:**
```
{{name}} completed {{course}} ({{hours}} hours)
with a GPA of {{gpa}}. {{honors}}
```

### Conditional Content

While the app doesn't support if/else logic, you can prepare your Excel data:

**Excel:**
| name | course | grade | message |
|------|--------|-------|---------|
| John | Math | A+ | with highest honors |
| Jane | Science | B | successfully |

**Template:**
```
{{name}} completed {{course}} {{message}}
```

### Formatting in Templates

The DOCX output preserves:
- ✅ Fonts and font sizes
- ✅ Colors (text and background)
- ✅ Bold, italic, underline
- ✅ Alignment
- ✅ Images and logos
- ✅ Borders and shapes
- ✅ Tables
- ⚠️ Some complex elements may not transfer to PDF

---

## 🐛 Troubleshooting

### Issue: Excel file not parsing

**Symptoms:**
- Error message when uploading Excel
- No data preview shown

**Solutions:**
1. Ensure file is `.xlsx` or `.xls` format
2. Check first row has column headers
3. Remove any merged cells from header row
4. Try saving Excel file as new `.xlsx` file
5. Check file isn't password protected

---

### Issue: Placeholders not replaced

**Symptoms:**
- Generated certificates still show `{{name}}` instead of actual names

**Solutions:**
1. Check placeholder format: `{{name}}` (double curly braces)
2. Verify placeholder name matches Excel column header **exactly**
3. Names are case-sensitive: `{{Name}}` ≠ `{{name}}`
4. No spaces in braces: `{{name}}` not `{{ name }}`
5. Use simple column names in Excel (no special characters)

---

### Issue: Template not loading

**Symptoms:**
- Error when uploading Word file
- "Invalid template" message

**Solutions:**
1. Ensure file is `.docx` format (not `.doc`)
2. Try re-saving the file in Word as `.docx`
3. Remove any macros or advanced features
4. Create a simple test template with just text

---

### Issue: PDF quality poor

**Symptoms:**
- PDF doesn't look like Word template
- Formatting lost in PDF

**Solutions:**
1. Use **DOCX format** for best quality
2. Convert DOCX to PDF manually using Word or other tools
3. Customize `generatePdfCertificate()` function in `app.js`
4. PDF generation is simplified - it's a known limitation

---

### Issue: Downloads not working

**Symptoms:**
- No files downloading
- Downloads blocked

**Solutions:**
1. Check browser allows pop-ups from localhost
2. Check download settings aren't blocking files
3. Try different browser (Chrome/Edge recommended)
4. Check available disk space
5. Disable browser extensions temporarily

---

## 💡 Best Practices

### For Best Results:

1. **Test with small data first**
   - Try 2-3 students before processing hundreds
   - Verify output looks correct

2. **Keep templates simple initially**
   - Start with basic text
   - Add formatting gradually
   - Test after each addition

3. **Use consistent naming**
   - Column headers: lowercase, no spaces (`first_name`, `grade`)
   - Or camelCase (`firstName`, `lastName`)
   - Be consistent throughout

4. **Save template frequently**
   - Word can crash
   - Save different versions

5. **Backup your data**
   - Keep original Excel file safe
   - Save template versions

---

## 🔒 Privacy & Security

### Your Data is Safe

- ✅ **No server uploads** - Everything runs in your browser
- ✅ **No data collection** - We don't see or store your data
- ✅ **Completely offline capable** - Works without internet after initial load
- ✅ **Open source** - All code is visible in the project files

### How It Works

1. You select files on your computer
2. JavaScript reads them **in your browser**
3. Processing happens **on your machine**
4. Generated files save **to your Downloads**
5. **Nothing is sent anywhere**

---

## 📦 Production Deployment

### Building for Production

```bash
npm run build
```

This creates optimized files in `dist/` folder.

### Hosting Options

Upload the `dist/` folder to:

1. **GitHub Pages** (Free)
   - Create repository
   - Upload dist contents
   - Enable GitHub Pages

2. **Netlify** (Free)
   - Drag and drop dist folder
   - Get instant URL

3. **Vercel** (Free)
   - Connect repository
   - Auto-deploy

4. **Any web host**
   - Just needs static file hosting
   - Upload via FTP/SFTP

---

## 🎓 Examples & Use Cases

### Academic Institutions
- Course completion certificates
- Degree certificates
- Achievement awards
- Participation certificates

### Corporate Training
- Training completion
- Workshop certificates
- Professional development
- Compliance training

### Events & Competitions
- Participant certificates
- Winner certificates
- Volunteer recognition
- Speaker certificates

---

## 🛠️ Customization

### Modifying the UI

Edit `styles.css`:
- Change colors (see `:root` variables)
- Modify layout
- Add your branding

### Changing Certificate Logic

Edit `app.js`:
- Modify `generatePdfCertificate()` for PDF layout
- Add validation rules
- Add custom file naming

### Adding Features

Some ideas:
- Email certificates automatically
- Add certificate numbering
- Generate QR codes
- Add watermarks
- Batch zip download

---

## 📞 Support & Resources

### Files in This Project

- `README.md` - Comprehensive documentation
- `QUICKSTART.md` - Fast setup guide
- `USAGE_GUIDE.md` - This file
- `examples/template_instructions.md` - Template creation help

### Getting Help

1. Check this guide
2. Review README.md
3. Check browser console for errors
4. Review sample files in `examples/`

---

## ✅ Checklist for First Use

- [ ] Installed Node.js
- [ ] Ran `npm install`
- [ ] Generated sample files (`node generate-samples.js`)
- [ ] Started dev server (`npm run dev`)
- [ ] Opened template in Word and formatted it
- [ ] Tested with sample files
- [ ] Created your own Excel data
- [ ] Created your own template
- [ ] Generated first certificate successfully
- [ ] Verified certificate looks correct

---

**Happy Certificate Generating! 🎉**

Made with ❤️ for easy, private, client-side certificate generation.
