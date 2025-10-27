import * as XLSX from "xlsx";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Global state
let studentData = [];
let templateFile = null;

// DOM Elements
const excelFileInput = document.getElementById("excelFile");
const templateFileInput = document.getElementById("templateFile");
const generateBtn = document.getElementById("generateBtn");
const excelPreview = document.getElementById("excelPreview");
const templatePreview = document.getElementById("templatePreview");
const progressSection = document.getElementById("progressSection");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const resultsSection = document.getElementById("resultsSection");
const resultsSummary = document.getElementById("resultsSummary");

// Event Listeners
excelFileInput.addEventListener("change", handleExcelUpload);
templateFileInput.addEventListener("change", handleTemplateUpload);
generateBtn.addEventListener("click", generateCertificates);

/**
 * Handle Excel file upload and parsing
 */
async function handleExcelUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert to JSON
    studentData = XLSX.utils.sheet_to_json(worksheet);

    // Display preview
    displayExcelPreview(studentData);

    // Show success message
    showFileSelected(excelPreview, file.name, studentData.length);

    // Check if we can enable generate button
    checkGenerateButton();
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    alert(
      "Error parsing Excel file. Please make sure it's a valid .xlsx or .xls file."
    );
  }
}

/**
 * Handle Word template upload
 */
async function handleTemplateUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    templateFile = file;

    // Read file to validate it's a valid docx
    const content = await file.arrayBuffer();
    const zip = new PizZip(content);

    // Extract placeholders from the template
    const placeholders = extractPlaceholders(zip);

    // Display preview
    displayTemplatePreview(file.name, placeholders);

    // Check if we can enable generate button
    checkGenerateButton();
  } catch (error) {
    console.error("Error reading template file:", error);
    alert(
      "Error reading template file. Please make sure it's a valid .docx file."
    );
  }
}

/**
 * Display Excel data preview
 */
