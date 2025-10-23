"use client";

import { useState } from "react";

export default function ExportOptions({ resumeData, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const text = generatePlainText(resumeData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const htmlContent = generateHTMLContent(resumeData);
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateHTMLContent(resumeData);
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resumeData.personalInfo.fullName || "resume"}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    onClose();
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${resumeData.personalInfo.fullName || "resume"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Export Resume</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopyText}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Copy as Text</span>
            <span className="text-lg">📋</span>
          </button>

          <button
            onClick={handleDownloadHTML}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as HTML</span>
            <span className="text-lg">🌐</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as PDF</span>
            <span className="text-lg">📑</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as JSON</span>
            <span className="text-lg">{}</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-600">
            All exports are ATS-optimized and text-based for maximum
            compatibility with applicant tracking systems.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function generatePlainText(resumeData) {
  let text = "";

  if (resumeData.personalInfo) {
    text += `${resumeData.personalInfo.fullName}\n`;
    text += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n\n`;
    if (resumeData.personalInfo.summary) {
      text += `${resumeData.personalInfo.summary}\n\n`;
    }
  }

  if (resumeData.experience?.length) {
    text += "EXPERIENCE\n";
    resumeData.experience.forEach((exp) => {
      text += `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
      text += `${exp.description}\n\n`;
    });
  }

  if (resumeData.education?.length) {
    text += "EDUCATION\n";
    resumeData.education.forEach((edu) => {
      text += `${edu.degree} in ${edu.field} from ${edu.school} (${edu.graduationDate})\n`;
    });
    text += "\n";
  }

  if (resumeData.projects?.length) {
    text += "PROJECTS\n";
    resumeData.projects.forEach((proj) => {
      text += `${proj.name}: ${proj.description} (${proj.technologies})\n`;
    });
    text += "\n";
  }

  if (resumeData.skills?.length) {
    text += "SKILLS\n";
    text += resumeData.skills.map((s) => s.name).join(", ") + "\n\n";
  }

  return text;
}

function generateHTMLContent(resumeData) {
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
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
        }
        h1 {
          font-size: 32px;
          margin-bottom: 8px;
          color: #000;
        }
        h2 {
          font-size: 14px;
          margin-top: 20px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #000;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
        }
        .header {
          margin-bottom: 24px;
          border-bottom: 2px solid #333;
          padding-bottom: 16px;
        }
        .contact {
          font-size: 12px;
          color: #666;
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
          color: #000;
        }
        .entry-subtitle {
          font-size: 12px;
          color: #666;
          font-weight: bold;
          margin-top: 2px;
        }
        .entry-date {
          font-size: 11px;
          color: #666;
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
          color: #000;
        }
        .skills-list {
          font-size: 12px;
          margin-top: 2px;
        }
        @media print {
          body { padding: 0; }
          .skills-category-name { font-weight: bold; }
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
