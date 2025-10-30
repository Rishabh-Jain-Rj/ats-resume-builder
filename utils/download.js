export const downloadResume = (resumeData, font, format = "pdf") => {
  const fileName = `${resumeData.personalInfo.fullName || "resume"}`;

  if (format === "json") {
    downloadJSON(resumeData, fileName);
  } else if (format === "html") {
    downloadHTML(resumeData, font, fileName);
  } else if (format === "pdf") {
    downloadPDF(resumeData, font, fileName);
  } else if (format === "text") {
    downloadText(resumeData, fileName);
  }
};

const downloadJSON = (data, fileName) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const downloadHTML = (resumeData, font, fileName) => {
  const htmlContent = generateHTMLContent(resumeData, font);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const downloadPDF = (resumeData, font, fileName) => {
  const htmlContent = generateHTMLContent(resumeData, font);
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

const downloadText = (resumeData, fileName) => {
  const textContent = generateTextContent(resumeData);
  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const getFontFamily = (font) => {
  const fontMap = {
    calibri: "'Calibri', 'Segoe UI', sans-serif",
    arial: "'Arial', sans-serif",
    helvetica: "'Helvetica', 'Arial', sans-serif",
    times: "'Times New Roman', serif",
    georgia: "'Georgia', serif",
    verdana: "'Verdana', sans-serif",
  };
  return fontMap[font] || fontMap.calibri;
};

function generateHTMLContent(resumeData, font) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const fontFamily = getFontFamily(font);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.personalInfo.fullName} - Resume</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: ${fontFamily};
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 8px;
          color: #1a1a1a;
        }
        h2 {
          font-size: 14px;
          margin-top: 20px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #1a1a1a;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
          font-weight: bold;
        }
        .header {
          margin-bottom: 24px;
          border-bottom: 2px solid #333;
          padding-bottom: 16px;
        }
        .contact {
          font-size: 12px;
          color: #555;
          margin-top: 4px;
        }
        .contact span {
          margin: 0 4px;
        }
        .summary {
          margin-bottom: 20px;
          font-size: 13px;
          line-height: 1.6;
        }
        .section {
          margin-bottom: 20px;
        }
        .entry {
          margin-bottom: 16px;
        }
        .entry-title {
          font-weight: bold;
          font-size: 13px;
          color: #1a1a1a;
        }
        .entry-subtitle {
          font-size: 12px;
          color: #555;
          font-weight: bold;
          margin-top: 2px;
        }
        .entry-date {
          font-size: 11px;
          color: #555;
          float: right;
        }
        .entry-description {
          font-size: 12px;
          margin-top: 6px;
          line-height: 1.5;
        }
        .bullet-point {
          margin-left: 20px;
          margin-top: 4px;
          font-size: 12px;
          line-height: 1.5;
        }
        .skills-category {
          margin-bottom: 8px;
        }
        .skills-category-name {
          font-size: 11px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .skills-list {
          font-size: 12px;
          margin-top: 2px;
        }
        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${resumeData.personalInfo.fullName}</h1>
        <div class="contact">
          ${
            resumeData.personalInfo.email
              ? `<span>${resumeData.personalInfo.email}</span>`
              : ""
          }
          ${
            resumeData.personalInfo.phone
              ? `<span>•</span><span>${resumeData.personalInfo.phone}</span>`
              : ""
          }
          ${
            resumeData.personalInfo.location
              ? `<span>•</span><span>${resumeData.personalInfo.location}</span>`
              : ""
          }
        </div>
      </div>

      ${
        resumeData.personalInfo.summary
          ? `
        <div class="summary">
          ${resumeData.personalInfo.summary}
        </div>
      `
          : ""
      }

      ${
        resumeData.experience && resumeData.experience.length > 0
          ? `
        <h2>Work Experience</h2>
        <div class="section">
          ${resumeData.experience
            .map(
              (exp) => `
            <div class="entry">
              <div class="entry-title">${exp.position}</div>
              <div class="entry-date">${formatDate(exp.startDate)} - ${
                exp.isCurrentRole ? "Present" : formatDate(exp.endDate)
              }</div>
              <div class="entry-subtitle">${exp.company}${
                exp.location ? `, ${exp.location}` : ""
              }</div>
              ${
                exp.bullets && exp.bullets.length > 0
                  ? exp.bullets
                      .map(
                        (bullet) =>
                          `<div class="bullet-point">• ${bullet}</div>`
                      )
                      .join("")
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.education && resumeData.education.length > 0
          ? `
        <h2>Education</h2>
        <div class="section">
          ${resumeData.education
            .map(
              (edu) => `
            <div class="entry">
              <div class="entry-title">${edu.degree}</div>
              <div class="entry-date">${formatDate(edu.startDate)} - ${
                edu.isCurrentRole ? "Present" : formatDate(edu.endDate)
              }</div>
              <div class="entry-subtitle">${edu.school}</div>
              ${
                edu.field
                  ? `<div class="entry-description">${edu.field}</div>`
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.projects && resumeData.projects.length > 0
          ? `
        <h2>Projects</h2>
        <div class="section">
          ${resumeData.projects
            .map(
              (proj) => `
            <div class="entry">
              <div class="entry-title">${proj.name}</div>
              <div class="entry-description">${proj.description}</div>
              ${
                proj.technologies
                  ? `<div class="entry-subtitle">Technologies: ${proj.technologies}</div>`
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.certifications && resumeData.certifications.length > 0
          ? `
        <h2>Certifications & Achievements</h2>
        <div class="section">
          ${resumeData.certifications
            .map(
              (cert) => `
            <div class="entry">
              <div class="entry-title">${cert.title}</div>
              <div class="entry-subtitle">${cert.issuer}</div>
              <div class="entry-date">${formatDate(cert.date)}</div>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }

      ${
        resumeData.skills && resumeData.skills.length > 0
          ? `
        <h2>Skills</h2>
        <div class="section">
          ${Array.from(new Set(resumeData.skills.map((s) => s.category)))
            .map(
              (category) => `
            <div class="skills-category">
              <div class="skills-category-name">${category}</div>
              <div class="skills-list">
                ${resumeData.skills
                  .filter((s) => s.category === category)
                  .map((s) => s.name)
                  .join(", ")}
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      `
          : ""
      }
    </body>
    </html>
  `;
}

function generateTextContent(resumeData) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  let text = "";

  text += `${resumeData.personalInfo.fullName}\n`;
  text += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n\n`;

  if (resumeData.personalInfo.summary) {
    text += `SUMMARY\n${resumeData.personalInfo.summary}\n\n`;
  }

  if (resumeData.experience && resumeData.experience.length > 0) {
    text += `WORK EXPERIENCE\n`;
    resumeData.experience.forEach((exp) => {
      text += `${exp.position} - ${exp.company}${
        exp.location ? `, ${exp.location}` : ""
      }\n`;
      text += `${formatDate(exp.startDate)} - ${
        exp.isCurrentRole ? "Present" : formatDate(exp.endDate)
      }\n`;
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach((bullet) => {
          text += `• ${bullet}\n`;
        });
      }
      text += "\n";
    });
  }

  if (resumeData.education && resumeData.education.length > 0) {
    text += `EDUCATION\n`;
    resumeData.education.forEach((edu) => {
      text += `${edu.degree} - ${edu.school}\n`;
      text += `${formatDate(edu.startDate)} - ${
        edu.isCurrentRole ? "Present" : formatDate(edu.endDate)
      }\n`;
      if (edu.field) text += `${edu.field}\n`;
      text += "\n";
    });
  }

  if (resumeData.skills && resumeData.skills.length > 0) {
    text += `SKILLS\n`;
    Array.from(new Set(resumeData.skills.map((s) => s.category))).forEach(
      (category) => {
        text += `${category}: ${resumeData.skills
          .filter((s) => s.category === category)
          .map((s) => s.name)
          .join(", ")}\n`;
      }
    );
  }

  return text;
}
