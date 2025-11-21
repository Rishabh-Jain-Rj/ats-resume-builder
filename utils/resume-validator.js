// Validation utilities for resume data
export const validateResumeData = (data) => {
  const errors = [];

  // Validate personal info
  if (!data.personalInfo) {
    errors.push("Personal information is required");
  } else {
    if (!data.personalInfo.fullName?.trim()) {
      errors.push("Full name is required");
    }
    if (!data.personalInfo.email?.trim()) {
      errors.push("Email is required");
    }
  }

  // Validate experience entries
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp, idx) => {
      if (!exp.company?.trim()) {
        errors.push(`Experience ${idx + 1}: Company name is required`);
      }
      if (!exp.position?.trim()) {
        errors.push(`Experience ${idx + 1}: Position is required`);
      }
    });
  }

  // Validate education entries
  if (data.education && Array.isArray(data.education)) {
    data.education.forEach((edu, idx) => {
      if (!edu.school?.trim()) {
        errors.push(`Education ${idx + 1}: School name is required`);
      }
      if (!edu.degree?.trim()) {
        errors.push(`Education ${idx + 1}: Degree is required`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
