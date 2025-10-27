# Technical Documentation

## Architecture Overview

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Vanilla JavaScript (ES6+) | Core application logic |
| **Build Tool** | Vite 5.x | Development server & bundling |
| **Excel Parsing** | xlsx 0.18.x | Read and parse Excel files |
| **Word Processing** | docxtemplater 3.x | Template replacement in DOCX |
| **ZIP Handling** | pizzip 3.x | Handle DOCX file structure |
| **PDF Generation** | jsPDF 2.x | Create PDF documents |
| **HTML to Canvas** | html2canvas 1.x | Render HTML for PDF conversion |
| **File Download** | file-saver 2.x | Trigger file downloads |

### Application Flow

```
User uploads Excel file
        ↓
Parse Excel → Extract student data → Store in memory
        ↓
User uploads DOCX template
        ↓
Validate template → Extract placeholders → Store in memory
        ↓
User clicks "Generate"
        ↓
For each student:
    ├─→ Clone template
    ├─→ Replace placeholders with student data
    ├─→ Generate DOCX blob
    └─→ If PDF selected: Render to HTML → Canvas → PDF
        ↓
    Download file(s)
```

## File Structure

```
Potintial/
├── index.html              # Main HTML - UI structure
├── app.js                  # Core logic - Main application
├── styles.css              # Styling - UI design
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── generate-samples.js     # Sample file generator
├── .gitignore             # Git ignore rules
├── README.md              # Main documentation
├── QUICKSTART.md          # Quick setup guide
├── USAGE_GUIDE.md         # Detailed usage instructions
└── examples/              # Sample files directory
    ├── students.xlsx      # Sample student data
    ├── template.docx      # Sample certificate template
    └── template_instructions.md
```

## Core Functions

### Excel Processing

```javascript
// Function: handleExcelUpload()
// Purpose: Parse uploaded Excel file
// Input: File object from input element
// Output: Array of student objects
// Dependencies: xlsx library

async function handleExcelUpload(event) {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    studentData = XLSX.utils.sheet_to_json(worksheet);
}
```

### Template Processing

```javascript
// Function: handleTemplateUpload()
// Purpose: Validate and store DOCX template
// Input: File object from input element
// Output: Stored template file + extracted placeholders
// Dependencies: pizzip, docxtemplater

async function handleTemplateUpload(event) {
    const file = event.target.files[0];
    templateFile = file;
    const content = await file.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);
    const placeholders = extractPlaceholders(doc);
}
```

### Certificate Generation (DOCX)

```javascript
// Function: generateDocxCertificate()
// Purpose: Generate personalized DOCX certificate
// Input: Student data object
// Output: Downloaded DOCX file
// Dependencies: docxtemplater, pizzip, file-saver

async function generateDocxCertificate(studentData) {
    const content = await templateFile.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);
    doc.render(studentData);
    const blob = doc.getZip().generate({ type: 'blob' });
    saveAs(blob, `${studentData.name}_certificate.docx`);
}
```

### Certificate Generation (PDF)

```javascript
// Function: generatePdfCertificate()
// Purpose: Generate PDF certificate from data
// Input: Student data object
// Output: Downloaded PDF file
// Dependencies: html2canvas, jspdf

async function generatePdfCertificate(studentData) {
    // Create HTML representation
    const tempDiv = createCertificateHTML(studentData);
    document.body.appendChild(tempDiv);
    
    // Convert to canvas
    const canvas = await html2canvas(tempDiv);
    
    // Convert to PDF
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save(`${studentData.name}_certificate.pdf`);
}
```

## Data Flow

### State Management

```javascript
// Global application state
let studentData = [];      // Array of student objects from Excel
let templateFile = null;   // DOCX template file object
```

### Student Data Structure

```javascript
// Example student object (from Excel)
{
    name: "John Doe",
    course: "Web Development",
    grade: "A+",
    date: "2025-10-27",
    // ... any other columns from Excel
}
```

### Template Structure (DOCX)

