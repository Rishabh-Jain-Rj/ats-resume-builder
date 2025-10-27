"use client";

import { useState } from "react";
import { FiCopy, FiDownload } from "react-icons/fi";
import { generatePDFFromHTML } from "@/utils/pdf-generator";

export default function ExportOptions({
  resumeData,
  onClose,
  font = "calibri",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const text = generatePlainText(resumeData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    const htmlContent = generateHTMLContent(resumeData, font);
    const fileName = resumeData.personalInfo.fullName || "resume";
    await generatePDFFromHTML(htmlContent, fileName);
    onClose();
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Export Resume</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={handleCopyText}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>{copied ? "Copied!" : "Copy as Text"}</span>
            <FiCopy size={18} />
          </button>

          <button
            onClick={handleDownloadHTML}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as HTML</span>
            <FiDownload size={18} />
          </button>

          <button
            onClick={handleDownloadPDF}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as PDF</span>
            <FiDownload size={18} />
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium text-left flex items-center justify-between cursor-pointer"
          >
            <span>Download as JSON</span>
            <FiDownload size={18} />
          </button>
        </div>

        <div className="border-t border-slate-200 p-6">
          <p className="text-xs text-slate-600 mb-4">
            All exports are ATS-optimized and text-based for maximum
            compatibility with applicant tracking systems.
          </p>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function generatePlainText(resumeData) {
  let text = "";

  if (resumeData.personalInfo) {
    text += `${resumeData.personalInfo.fullName}\n`;
    text += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}\n`;

    const links = [];
    if (resumeData.personalInfo.linkedin)
      links.push(`LinkedIn: ${resumeData.personalInfo.linkedin}`);
    if (resumeData.personalInfo.github)
      links.push(`GitHub: ${resumeData.personalInfo.github}`);
    if (resumeData.personalInfo.website)
      links.push(`Portfolio: ${resumeData.personalInfo.website}`);
    if (links.length > 0) {
      text += `${links.join(" | ")}\n`;
    }
    text += "\n";

    if (resumeData.personalInfo.summary) {
      text += `SUMMARY\n${resumeData.personalInfo.summary}\n\n`;
    }
  }

  if (resumeData.experience?.length) {
    text += "WORK EXPERIENCE\n";
    resumeData.experience.forEach((exp) => {
      text += `${exp.position} - ${exp.company}\n`;
      const endDate = exp.isCurrentRole ? "Present" : exp.endDate;
      text += `${exp.startDate} - ${endDate}\n`;
      if (exp.bullets && exp.bullets.length > 0) {
        exp.bullets.forEach((bullet) => {
          text += `• ${bullet}\n`;
        });
      }
      text += "\n";
    });
  }

  if (resumeData.education?.length) {
    text += "EDUCATION\n";
    resumeData.education.forEach((edu) => {
      text += `${edu.degree} - ${edu.school}\n`;
      const endDate = edu.isCurrentRole ? "Present" : edu.endDate;
      text += `${edu.startDate} - ${endDate}\n`;
      if (edu.field) text += `${edu.field}\n`;
      text += "\n";
    });
  }

  if (resumeData.projects?.length) {
    text += "PROJECTS\n";
    resumeData.projects.forEach((proj) => {
      text += `${proj.name}\n`;
      text += `${proj.description}\n`;
      if (proj.technologies) text += `Technologies: ${proj.technologies}\n`;
      text += "\n";
    });
  }

  if (resumeData.certifications?.length) {
    text += "CERTIFICATIONS & ACHIEVEMENTS\n";
    resumeData.certifications.forEach((cert) => {
      text += `${cert.title} - ${cert.issuer}\n`;
      if (cert.date) text += `${cert.date}\n`;
      text += "\n";
    });
  }

  if (resumeData.skills?.length) {
    text += "SKILLS\n";
    const skillsByCategory = {};
    resumeData.skills.forEach((skill) => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill.name);
    });
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      text += `${category}: ${skills.join(", ")}\n`;
    });
  }

  return text;
}

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
          font-family: Calibri, Arial, sans-serif;
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
          font-weight: bold;
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
        .contact span:first-child {
          margin-left: 0;
        }
        .links {
          font-size: 11px;
          color: #666;
          margin-top: 4px;
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
        .bullet-point {
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
          color: #000;
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
        ${
          resumeData.personalInfo.linkedin ||
          resumeData.personalInfo.github ||
          resumeData.personalInfo.website
            ? `
          <div class="links">
            ${
              resumeData.personalInfo.linkedin
                ? `LinkedIn: <a href="${resumeData.personalInfo.linkedin}">${resumeData.personalInfo.linkedin}</a>`
                : ""
            }
            ${
              resumeData.personalInfo.github
                ? `${
                    resumeData.personalInfo.linkedin ? " | " : ""
                  }GitHub: <a href="${resumeData.personalInfo.github}">${
                    resumeData.personalInfo.github
                  }</a>`
                : ""
            }
            ${
              resumeData.personalInfo.website
                ? `${
                    resumeData.personalInfo.linkedin ||
                    resumeData.personalInfo.github
                      ? " | "
                      : ""
                  }Portfolio: <a href="${resumeData.personalInfo.website}">${
                    resumeData.personalInfo.website
                  }</a>`
                : ""
            }
          </div>
        `
            : ""
        }
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
              <div class="entry-subtitle">${exp.company}</div>
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
              ${edu.field ? `<div class="bullet-point">${edu.field}</div>` : ""}
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
              <div class="bullet-point">${proj.description}</div>
              ${
                proj.technologies
                  ? `<div class="bullet-point">Technologies: ${proj.technologies}</div>`
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
              <div class="entry-date">${formatDate(cert.date)}</div>
              <div class="entry-subtitle">${cert.issuer}</div>
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