function displayExcelPreview(data) {
  if (data.length === 0) {
    excelPreview.innerHTML =
      '<p style="color: #ef4444;">No data found in Excel file.</p>';
    excelPreview.classList.add("active");
    return;
  }

  const keys = Object.keys(data[0]);
  const previewData = data.slice(0, 5); // Show first 5 rows

  let html = "<h4>📊 Data Preview (showing first 5 rows)</h4>";
  html += '<div class="preview-table"><table>';

  // Header
  html += "<thead><tr>";
  keys.forEach((key) => {
    html += `<th>${key}</th>`;
  });
  html += "</tr></thead>";

  // Body
  html += "<tbody>";
  previewData.forEach((row) => {
    html += "<tr>";
    keys.forEach((key) => {
      html += `<td>${row[key] || ""}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table></div>";

  if (data.length > 5) {
    html += `<p style="margin-top: 12px; color: #6b7280; font-size: 0.9rem;">... and ${
      data.length - 5
    } more rows</p>`;
  }

  excelPreview.innerHTML = html;
  excelPreview.classList.add("active");
}

/**
 * Display template preview
 */
function displayTemplatePreview(fileName, placeholders) {
  let html = '<div class="file-selected">';
  html += `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM8 14L4 10L5.41 8.59L8 11.17L14.59 4.58L16 6L8 14Z" fill="currentColor"/>
             </svg>`;
  html += `<span>${fileName}</span></div>`;

  if (placeholders.length > 0) {
    html += '<h4 style="margin-top: 16px;">🏷️ Detected Placeholders:</h4>';
    html +=
      '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">';
    placeholders.forEach((placeholder) => {
      html += `<code style="background: white; padding: 4px 12px; border-radius: 4px; font-size: 0.9rem;">{{${placeholder}}}</code>`;
    });
    html += "</div>";
  }

  templatePreview.innerHTML = html;
  templatePreview.classList.add("active");
}

/**
 * Show file selected message
 */
function showFileSelected(container, fileName, rowCount) {
  const message = document.createElement("div");
  message.className = "file-selected";
  message.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM8 14L4 10L5.41 8.59L8 11.17L14.59 4.58L16 6L8 14Z" fill="currentColor"/>
        </svg>
        <span>${fileName} - ${rowCount} students found</span>
    `;
}

/**
 * Extract placeholders from docx template
 */
function extractPlaceholders(zip) {
  try {
    // Read the document.xml from the DOCX (which is a ZIP file)
    const documentXml = zip.files["word/document.xml"];
    if (!documentXml) {
      console.warn("document.xml not found in template");
      return [];
    }

    const xmlContent = documentXml.asText();
    const regex = /\{\{([^}]+)\}\}/g;
    const placeholders = new Set();
    let match;

    while ((match = regex.exec(xmlContent)) !== null) {
      placeholders.add(match[1].trim());
    }

    return Array.from(placeholders);
  } catch (error) {
    console.error("Error extracting placeholders:", error);
    return [];
  }
}

/**
 * Check if generate button should be enabled
 */
function checkGenerateButton() {
  if (studentData.length > 0 && templateFile) {
    generateBtn.disabled = false;
  }
}

/**
 * Generate certificates for all students
 */
async function generateCertificates() {
  const format = document.querySelector('input[name="format"]:checked').value;

  // Reset UI
  progressSection.style.display = "block";
  resultsSection.style.display = "none";
  generateBtn.disabled = true;

  let successCount = 0;
  const totalStudents = studentData.length;

  try {
    for (let i = 0; i < studentData.length; i++) {
      const student = studentData[i];

      // Update progress
      const progress = ((i + 1) / totalStudents) * 100;
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `Processing ${
        i + 1
      } of ${totalStudents} certificates...`;

      // Generate certificate based on format
      if (format === "docx" || format === "both") {
        await generateDocxCertificate(student);
      }

      if (format === "pdf" || format === "both") {
        await generatePdfCertificate(student);
      }

      successCount++;

      // Small delay to prevent browser from freezing
      await sleep(100);
    }

    // Show success message
    resultsSection.style.display = "block";
    resultsSummary.textContent = `Successfully generated ${successCount} certificate(s) in ${
      format === "both" ? "Word and PDF" : format.toUpperCase()
    } format!`;
  } catch (error) {
    console.error("Error generating certificates:", error);
    alert(`Error generating certificates: ${error.message}`);
  } finally {
    generateBtn.disabled = false;
    progressSection.style.display = "none";
  }
}

/**
 * Generate DOCX certificate
 */
async function generateDocxCertificate(studentData) {
  try {
    // Read template file
    const content = await templateFile.arrayBuffer();
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Replace placeholders with student data
    doc.render(studentData);

    // Generate blob
    const blob = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Download file
    const fileName = `${sanitizeFileName(
      studentData.name || "certificate"
    )}_certificate.docx`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error("Error generating DOCX:", error);
    throw new Error(
      `Failed to generate DOCX for ${studentData.name}: ${error.message}`
    );
  }
}

/**
 * Generate PDF certificate
 * Enhanced professional design with elegant styling
 */
async function generatePdfCertificate(studentData) {
  try {
    // Create a temporary div to render certificate
    const tempDiv = document.createElement("div");
    tempDiv.style.cssText = `
            position: absolute;
            left: -9999px;
            width: 1000px;
            height: 707px;
            background: white;
            font-family: 'Georgia', 'Times New Roman', serif;
            color: #000;
        `;

    // Create certificate content with enhanced professional design
    tempDiv.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                padding: 50px;
                box-sizing: border-box;
                position: relative;
            ">
                <!-- Decorative corner borders -->
                <div style="
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    width: 80px;
                    height: 80px;
                    border-top: 4px solid #2c5aa0;
                    border-left: 4px solid #2c5aa0;
                "></div>
                <div style="
                    position: absolute;
                    top: 30px;
                    right: 30px;
                    width: 80px;
                    height: 80px;
                    border-top: 4px solid #2c5aa0;
                    border-right: 4px solid #2c5aa0;
                "></div>
                <div style="
                    position: absolute;
                    bottom: 30px;
                    left: 30px;
                    width: 80px;
                    height: 80px;
                    border-bottom: 4px solid #2c5aa0;
                    border-left: 4px solid #2c5aa0;
                "></div>
                <div style="
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                    width: 80px;
                    height: 80px;
                    border-bottom: 4px solid #2c5aa0;
                    border-right: 4px solid #2c5aa0;
                "></div>
                
                <!-- Main content border -->
                <div style="
                    border: 3px double #2c5aa0;
                    padding: 40px;
                    height: 100%;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    background: white;
                ">
                    <!-- Top decorative line -->
                    <div style="
                        width: 150px;
                        height: 3px;
                        background: linear-gradient(90deg, transparent, #c9a961, transparent);
                        margin: 0 auto 20px auto;
                    "></div>
                    
                    <!-- Title -->
                    <h1 style="
                        font-size: 52px;
                        font-weight: 700;
                        color: #2c5aa0;
                        margin: 0 0 10px 0;
                        letter-spacing: 4px;
                        text-transform: uppercase;
                        font-family: 'Georgia', serif;
                    ">Certificate</h1>
                    
                    <p style="
                        font-size: 20px;
                        color: #666;
                        margin: 0 0 30px 0;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                        font-weight: 400;
                    ">of Achievement</p>
                    
                    <!-- Divider -->
                    <div style="
                        width: 100px;
                        height: 2px;
                        background: #c9a961;
                        margin: 0 auto 30px auto;
                    "></div>
                    
                    <!-- Content -->
                    <p style="
                        font-size: 16px;
                        color: #444;
                        margin: 0 0 20px 0;
                        font-style: italic;
                    ">This is to certify that</p>
                    
                    <h2 style="
                        font-size: 42px;
                        font-weight: 700;
                        color: #1a1a1a;
                        margin: 0 0 30px 0;
                        font-family: 'Georgia', serif;
                        border-bottom: 2px solid #c9a961;
                        display: inline-block;
                        padding: 0 40px 10px 40px;
                    ">${studentData.name || "Student Name"}</h2>
                    
                    <p style="
                        font-size: 16px;
                        color: #444;
                        margin: 0 0 15px 0;
                    ">has successfully completed the course</p>
                    
                    <h3 style="
                        font-size: 28px;
                        font-weight: 600;
                        color: #2c5aa0;
                        margin: 0 0 25px 0;
                        font-family: 'Georgia', serif;
                    ">${studentData.course || "Course Name"}</h3>
                    
                    ${
                      studentData.grade
                        ? `<p style="
                            font-size: 18px;
                            color: #444;
                            margin: 0 0 20px 0;
                        ">with a grade of <span style="
                            font-weight: 700;
                            color: #2c5aa0;
                            font-size: 22px;
                        ">${studentData.grade}</span></p>`
                        : ""
                    }
                    
                    <!-- Bottom decorative line -->
                    <div style="
                        width: 150px;
                        height: 3px;
                        background: linear-gradient(90deg, transparent, #c9a961, transparent);
                        margin: 25px auto 20px auto;
                    "></div>
                    
                    <!-- Date and signature section -->
                    <div style="
                        display: flex;
                        justify-content: space-around;
                        margin-top: 30px;
                        padding: 0 60px;
                    ">
                        <div style="text-align: center;">
                            <div style="
                                width: 200px;
                                border-top: 2px solid #333;
                                margin-bottom: 8px;
                            "></div>
                            <p style="
                                font-size: 12px;
                                color: #666;
                                margin: 0;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">Date</p>
                            ${
                              studentData.date
                                ? `<p style="
                                    font-size: 14px;
                                    color: #333;
                                    margin: 5px 0 0 0;
                                    font-weight: 600;
                                ">${studentData.date}</p>`
                                : ""
                            }
                        </div>
                        <div style="text-align: center;">
                            <div style="
                                width: 200px;
                                border-top: 2px solid #333;
                                margin-bottom: 8px;
                            "></div>
                            <p style="
                                font-size: 12px;
                                color: #666;
                                margin: 0;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                            ">Authorized Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(tempDiv);

    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    // Remove temp div
    document.body.removeChild(tempDiv);

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Download file
    const fileName = `${sanitizeFileName(
      studentData.name || "certificate"
    )}_certificate.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error(
      `Failed to generate PDF for ${studentData.name}: ${error.message}`
    );
  }
}

/**
 * Sanitize file name
 */
function sanitizeFileName(name) {
  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_-]/g, "")
    .substring(0, 50);
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initialize
console.log("Certificate Generator initialized ✅");
