# Certificate Generator 📜

A **100% client-side** web application that generates personalized certificates from Excel data and Word templates. No backend server required!

## ✨ Features

- 📊 **Excel Parsing**: Upload Excel files (.xlsx, .xls) with student data
- 📄 **Word Template Processing**: Use .docx templates with placeholders like `{{name}}`, `{{grade}}`, etc.
- 🎨 **Multiple Output Formats**: Generate certificates as Word (.docx) or PDF files
- 🚀 **Client-Side Only**: Everything runs in your browser - no data sent to servers
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎯 **Batch Processing**: Generate certificates for multiple students at once

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the local server URL (usually `http://localhost:5173`)

## 📖 How to Use

### Step 1: Prepare Your Excel File

Create an Excel file with student data. Example columns:

| name          | course           | grade | date       |
|---------------|------------------|-------|------------|
| John Doe      | Web Development  | A+    | 2025-10-27 |
| Jane Smith    | Data Science     | A     | 2025-10-27 |
| Bob Johnson   | Machine Learning | B+    | 2025-10-27 |

**Important**: The column headers will be used as placeholder names in your template.

### Step 2: Create Your Word Template

Create a Word document (.docx) with placeholders using double curly braces:

```
CERTIFICATE OF ACHIEVEMENT

This certifies that {{name}} has successfully completed
{{course}} with a grade of {{grade}} on {{date}}.

Congratulations on your achievement!
```

**Placeholder format**: `{{columnName}}`

### Step 3: Generate Certificates

1. Upload your Excel file
2. Upload your Word template
3. Choose output format (Word, PDF, or both)
4. Click "Generate Certificates"
5. Files will be automatically downloaded to your computer

## 📁 Project Structure

```
certificate-generator/
├── index.html          # Main HTML file
├── styles.css          # Application styles
├── app.js             # Main JavaScript logic
├── package.json       # Dependencies
├── examples/          # Sample files
│   ├── students.xlsx  # Sample Excel data
│   └── template.docx  # Sample certificate template
└── README.md          # This file
```

## 🛠️ Technologies Used

- **xlsx**: Excel file parsing
- **docxtemplater**: Word template manipulation
- **pizzip**: ZIP file handling (required for .docx)
- **jspdf**: PDF generation
- **html2canvas**: HTML to canvas conversion
- **file-saver**: File download functionality
- **Vite**: Development server and build tool

## 🎨 Customization

### Modify Certificate Design

For DOCX output, design your certificate in Microsoft Word with:
- Custom fonts, colors, and layouts
- Images and logos
- Borders and shapes
- Any Word formatting you want

For PDF output, modify the `generatePdfCertificate` function in `app.js` to customize the layout.

### Add More Placeholders

Simply add more columns to your Excel file and use them in your template with `{{columnName}}` syntax.

## 📝 Example Templates

### Simple Certificate
```
CERTIFICATE

{{name}} has completed {{course}}
Grade: {{grade}} | Date: {{date}}
```

### Formal Certificate
```
CERTIFICATE OF ACHIEVEMENT

This is to certify that

{{name}}

has successfully completed the course

{{course}}

with distinction, achieving a grade of {{grade}}

Awarded on {{date}}

_____________________
Signature
```

## 🔧 Troubleshooting

### Excel file not parsing
- Ensure the file is .xlsx or .xls format
- Check that the first row contains column headers
- Make sure there's no merged cells in the header row

### Template not working
- Verify the file is .docx format (not .doc)
- Check that placeholders use double curly braces: `{{name}}`
- Ensure placeholder names match Excel column headers exactly

### PDF generation issues
- PDFs use a simplified layout based on the data
- For complex designs, use DOCX format instead
- Ensure browser allows pop-ups/downloads

## 🚀 Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized files. Deploy these files to any static hosting service:
- GitHub Pages
- Netlify
- AWS S3
- Any web server

## 📄 License

MIT License - Feel free to use this project for any purpose!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 💡 Tips

1. **Test with small data first**: Try with 2-3 students before processing hundreds
2. **Keep templates simple**: Complex Word formatting might not always transfer perfectly to PDF
3. **Use consistent naming**: Column headers should be simple (no spaces or special characters work best)
4. **Browser compatibility**: Works best in modern browsers (Chrome, Firefox, Edge)



