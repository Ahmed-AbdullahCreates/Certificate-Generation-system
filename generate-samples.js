/**
 * This script generates sample files for testing the certificate generator
 * Run with: node generate-samples.js
 */

import XLSX from 'xlsx';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sample student data
const students = [
    {
        name: 'John Doe',
        course: 'Web Development',
        grade: 'A+',
        date: '2025-10-27'
    },
    {
        name: 'Jane Smith',
        course: 'Data Science',
        grade: 'A',
        date: '2025-10-27'
    },
    {
        name: 'Bob Johnson',
        course: 'Machine Learning',
        grade: 'B+',
        date: '2025-10-27'
    },
    {
        name: 'Alice Williams',
        course: 'Cybersecurity',
        grade: 'A+',
        date: '2025-10-27'
    },
    {
        name: 'Charlie Brown',
        course: 'Cloud Computing',
        grade: 'A-',
        date: '2025-10-27'
    }
];

/**
 * Generate sample Excel file
 */
function generateExcelFile() {
    console.log('Generating sample Excel file...');
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Convert students array to worksheet
    const ws = XLSX.utils.json_to_sheet(students);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    
    // Write to file
    const outputPath = join(__dirname, 'examples', 'students.xlsx');
    XLSX.writeFile(wb, outputPath);
    
    console.log(`✅ Sample Excel file created: ${outputPath}`);
}

/**
 * Generate sample Word template
 * Note: This creates a simple text-based template
 * For a more professional template, create it manually in Word
 */
function generateWordTemplate() {
    console.log('Generating sample Word template...');
    
    // Create a simple template content
    // Note: For a real docx with formatting, you'd need to start with a proper template
    const templateContent = `








                           CERTIFICATE OF ACHIEVEMENT
                           ═══════════════════════════





                              This is to certify that

                                    {{name}}

                       has successfully completed the course

                                   {{course}}

                  with outstanding performance, achieving

                                 Grade: {{grade}}

                             Completion Date: {{date}}




     We congratulate you on your achievement and wish you continued success!




    _____________________                           _____________________
      Director Signature                                    Date
`;

    // Create a minimal valid DOCX structure
    const docxContent = createMinimalDocx(templateContent);
    
    const outputPath = join(__dirname, 'examples', 'template.docx');
    fs.writeFileSync(outputPath, docxContent);
    
    console.log(`✅ Sample Word template created: ${outputPath}`);
    console.log('⚠️  Note: For best results, open this file in Word and apply formatting (fonts, colors, borders)');
}

/**
 * Create a minimal DOCX file
 */
function createMinimalDocx(content) {
    // This is a very basic DOCX structure
    // For production use, create the template manually in Word
    
    const zip = new PizZip();
    
    // [Content_Types].xml
    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);
    
    // _rels/.rels
    zip.folder('_rels').file('.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);
    
    // word/_rels/document.xml.rels
    zip.folder('word').folder('_rels').file('document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);
    
    // word/document.xml
    const paragraphs = content.split('\n').map(line => 
        `<w:p><w:r><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`
    ).join('');
    
    zip.folder('word').file('document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
    <w:body>
        ${paragraphs}
    </w:body>
</w:document>`);
    
    return zip.generate({ type: 'nodebuffer' });
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

// Run the generators
try {
    generateExcelFile();
    generateWordTemplate();
    console.log('\n✅ Sample files generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Open examples/template.docx in Microsoft Word');
    console.log('   2. Apply formatting (fonts, colors, borders, logos)');
    console.log('   3. Save the file');
    console.log('   4. Use both files to test the certificate generator\n');
} catch (error) {
    console.error('❌ Error generating sample files:', error);
}
