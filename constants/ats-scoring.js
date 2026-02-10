export const calculateATSScore = (resumeData) => {
  let score = 0;

  const personal = resumeData.personalInfo || {};

  const contactFields = [
    personal.fullName,
    personal.designation,
    personal.email,
    personal.phone,
    personal.location,
  ];

  const contactFilled = contactFields.filter((field) => field?.trim()).length;

  score += Math.round((contactFilled / 5) * 15);

  /* ---------- SUMMARY (10) ---------- */
  const summaryLength = personal.summary?.trim()?.length || 0;

  if (summaryLength > 50) score += 10;
  else if (summaryLength > 0) score += 5;

  /* ---------- EXPERIENCE (25) ---------- */
  if (resumeData.experience?.length) {
    let validExp = 0;

    resumeData.experience.forEach((exp) => {
      if (
        exp.company?.trim() &&
        exp.position?.trim() &&
        exp.bullets?.length > 0 &&
        isValidDate(exp.startDate, exp.endDate, exp.isCurrentRole)
      ) {
        validExp++;
      }
    });

    score += Math.min(validExp * 8, 25);
  }

  /* ---------- EDUCATION (15) ---------- */
  if (resumeData.education?.length) {
    let validEdu = 0;

    resumeData.education.forEach((edu) => {
      if (
        edu.school?.trim() &&
        edu.degree?.trim() &&
        isValidDate(edu.startDate, edu.endDate, edu.isCurrentRole)
      ) {
        validEdu++;
      }
    });

    score += Math.min(validEdu * 7, 15);
  }

  /* ---------- SKILLS (15) ---------- */
  const skillCount = resumeData.skills?.length || 0;

  if (skillCount >= 10) score += 15;
  else if (skillCount >= 5) score += 10;
  else if (skillCount > 0) score += Math.round((skillCount / 5) * 10);

  /* ---------- PROJECTS (10) ---------- */

  if (resumeData.projects?.length) {
    let validProj = 0;

    resumeData.projects.forEach((proj) => {
      if (
        proj.name?.trim() &&
        proj.description?.trim()?.length > 20 &&
        proj.technologies?.trim()
      ) {
        validProj++;
      }
    });

    score += Math.min(validProj * 5, 10);
  }

  /* ---------- CERTIFICATIONS (5) ---------- */

  if (resumeData.certifications?.length) {
    score += 5;
  }

  /* ---------- FORMATTING BONUS (5) ---------- */

  if (resumeData.personalInfo && resumeData.experience?.length) {
    score += 5;
  }

  return Math.min(Math.round(score), 100);
};

const isValidDate = (start, end, isCurrent) => {
  if (!start) return false;
  if (isCurrent) return true;
  if (!end) return false;

  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);

  if (ey < sy) return false;
  if (ey === sy && em <= sm) return false;

  return true;
};

const validateDateSequence = (startDate, endDate, isCurrentRole) => {
  if (!startDate) return false;
  if (isCurrentRole) return true;
  if (!endDate) return false;

  const [startYear, startMonth] = startDate.split("-").map(Number);
  const [endYear, endMonth] = endDate.split("-").map(Number);

  // Check if end date is after start date
  if (endYear < startYear) return false;
  if (endYear === startYear && endMonth <= startMonth) return false;

  return true;
};

export const getATSRecommendations = (resumeData) => {
  const recommendations = [];

  if (!resumeData.personalInfo?.fullName?.trim()) {
    recommendations.push({ type: "error", text: "Add your full name" });
  }
  if (!resumeData.personalInfo?.email?.trim()) {
    recommendations.push({ type: "error", text: "Add your email address" });
  }
  if (!resumeData.personalInfo?.phone?.trim()) {
    recommendations.push({ type: "error", text: "Add your phone number" });
  }
  if (!resumeData.personalInfo?.location?.trim()) {
    recommendations.push({ type: "warning", text: "Add your location" });
  }
  if (!resumeData.personalInfo?.designation?.trim()) {
    recommendations.push({
      type: "warning",
      text: "Add a professional designation/job title to improve ATS matching",
    });
  }

  if (!resumeData.personalInfo?.summary?.trim()) {
    recommendations.push({
      type: "warning",
      text: "Add a professional summary (50+ characters)",
    });
  } else if (resumeData.personalInfo.summary.trim().length < 50) {
    recommendations.push({
      type: "warning",
      text: "Expand your professional summary to 50+ characters",
    });
  }

  if (!resumeData.experience?.length) {
    recommendations.push({
      type: "error",
      text: "Add at least one work experience entry",
    });
  } else {
    resumeData.experience.forEach((exp, idx) => {
      if (!exp.company?.trim()) {
        recommendations.push({
          type: "error",
          text: `Experience ${idx + 1}: Add company name`,
        });
      }
      if (!exp.position?.trim()) {
        recommendations.push({
          type: "error",
          text: `Experience ${idx + 1}: Add job position`,
        });
      }
      if (
        !validateDateSequence(exp.startDate, exp.endDate, exp.isCurrentRole)
      ) {
        recommendations.push({
          type: "error",
          text: `Experience ${idx + 1}: End date must be after start date`,
        });
      }
      if (!exp.bullets || exp.bullets.length === 0) {
        recommendations.push({
          type: "warning",
          text: `Experience ${
            idx + 1
          }: Add at least one bullet point describing your achievements`,
        });
      }
    });
  }

  if (!resumeData.education?.length) {
    recommendations.push({
      type: "error",
      text: "Add at least one education entry",
    });
  } else {
    resumeData.education.forEach((edu, idx) => {
      if (!edu.school?.trim()) {
        recommendations.push({
          type: "error",
          text: `Education ${idx + 1}: Add school/university name`,
        });
      }
      if (!edu.degree?.trim()) {
        recommendations.push({
          type: "error",
          text: `Education ${idx + 1}: Add degree`,
        });
      }
      if (
        !validateDateSequence(edu.startDate, edu.endDate, edu.isCurrentRole)
      ) {
        recommendations.push({
          type: "error",
          text: `Education ${idx + 1}: End date must be after start date`,
        });
      }
    });
  }

  if (!resumeData.skills?.length) {
    recommendations.push({ type: "error", text: "Add at least 5 skills" });
  } else if (resumeData.skills.length < 10) {
    recommendations.push({
      type: "warning",
      text: `Add more skills (currently ${resumeData.skills.length}, recommended 10+)`,
    });
  }

  if (!resumeData.projects?.length) {
    recommendations.push({
      type: "warning",
      text: "Add at least one project to improve ATS score",
    });
  }

  if (!resumeData.certifications?.length) {
    recommendations.push({
      type: "warning",
      text: "Add certifications to strengthen your profile",
    });
  }

  return recommendations;
};

export const getATSWarnings = (resumeData) => {
  const { score } = calculateATSScore(resumeData);
  const warnings = [];

  if (score < 100) {
    if (score < 50) {
      warnings.push({
        level: "critical",
        title: "Resume Incomplete",
        message:
          "Your resume is missing critical information. Add personal info, experience, education, and skills.",
      });
    } else if (score < 75) {
      warnings.push({
        level: "warning",
        title: "Resume Needs Improvement",
        message:
          "Add more details to improve ATS compatibility. Expand descriptions and add more skills.",
      });
    } else if (score < 90) {
      warnings.push({
        level: "info",
        title: "Almost Perfect",
        message:
          "Your resume is well-optimized. Small improvements can make it perfect.",
      });
    }
  }

  return warnings;
};
