# Sample Certificate Template Instructions

## How to Create Your Template

1. Open Microsoft Word
2. Create your certificate design
3. Use placeholders for dynamic content:
   - {{name}} - Student's name
   - {{course}} - Course name
   - {{grade}} - Grade received
   - {{date}} - Completion date

## Example Template Text

```
═══════════════════════════════════════════════════════════════

                    CERTIFICATE OF ACHIEVEMENT

═══════════════════════════════════════════════════════════════

                        This is to certify that

                            {{name}}

                has successfully completed the course

                            {{course}}

               with outstanding performance, achieving

                      Grade: {{grade}}

                    Completion Date: {{date}}


We congratulate you on your achievement and wish you continued success!


_____________________                    _____________________
   Director Signature                         Date


═══════════════════════════════════════════════════════════════
```

## Formatting Tips

- Use large, bold fonts for the title
- Center-align the certificate content
- Add borders or decorative elements
- Include your institution's logo (if applicable)
- Use professional fonts like Times New Roman, Arial, or Calibri

## Save Your Template

1. Save the file as **template.docx**
2. Place it in the `examples/` folder
3. Use it when testing the application

## Placeholder Rules

- Must use double curly braces: `{{placeholder}}`
- Placeholder names must match Excel column headers exactly
- Names are case-sensitive
- No spaces inside the braces: `{{name}}` ✅ `{{ name }}` ❌
