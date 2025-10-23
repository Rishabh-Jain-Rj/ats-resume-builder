export const calculateATSScore = (resumeData) => {
  let score = 0;
  const breakdown = {
    personalInfo: 0,
    experience: 0,
    education: 0,
    skills: 0,
    projects: 0,
  };

  // Personal Info (25 points)
  const personalInfoFields = ["fullName", "email", "phone", "location"];
  let personalInfoCount = 0;
  personalInfoFields.forEach((field) => {
    if (resumeData.personalInfo?.[field]?.trim()) {
      personalInfoCount++;
    }
  });
  breakdown.personalInfo = Math.round((personalInfoCount / 4) * 25);
  score += breakdown.personalInfo;

  // Summary (10 points bonus)
  if (resumeData.personalInfo?.summary?.trim()?.length > 50) {
    score += 10;
  }

  // Experience (30 points)
  if (resumeData.experience?.length > 0) {
    let expScore = 0;
    resumeData.experience.forEach((exp) => {
      if (
        exp.company?.trim() &&
        exp.position?.trim() &&
        exp.description?.trim()?.length > 30
      ) {
        expScore += Math.min(30 / resumeData.experience.length, 10);
      }
    });
    breakdown.experience = Math.round(expScore);
    score += breakdown.experience;
  }

  // Education (20 points)
  if (resumeData.education?.length > 0) {
    let eduScore = 0;
    resumeData.education.forEach((edu) => {
      if (edu.school?.trim() && edu.degree?.trim()) {
        eduScore += Math.min(20 / resumeData.education.length, 10);
      }
    });
    breakdown.education = Math.round(eduScore);
    score += breakdown.education;
  }

  // Skills (15 points)
  if (resumeData.skills?.length >= 5) {
    breakdown.skills = 15;
    score += 15;
  } else if (resumeData.skills?.length > 0) {
    breakdown.skills = Math.round((resumeData.skills.length / 5) * 15);
    score += breakdown.skills;
  }

  if (resumeData.projects?.length > 0) {
    let projScore = 0;
    resumeData.projects.forEach((proj) => {
      if (proj.name?.trim() && proj.description?.trim()?.length > 20) {
        projScore += Math.min(10 / resumeData.projects.length, 5);
      }
    });
    breakdown.projects = Math.round(projScore) || 0;
    score += breakdown.projects;
  } else {
    breakdown.projects = 0;
  }

  return {
    score: Math.min(Math.round(score), 100),
    breakdown,
  };
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
      text: "Expand your professional summary",
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
      if (!exp.description?.trim() || exp.description.trim().length < 30) {
        recommendations.push({
          type: "warning",
          text: `Experience ${
            idx + 1
          }: Add detailed job description (30+ characters)`,
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
    });
  }

  if (!resumeData.skills?.length) {
    recommendations.push({ type: "error", text: "Add at least 5 skills" });
  } else if (resumeData.skills.length < 5) {
    recommendations.push({
      type: "warning",
      text: `Add more skills (currently ${resumeData.skills.length}, recommended 5+)`,
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