```
DOCX file = ZIP archive containing:
├── [Content_Types].xml     # File type definitions
├── _rels/                  # Relationships
│   └── .rels
├── word/                   # Main document content
│   ├── document.xml        # Actual text and structure
│   ├── styles.xml          # Style definitions
│   ├── _rels/
│   └── media/              # Embedded images
└── docProps/               # Document properties
```

## Browser Compatibility

### Supported Browsers

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ⚠️ Partial* |
| Opera | 76+ | ✅ Full |

*Safari may have issues with some file downloads

### Required Browser Features

- ES6+ JavaScript support
- FileReader API
- Blob API
- Canvas API
- Modern CSS (Grid, Flexbox)
- ES6 Modules

## Performance Considerations

### File Size Limits

| File Type | Recommended Max | Technical Max |
|-----------|----------------|---------------|
| Excel | 5 MB | 50 MB |
| Template | 2 MB | 10 MB |
| Students | 1000 rows | 10000 rows |

### Processing Time

- **Excel parsing**: ~0.1s per MB
- **DOCX generation**: ~0.5s per certificate
- **PDF generation**: ~1-2s per certificate
- **Large batches**: Use progress indicator

### Memory Usage

```javascript
// Approximate memory per certificate
DOCX: ~50-200 KB
PDF: ~100-500 KB
In-memory processing: ~1 MB per 10 students
```

### Optimization Tips

1. **Process in batches**: Don't load all at once
2. **Use delays**: `await sleep(100)` prevents browser freeze
3. **Cleanup**: Remove temporary DOM elements
4. **Limit preview**: Show only first 5 rows in preview

## Security Considerations

### Client-Side Security

✅ **Secure:**
- No server communication
- No data persistence
- No external API calls
- Files processed in memory only

⚠️ **User Responsibility:**
- File content validation
- Malicious template detection
- User-provided data sanitization

### File Validation

```javascript
// Current validation
✅ File extension check (.xlsx, .docx)
✅ File type validation (MIME)
✅ Structural validation (ZIP for DOCX)

// Recommended additions for production
⚠️ File size limits
⚠️ Content sanitization
⚠️ Macro detection (DOCX)
```

## Error Handling

### Current Error Handling

```javascript
try {
    // File processing
} catch (error) {
    console.error('Error:', error);
    alert(`Error: ${error.message}`);
}
```

### Error Types

| Error | Cause | Solution |
|-------|-------|----------|
| Parse error | Invalid Excel format | Use valid .xlsx/.xls |
| Template error | Invalid DOCX structure | Re-save in Word |
| Placeholder error | Mismatched names | Check column names |
| Memory error | Too many students | Process in smaller batches |
| Download error | Browser blocking | Check browser settings |

## API Reference

### Global Functions

#### `handleExcelUpload(event)`
Handles Excel file upload and parsing.

**Parameters:**
- `event`: File input change event

**Returns:** void

**Side effects:**
- Updates `studentData` global array
- Updates UI preview

---

#### `handleTemplateUpload(event)`
Handles DOCX template upload and validation.

**Parameters:**
- `event`: File input change event

**Returns:** void

**Side effects:**
- Updates `templateFile` global variable
- Updates UI preview

---

#### `generateCertificates()`
Main function to generate all certificates.

**Parameters:** none

**Returns:** Promise<void>

**Process:**
1. Get selected format (DOCX/PDF/both)
2. Loop through all students
3. Generate certificate for each
4. Update progress bar
5. Download files

---

#### `generateDocxCertificate(studentData)`
Generate a single DOCX certificate.

**Parameters:**
- `studentData`: Object with student information

**Returns:** Promise<void>

**Downloads:** DOCX file

---

#### `generatePdfCertificate(studentData)`
Generate a single PDF certificate.

**Parameters:**
- `studentData`: Object with student information

**Returns:** Promise<void>

**Downloads:** PDF file

---

### Utility Functions

