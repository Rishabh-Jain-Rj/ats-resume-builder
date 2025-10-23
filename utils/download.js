export const downloadResume = (resumeData, theme, fonts, format = "pdf") => {
  const fileName = `${resumeData.personalInfo.fullName || "resume"}`;

  if (format === "json") {
    downloadJSON(resumeData, fileName);
  } else if (format === "html") {
    downloadHTML(resumeData, theme, fonts, fileName);
  } else if (format === "pdf") {
    downloadPDF(resumeData, theme, fonts, fileName);
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

const downloadHTML = (resumeData, theme, fonts, fileName) => {
  const htmlContent = generateHTMLContent(resumeData, theme, fonts);
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const downloadPDF = (resumeData, theme, fonts, fileName) => {
  // Create a temporary container
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.width = "8.5in";
  container.style.padding = "0.5in";
  container.innerHTML = generateHTMLContent(resumeData, theme, fonts);
  document.body.appendChild(container);

  // Use window.print to generate PDF
  const printWindow = window.open("", "", "width=800,height=600");
  printWindow.document.write(generateHTMLContent(resumeData, theme, fonts));
  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
    document.body.removeChild(container);
  }, 250);
};

function generateHTMLContent(resumeData, theme, fonts) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

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
          font-family: ${
            fonts.body === "serif"
              ? "Georgia, serif"
              : fonts.body === "monospace"
              ? "Courier New, monospace"
              : "Arial, sans-serif"
          };
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 8px;
          color: ${theme.primary};
        }
        h2 {
          font-size: 14px;
          margin-top: 20px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${theme.primary};
          border-bottom: 2px solid ${theme.accent};
          padding-bottom: 8px;
        }
        .header {
          margin-bottom: 24px;
          border-bottom: 2px solid ${theme.accent};
          padding-bottom: 16px;
        }
        .contact {
          font-size: 12px;
          color: ${theme.accent};
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
          color: ${theme.primary};
        }
        .entry-subtitle {
          font-size: 12px;
          color: ${theme.accent};
          font-weight: bold;
          margin-top: 2px;
        }
        .entry-date {
          font-size: 11px;
          color: ${theme.accent};
          float: right;
        }
        .entry-description {
          font-size: 12px;
          margin-top: 6px;
          line-height: 1.5;
        }
        .skills-category {
          margin-bottom: 8px;
        }
        .skills-category-name {
          font-size: 11px;
          font-weight: bold;
          color: ${theme.accent};
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
        <h2>Experience</h2>
        <div class="section">
          ${resumeData.experience
            .map(
              (exp) => `
            <div class="entry">
              <div class="entry-title">${exp.position}</div>
              <div class="entry-date">${formatDate(
                exp.startDate
              )} - ${formatDate(exp.endDate)}</div>
              <div class="entry-subtitle">${exp.company}</div>
              <div class="entry-description">${exp.description}</div>
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
              <div class="entry-date">${formatDate(edu.graduationDate)}</div>
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
