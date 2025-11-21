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
    // const previewWindow = window.open("", "_blank");
    // const htmlContent = generateHTMLContent(resumeData, font);
    // previewWindow.document.write(htmlContent);
    // previewWindow.document.close();
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
      text += `${exp.position} - ${exp.company}${
        exp.location ? ` | ${exp.location}` : ""
      }\n`;
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
      if (edu.score) {
        text += `Score: ${edu.score}\n`;
      }
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

function generateHTMLContent(resumeData, font = "Calibri, Arial, sans-serif") {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    if (!year || !month) return dateString;
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Group skills
  const skillsByCategory = {};
  (resumeData.skills || []).forEach((skill) => {
    if (!skillsByCategory[skill.category])
      skillsByCategory[skill.category] = [];
    skillsByCategory[skill.category].push(skill.name);
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
      body {
        font-family: ${font};
        font-size: 13px;
        color: #0f172a;
        line-height: 1.35;
        margin: 0;
        padding: 28px;
        max-width: 820px;
      }

      h1 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 6px;
      }

      h2 {
        font-size: 14px;
        margin-top: 24px;
        margin-bottom: 8px;
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 6px;
        letter-spacing: 0.5px;
        page-break-after: avoid;
      }

      .contact, .links {
        font-size: 11px;
        color: #334155;
        margin-bottom: 4px;
      }

      .links a {
        color: #2563eb;
        text-decoration: none;
      }

      .summary {
        font-size: 12px;
        margin-top: 8px;
        text-align: justify;
      }

      .entry {
        margin-bottom: 16px;
        page-break-inside: avoid;
      }

      .entry-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .entry-title {
        font-size: 13.5px;
        font-weight: bold;
        color: #0f172a;
      }

      .entry-date {
        font-size: 11px;
        color: #475569;
        white-space: nowrap;
      }

      .entry-subtitle {
        font-size: 11.5px;
        font-weight: 600;
        color: #334155;
        margin-top: 2px;
      }

      /* MANUAL BULLET SYSTEM */
      .bullet-line {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        line-height: 1.35;
        page-break-inside: avoid;
      }

      .bullet {
        font-size: 14px;
        color: #475569;
        display: inline-block;
      }

      .bullet-text {
        flex: 1;
        font-size: 12px;
        color: #0f172a;
        line-height: 1.35;
      }

      .project-desc {
        font-size: 12px;
        margin-top: 2px;
      }

      .project-tech {
        font-size: 11px;
        margin-top: 3px;
        color: #334155;
      }

      .skills-category {
        font-weight: bold;
        font-size: 12px;
        margin-top: 4px;
      }

      .skills-list {
        font-size: 12px;
        color: #0f172a;
        margin-bottom: 6px;
      }

      @media print {
        * { -webkit-print-color-adjust: exact; }
      }
    </style>
  </head>

  <body>

    <!-- Header -->
    <h1>${resumeData.personalInfo.fullName}</h1>

    <div class="contact">
      ${resumeData.personalInfo.email || ""} 
      ${
        resumeData.personalInfo.phone
          ? " | " + resumeData.personalInfo.phone
          : ""
      }
      ${
        resumeData.personalInfo.location
          ? " | " + resumeData.personalInfo.location
          : ""
      }
    </div>

    <div class="links">
      ${
        resumeData.personalInfo.linkedin
          ? `LinkedIn: <a>${resumeData.personalInfo.linkedin}</a>`
          : ""
      }
      ${
        resumeData.personalInfo.github
          ? ` | GitHub: <a>${resumeData.personalInfo.github}</a>`
          : ""
      }
      ${
        resumeData.personalInfo.website
          ? ` | Portfolio: <a>${resumeData.personalInfo.website}</a>`
          : ""
      }
    </div>

    <!-- Summary -->
    ${
      resumeData.personalInfo.summary
        ? `
      <h2>Summary</h2>
      <div class="summary">${resumeData.personalInfo.summary}</div>
    `
        : ""
    }

    <!-- Work Experience -->
    ${
      resumeData.experience?.length
        ? `
          <h2>Work Experience</h2>
          ${resumeData.experience
            .map(
              (exp) => `
              <div class="entry">

                <div class="entry-header">
                  <div class="entry-title">${exp.position}</div>
                  <div class="entry-date">${formatDate(exp.startDate)} — ${
                exp.isCurrentRole ? "Present" : formatDate(exp.endDate)
              }</div>
                </div>

                <div class="entry-subtitle">${exp.company}${
                exp.location ? " | " + exp.location : ""
              }</div>

                ${
                  exp.bullets?.length
                    ? exp.bullets
                        .map(
                          (b) => `
                    <div class="bullet-line">
                      <span class="bullet">•</span>
                      <span class="bullet-text">${b}</span>
                    </div>
                  `
                        )
                        .join("")
                    : ""
                }

              </div>
            `
            )
            .join("")}
        `
        : ""
    }

    <!-- Education -->
    ${
      resumeData.education?.length
        ? `
          <h2>Education</h2>
          ${resumeData.education
            .map(
              (edu) => `
              <div class="entry">
                <div class="entry-header">
                  <div class="entry-title">${edu.degree}</div>
                  <div class="entry-date">${formatDate(edu.startDate)} — ${
                edu.isCurrentRole ? "Present" : formatDate(edu.endDate)
              }</div>
                </div>

              <div class="entry-subtitle">${edu.school}</div>

              ${
                edu.field
                  ? `<div style="font-size:12px;margin-top:2px;color:#334155">${edu.field}</div>`
                  : ""
              }

              ${
                edu.score
                  ? `<div style="font-size:11px;color:#475569;margin-top:1px">Score: ${edu.score}</div>`
                  : ""
              }
              </div>
          `
            )
            .join("")}
        `
        : ""
    }

    <!-- Projects -->
    ${
      resumeData.projects?.length
        ? `
          <h2>Projects</h2>
          ${resumeData.projects
            .map(
              (proj) => `
            <div class="entry">
              <div class="entry-title">${proj.name}</div>
              <div class="project-desc">${proj.description}</div>

              ${
                proj.technologies
                  ? `<div class="project-tech"><strong>Technologies:</strong> ${proj.technologies}</div>`
                  : ""
              }
            </div>
            `
            )
            .join("")}
        `
        : ""
    }

    <!-- Certifications -->
    ${
      resumeData.certifications?.length
        ? `
          <h2>Certifications & Achievements</h2>
          ${resumeData.certifications
            .map(
              (cert) => `
            <div class="entry">
              <div class="entry-header">
                <div class="entry-title">${cert.title}</div>
                <div class="entry-date">${formatDate(cert.date)}</div>
              </div>
              <div class="entry-subtitle">${cert.issuer}</div>
            </div>
          `
            )
            .join("")}
        `
        : ""
    }

    <!-- Skills -->
    ${
      resumeData.skills?.length
        ? `
          <h2>Skills</h2>
          ${Object.entries(skillsByCategory)
            .map(
              ([category, list]) => `
              <div class="skills-category">${category}</div>
              <div class="skills-list">${list.join(", ")}</div>
            `
            )
            .join("")}
        `
        : ""
    }

  </body>
  </html>
  `;
}
