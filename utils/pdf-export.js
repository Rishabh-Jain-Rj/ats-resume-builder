import html2pdf from "html2pdf.js"

export const downloadPDF = (resumeData, theme, fonts) => {
  const htmlContent = generatePDFHTML(resumeData, theme, fonts)

  const element = document.createElement("div")
  element.innerHTML = htmlContent

  const options = {
    margin: 10,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }

  // Fallback: if html2pdf not available, use simple text-based approach
  if (typeof html2pdf === "undefined") {
    downloadTextPDF(resumeData)
    return
  }

  html2pdf().set(options).from(element).save()
}

export const downloadTextPDF = (resumeData) => {
  const content = generatePlainTextResume(resumeData)

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Resume - ${resumeData.personalInfo?.fullName || "Resume"}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 20px;
        }
        h1 { font-size: 20px; margin: 0 0 5px 0; font-weight: bold; }
        h2 { font-size: 12px; margin: 15px 0 8px 0; font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 3px; }
        p { margin: 3px 0; }
        .header { margin-bottom: 15px; }
        .contact { font-size: 11px; color: #666; }
        .section { margin-bottom: 12px; }
        .entry { margin-bottom: 8px; }
        .entry-title { font-weight: bold; }
        .entry-subtitle { font-style: italic; color: #666; font-size: 11px; }
        .entry-date { color: #666; font-size: 11px; }
        .entry-description { font-size: 11px; margin-top: 2px; }
        .skills { font-size: 11px; }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `resume-${new Date().getTime()}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function generatePlainTextResume(resumeData) {
  let html = '<div class="header">'

  if (resumeData.personalInfo) {
    html += `<h1>${resumeData.personalInfo.fullName}</h1>`
    html += `<div class="contact">${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}</div>`
    if (resumeData.personalInfo.summary) {
      html += `<p style="margin-top: 8px; font-size: 11px;">${resumeData.personalInfo.summary}</p>`
    }
  }
  html += "</div>"

  if (resumeData.experience?.length) {
    html += "<h2>EXPERIENCE</h2>"
    html += '<div class="section">'
    resumeData.experience.forEach((exp) => {
      html += '<div class="entry">'
      html += `<div class="entry-title">${exp.position}</div>`
      html += `<div class="entry-subtitle">${exp.company}</div>`
      html += `<div class="entry-date">${exp.startDate} - ${exp.endDate}</div>`
      html += `<div class="entry-description">${exp.description}</div>`
      html += "</div>"
    })
    html += "</div>"
  }

  if (resumeData.education?.length) {
    html += "<h2>EDUCATION</h2>"
    html += '<div class="section">'
    resumeData.education.forEach((edu) => {
      html += '<div class="entry">'
      html += `<div class="entry-title">${edu.degree}</div>`
      html += `<div class="entry-subtitle">${edu.school}</div>`
      html += `<div class="entry-date">${edu.graduationDate}</div>`
      if (edu.field) {
        html += `<div class="entry-description">${edu.field}</div>`
      }
      html += "</div>"
    })
    html += "</div>"
  }

  if (resumeData.skills?.length) {
    html += "<h2>SKILLS</h2>"
    html += '<div class="skills">'
    const skillsByCategory = {}
    resumeData.skills.forEach((skill) => {
      const category = skill.category || "Other"
      if (!skillsByCategory[category]) {
        skillsByCategory[category] = []
      }
      skillsByCategory[category].push(skill.name)
    })
    Object.entries(skillsByCategory).forEach(([category, skills]) => {
      html += `<p><strong>${category}:</strong> ${skills.join(", ")}</p>`
    })
    html += "</div>"
  }

  if (resumeData.projects?.length) {
    html += "<h2>PROJECTS</h2>"
    html += '<div class="section">'
    resumeData.projects.forEach((proj) => {
      html += '<div class="entry">'
      html += `<div class="entry-title">${proj.name}</div>`
      html += `<div class="entry-subtitle">${proj.technologies}</div>`
      html += `<div class="entry-description">${proj.description}</div>`
      html += "</div>"
    })
    html += "</div>"
  }

  return html
}

function generatePDFHTML(resumeData, theme, fonts) {
  return generatePlainTextResume(resumeData)
}
