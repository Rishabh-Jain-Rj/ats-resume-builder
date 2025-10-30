export const calculateATSScore = (resumeData) => {
  let score = 0;
  const breakdown = {
    contactInfo: 0,
    summary: 0,
    experience: 0,
    education: 0,
    skills: 0,
    projects: 0,
    certifications: 0,
    formatting: 0,
  };

  // Contact Information (15 points)
  const contactFields = ["fullName", "email", "phone", "location"];
  let contactCount = 0;
  contactFields.forEach((field) => {
    if (resumeData.personalInfo?.[field]?.trim()) {
      contactCount++;
    }
  });
  breakdown.contactInfo = Math.round((contactCount / 4) * 15);
  score += breakdown.contactInfo;

  // Professional Summary (10 points)
  if (resumeData.personalInfo?.summary?.trim()?.length > 50) {
    breakdown.summary = 10;
    score += 10;
  } else if (resumeData.personalInfo?.summary?.trim()?.length > 0) {
    breakdown.summary = 5;
    score += 5;
  }

  // Work Experience (25 points)
  if (resumeData.experience?.length > 0) {
    let expScore = 0;
    let validExperiences = 0;
    resumeData.experience.forEach((exp) => {
      const isValidDate = validateDateSequence(
        exp.startDate,
        exp.endDate,
        exp.isCurrentRole
      );
      if (
        exp.company?.trim() &&
        exp.position?.trim() &&
        exp.bullets?.length > 0 &&
        isValidDate
      ) {
        validExperiences++;
      }
    });
    expScore = Math.min(validExperiences * 8, 25);
    breakdown.experience = expScore;
    score += expScore;
  }

  // Education (15 points)
  if (resumeData.education?.length > 0) {
    let eduScore = 0;
    let validEducations = 0;
    resumeData.education.forEach((edu) => {
      const isValidDate = validateDateSequence(
        edu.startDate,
        edu.endDate,
        edu.isCurrentRole
      );
      if (edu.school?.trim() && edu.degree?.trim() && isValidDate) {
        validEducations++;
      }
    });
    eduScore = Math.min(validEducations * 7, 15);
    breakdown.education = eduScore;
    score += eduScore;
  }

  // Skills (15 points)
  if (resumeData.skills?.length >= 10) {
    breakdown.skills = 15;
    score += 15;
  } else if (resumeData.skills?.length >= 5) {
    breakdown.skills = 10;
    score += 10;
  } else if (resumeData.skills?.length > 0) {
    breakdown.skills = Math.round((resumeData.skills.length / 5) * 10);
    score += breakdown.skills;
  }

  // Projects (10 points)
  if (resumeData.projects?.length > 0) {
    let projScore = 0;
    let validProjects = 0;
    resumeData.projects.forEach((proj) => {
      if (
        proj.name?.trim() &&
        proj.description?.trim()?.length > 20 &&
        proj.technologies?.trim()
      ) {
        validProjects++;
      }
    });
    projScore = Math.min(validProjects * 5, 10);
    breakdown.projects = projScore;
    score += projScore;
  }

  // Certifications (5 points)
  if (resumeData.certifications?.length > 0) {
    breakdown.certifications = 5;
    score += 5;
  }

  // Formatting (5 points) - Always award if data exists
  if (resumeData.personalInfo && resumeData.experience?.length > 0) {
    breakdown.formatting = 5;
    score += 5;
  }

  return {
    score: Math.min(Math.round(score), 100),
    breakdown,
  };
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