#### `extractPlaceholders(doc)`
Extract placeholder names from template.

**Parameters:**
- `doc`: Docxtemplater instance

**Returns:** Array<string> - Placeholder names

---

#### `sanitizeFileName(name)`
Clean filename for safe file download.

**Parameters:**
- `name`: Original filename

**Returns:** string - Sanitized filename

---

#### `sleep(ms)`
Async delay utility.

**Parameters:**
- `ms`: Milliseconds to wait

**Returns:** Promise<void>

## Extending the Application

### Adding New Output Formats

```javascript
// Add support for new format (e.g., PNG)
async function generatePngCertificate(studentData) {
    const tempDiv = createCertificateHTML(studentData);
    document.body.appendChild(tempDiv);
    const canvas = await html2canvas(tempDiv);
    document.body.removeChild(tempDiv);
    
    canvas.toBlob(blob => {
        saveAs(blob, `${studentData.name}_certificate.png`);
    });
}
```

### Adding Data Validation

```javascript
function validateStudentData(data) {
    return data.every(student => {
        return student.name && 
               student.name.trim() !== '' &&
               typeof student.name === 'string';
    });
}
```

### Adding Custom Placeholders

```javascript
// Add computed fields
function enrichStudentData(student) {
    return {
        ...student,
        fullDate: new Date(student.date).toLocaleDateString(),
        upperName: student.name.toUpperCase(),
        certificateId: generateId()
    };
}
```

### Adding Email Integration

```javascript
// Future feature: Email certificates
async function emailCertificate(studentData, pdfBlob) {
    // Would require backend service
    // Could integrate with EmailJS or similar
}
```

## Testing

### Manual Testing Checklist

- [ ] Upload valid Excel file
- [ ] Upload valid DOCX template
- [ ] Generate DOCX certificates
- [ ] Generate PDF certificates
- [ ] Generate both formats
- [ ] Test with 1 student
- [ ] Test with 10 students
- [ ] Test with 100+ students
- [ ] Test error handling (invalid files)
- [ ] Test different browsers
- [ ] Test on mobile devices

### Test Data

Use `generate-samples.js` to create test data, or create your own:

```javascript
// Minimal test data
const testData = [
    { name: "Test User", course: "Test Course", grade: "A", date: "2025-10-27" }
];
```

## Deployment

### Build Command

```bash
npm run build
```

### Build Output

```
dist/
├── index.html           # Minified HTML
├── assets/
│   ├── index-[hash].js  # Bundled JavaScript
│   └── index-[hash].css # Bundled CSS
└── examples/           # Sample files (if included)
```

### Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test built version locally
- [ ] Check all assets load correctly
- [ ] Verify file paths are correct
- [ ] Test file uploads work
- [ ] Test certificate generation works
- [ ] Deploy to hosting service
- [ ] Test on production URL
- [ ] Test from different devices

## Troubleshooting Development

### Vite not starting

```bash
# Clear cache
rm -rf node_modules
rm package-lock.json
npm install
```

### Module not found errors

```bash
# Reinstall specific package
npm install xlsx --save
```

### Build errors

```bash
# Check for syntax errors
npm run build -- --debug
```

## Future Enhancements

### Planned Features
- [ ] Batch download as ZIP
- [ ] Certificate preview before download
- [ ] Multiple template support
- [ ] Email integration
- [ ] Certificate numbering/tracking
- [ ] QR code generation
- [ ] Digital signatures
- [ ] Cloud template library
- [ ] Drag-and-drop file upload
- [ ] Dark mode
- [ ] Internationalization (i18n)

### Community Requests
- PDF quality improvements
- More output formats (PNG, SVG)
- Template marketplace
- Mobile app version

## Contributing

If extending this project:

1. Maintain client-side only approach
2. Keep dependencies minimal
3. Support major browsers
4. Document all changes
5. Test thoroughly
6. Update documentation

## License

MIT License - Free to use, modify, and distribute.

---

**Technical documentation last updated: October 27, 2025**
