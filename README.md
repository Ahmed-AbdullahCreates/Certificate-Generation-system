# 📜 Certificate Generator

A 100% client-side web application that generates personalized certificates from Excel data and Word templates.  
No backend server required — everything runs in your browser.

🌐**Live Demo:** [Certificate Generator](https://heroic-bombolone-092ab1.netlify.app/)

---

## Features

- Excel Parsing: Upload Excel files (.xlsx, .xls) with student data.  
- Word Template Processing: Use .docx templates with placeholders like `{{name}}`, `{{grade}}`, etc.  
- Multiple Output Formats: Generate certificates as Word (.docx) or PDF files.  
- Client-Side Only: Everything runs in your browser — no data is sent to servers.  
- Batch Processing: Generate certificates for multiple students at once.  
- Responsive Design: Works on both desktop and mobile devices.  
- Data Privacy: 100% client-side — your data never leaves your browser.  
- Fast and Reliable: Optimized performance with instant generation.  

---

## Quick Start

### Prerequisites
- Node.js (v16 or higher)  
- npm or yarn  

### Try It Now
1. Visit the live demo.  
2. Upload sample files from the `examples/` folder.  
3. Click "Generate & Download as ZIP".  
4. Done!  

### Installation

```bash
# Clone the repository
git clone [https://github.com/Ahmed-AbdullahCreates/Certificate-Generation-system.git](https://github.com/Ahmed-AbdullahCreates/Certificate-Generation-system.git)
cd Certificate-Generation-system

# Install dependencies
npm install

# Start development server
npm run dev
````

Then open your browser at [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173).

-----

## How to Use

### Step 1: Prepare Excel File

Create an Excel file with student data. Example:

| name | course | grade | date |
|------|---------|--------|------|
| Ahmed Ali | AI Fundamentals | A+ | 2025-05-10 |

Note: Column headers will be used as placeholder names.

-----

### Step 2: Create Word Template

Create a Word document (.docx) with placeholders using double curly braces:

```
CERTIFICATE OF ACHIEVEMENT

This certifies that {{name}} has successfully completed {{course}}
with a grade of {{grade}} on {{date}}.

Congratulations on your achievement!
```

Tip: Design it nicely in Word using fonts, colors, borders, and your institution’s logo.

-----

### Step 3: Generate Certificates

1.  Upload your Excel file.
2.  Upload your Word template.
3.  Choose output format (Word, PDF, or both).
4.  Click "Generate & Download as ZIP".
5.  Get a ZIP file containing all certificates.

-----

## Certificate Design

Here is an example of the PDF certificate design:

![Sample PDF Certificate](assets/certificate-demo.png)
Generated PDFs feature:

  - Professional decorative borders
  - Elegant gold accent dividers
  - Gradient backgrounds
  - Georgia serif font for formal appearance
  - Signature section with date
  - Landscape A4 format

-----

## Project Structure

```
Certificate-Generation-system/
├── index.html # Main HTML file
├── app.js # Core logic
├── styles.css # Styling
├── package.json # Dependencies
├── vite.config.js # Build configuration
├── netlify.toml # Deployment settings
├── examples/ # Sample files
│ ├── students.xlsx # Sample Excel data
│ └── template.docx # Sample certificate template
└── README.md # Project documentation
```

-----

## Technologies Used

  - Vanilla JavaScript – Lightweight and framework-free
  - Vite – Fast development and build tool
  - xlsx – Excel file parsing
  - docxtemplater & pizzip – Word template manipulation
  - jsPDF & html2canvas – PDF generation and rendering
  - JSZip – ZIP file creation
  - file-saver – File download functionality

-----

## Customization

### Modify Certificate Design

  - For DOCX output, customize your Word template with fonts, colors, borders, and logos.
  - For PDF output, edit the `generatePdfCertificate` function in `app.js` to change layout, colors, and formatting.

### Tips

  - Use professional fonts (Times New Roman, Georgia).
  - Include your institution’s branding.
  - Keep templates clean and minimal for best results.

-----

## Troubleshooting

### Excel Not Parsing

  - Ensure file is `.xlsx` or `.xls`.
  - First row must contain headers.
  - Avoid merged cells or special characters in header names.

### Template Not Working

  - Must be a `.docx` file (not `.doc`).
  - Placeholders must use double curly braces: `{{name}}`.
  - Placeholder names must match Excel column headers exactly.

### PDF or Download Issues

  - Allow pop-ups and downloads in your browser.
  - Use Chrome, Edge, or Firefox.
  - Check available disk space.

-----

## Build for Production

```bash
npm run build
```

This creates an optimized `dist/` folder.
Deploy the folder to any static hosting service such as:

  - GitHub Pages
  - Netlify
  - AWS S3
  - Any web server

-----

## Contributing

Contributions are welcome\!
Feel free to:

  - Report bugs
  - Suggest features
  - Submit pull requests

-----

## License

MIT License – Free to use for any purpose.

