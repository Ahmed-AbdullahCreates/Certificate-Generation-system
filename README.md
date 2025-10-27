# 📜 Certificate Generator# Certificate Generator 📜



A **100% client-side** web application that generates beautiful PDF certificates from Excel data and Word templates. No backend server required - everything runs in your browser!A **100% client-side** web application that generates personalized certificates from Excel data and Word templates. No backend server required!



🌐 **Live Demo:** [Certificate Generator](https://heroic-bombolone-092ab1.netlify.app/)## ✨ Features



## ✨ Features- 📊 **Excel Parsing**: Upload Excel files (.xlsx, .xls) with student data

- 📄 **Word Template Processing**: Use .docx templates with placeholders like `{{name}}`, `{{grade}}`, etc.

- Upload Excel files with student data-  **Multiple Output Formats**: Generate certificates as Word (.docx) or PDF files

- 📄 Use Word templates with placeholders like `{{name}}`, `{{grade}}`-  **Client-Side Only**: Everything runs in your browser - no data sent to servers

-  Generate beautiful PDF certificates with professional design-  **Responsive Design**: Works on desktop and mobile devices

- Download all certificates as a single ZIP file-  **Batch Processing**: Generate certificates for multiple students at once

- 100% client-side - your data never leaves your browser

-  Fast and responsive##  Quick Start



##  Quick Start### Prerequisites



### Try It Now (No Installation)- Node.js (v16 or higher)

- npm or yarn

1. Visit the live demo

2. Upload sample files from `examples/` folder### Installation

3. Click "Generate & Download as ZIP"

4. Done! ✅1. **Clone or download the project**



### Run Locally2. **Install dependencies**:

   ```bash

```bash   npm install

# Clone the repository   ```

git clone https://github.com/Ahmed-AbdullahCreates/Certificate-Generation-system.git

cd Certificate-Generation-system3. **Run the development server**:

   ```bash

# Install dependencies   npm run dev

npm install   ```



# Start development server4. **Open your browser** and navigate to the local server URL (usually `http://localhost:5173`)

npm run dev

```## 📖 How to Use



Visit `http://localhost:5173`### Step 1: Prepare Your Excel File



## 📖 How to UseCreate an Excel file with student data. Example columns:



### Step 1: Prepare Excel File| name          | course           | grade | date       |

### Step 2: Create Your Word Template

**Important:** Column headers will be used as placeholder names.

Create a Word document (.docx) with placeholders using double curly braces:

### Step 3: Create Word Template

```

Create a `.docx` file with placeholders:CERTIFICATE OF ACHIEVEMENT



```This certifies that {{name}} has successfully completed

CERTIFICATE OF ACHIEVEMENT{{course}} with a grade of {{grade}} on {{date}}.



This certifies that {{name}} has successfully completedCongratulations on your achievement!

{{course}} with a grade of {{grade}} on {{date}}.```

```

**Placeholder format**: `{{columnName}}`

**Tip:** Design it nicely in Word with fonts, colors, and borders!

### Step 3: Generate Certificates

### Step 3: Generate Certificates

1. Upload your Excel file

1. Upload your Excel file2. Upload your Word template

2. Upload your Word template3. Choose output format (Word, PDF, or both)

3. Click "Generate & Download as ZIP"4. Click "Generate Certificates"

4. Get a ZIP file with all PDF certificates!5. Files will be automatically downloaded to your computer



## 🎨 Certificate Design## 📁 Project Structure



Generated PDFs feature:```

- Professional decorative corner borderscertificate-generator/

- Elegant gold accent dividers├── index.html          # Main HTML file

- Gradient background├── styles.css          # Application styles

- Georgia serif font for formal look├── app.js             # Main JavaScript logic

- Signature section with date├── package.json       # Dependencies

- Landscape A4 format├── examples/          # Sample files

│   ├── students.xlsx  # Sample Excel data

## 🛠️ Tech Stack│   └── template.docx  # Sample certificate template

└── README.md          # This file

- **Vanilla JavaScript** - No framework overhead```

- **Vite** - Fast development and building

- **xlsx** - Excel file parsing## 🛠️ Technologies Used

- **docxtemplater** - Template processing

- **jsPDF** - PDF generation- **xlsx**: Excel file parsing

- **html2canvas** - PDF rendering- **docxtemplater**: Word template manipulation

- **JSZip** - ZIP file creation- **pizzip**: ZIP file handling (required for .docx)

- **jspdf**: PDF generation

## 📁 Project Structure- **html2canvas**: HTML to canvas conversion

- **file-saver**: File download functionality

```- **Vite**: Development server and build tool

Certificate-Generation-system/

├── index.html          # Main application## 🎨 Customization

├── app.js             # Core logic

├── styles.css         # Styling### Modify Certificate Design

├── package.json       # Dependencies

├── vite.config.js     # Build configFor DOCX output, design your certificate in Microsoft Word with:

├── netlify.toml       # Deployment config- Custom fonts, colors, and layouts

├── examples/          # Sample files- Images and logos

│   ├── students.xlsx  # Sample data- Borders and shapes

│   └── template.docx  # Sample template- Any Word formatting you want

└── README.md          # This file

```For PDF output, modify the `generatePdfCertificate` function in `app.js` to customize the layout.

## 💡 Tips

_____________________

### Better TemplatesSignature

```

- Use professional fonts (Times New Roman, Georgia)

- Add your institution's logo## 🔧 Troubleshooting

- Include decorative borders

- Use landscape orientation### Excel file not parsing

- Ensure the file is .xlsx or .xls format

### Column Naming- Check that the first row contains column headers

- Make sure there's no merged cells in the header row

- Use simple names: `name`, `grade`, `course`

- Avoid spaces and special characters### Template not working

- Keep them lowercase- Verify the file is .docx format (not .doc)

- Check that placeholders use double curly braces: `{{name}}`

### Testing- Ensure placeholder names match Excel column headers exactly



- Start with 2-3 students### PDF generation issues

- Verify the template looks correct- PDFs use a simplified layout based on the data

- Then process the full list- For complex designs, use DOCX format instead

- Ensure browser allows pop-ups/downloads

## 🐛 Troubleshooting

## 🚀 Building for Production

### Excel not parsing

- Ensure file is `.xlsx` or `.xls````bash

- First row must contain headersnpm run build

- No merged cells in header row```



### Template not workingThis creates a `dist/` folder with optimized files. Deploy these files to any static hosting service:

- File must be `.docx` (not `.doc`)- GitHub Pages

- Use `{{placeholder}}` format (double curly braces)- Netlify

- Placeholder names must match Excel columns exactly- AWS S3

- Any web server

### Downloads not working

- Allow pop-ups/downloads in browser## 📄 License

- Try Chrome or Edge

- Check available disk spaceMIT License - Feel free to use this project for any purpose!



### CommandsContributions are welcome! Feel free to:

- Report bugs

```bash- Suggest new features

npm run dev      # Start development server- Submit pull requests

npm run build    # Build for production

npm run preview  # Preview production build##

💡 Tips

```

1. **Test with small data first**: Try with 2-3 students before processing hundreds

### Making Changes2. **Keep templates simple**: Complex Word formatting might not always transfer perfectly to PDF

3. **Use consistent naming**: Column headers should be simple (no spaces or special characters work best)

```bash4. **Browser compatibility**: Works best in modern browsers (Chrome, Firefox, Edge)

git add .

git commit -m "Your changes"

git push

# Netlify auto-deploys in ~2 minutes!
```

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - Free to use for any purpose!

