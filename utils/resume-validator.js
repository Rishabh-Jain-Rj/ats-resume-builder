// Validation utilities for resume data
export const validateResumeData = (data) => {
  const errors = []

  // Validate personal info
  if (!data.personalInfo) {
    errors.push("Personal information is required")
  } else {
    if (!data.personalInfo.fullName?.trim()) {
      errors.push("Full name is required")
    }
    if (!data.personalInfo.email?.trim()) {
      errors.push("Email is required")
    }
  }

  // Validate experience entries
  if (data.experience && Array.isArray(data.experience)) {
    data.experience.forEach((exp, idx) => {
      if (!exp.company?.trim()) {
        errors.push(`Experience ${idx + 1}: Company name is required`)
      }
      if (!exp.position?.trim()) {
        errors.push(`Experience ${idx + 1}: Position is required`)
      }
    })
  }

  // Validate education entries
  if (data.education && Array.isArray(data.education)) {
    data.education.forEach((edu, idx) => {
      if (!edu.school?.trim()) {
        errors.push(`Education ${idx + 1}: School name is required`)
      }
      if (!edu.degree?.trim()) {
        errors.push(`Education ${idx + 1}: Degree is required`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const sanitizeResumeData = (data) => {
  return {
    personalInfo: {
      fullName: data.personalInfo?.fullName?.trim() || "",
      email: data.personalInfo?.email?.trim() || "",
      phone: data.personalInfo?.phone?.trim() || "",
      location: data.personalInfo?.location?.trim() || "",
      summary: data.personalInfo?.summary?.trim() || "",
    },
    experience: (data.experience || []).map((exp) => ({
      id: exp.id || generateId(),
      company: exp.company?.trim() || "",
      position: exp.position?.trim() || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      description: exp.description?.trim() || "",
    })),
    education: (data.education || []).map((edu) => ({
      id: edu.id || generateId(),
      school: edu.school?.trim() || "",
      degree: edu.degree?.trim() || "",
      field: edu.field?.trim() || "",
      graduationDate: edu.graduationDate || "",
    })),
    skills: (data.skills || []).map((skill) => ({
      id: skill.id || generateId(),
      name: skill.name?.trim() || "",
      category: skill.category?.trim() || "",
    })),
    projects: (data.projects || []).map((proj) => ({
      id: proj.id || generateId(),
      name: proj.name?.trim() || "",
      description: proj.description?.trim() || "",
      technologies: proj.technologies?.trim() || "",
    })),
  }
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}
