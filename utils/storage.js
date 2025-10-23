// Local storage utilities for persisting resume data
const STORAGE_KEY = "resumeCrafter_data"
const THEME_KEY = "resumeCrafter_theme"
const TEMPLATE_KEY = "resumeCrafter_template"

export const saveResumeData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error("Error saving resume data:", error)
    return false
  }
}

export const loadResumeData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Error loading resume data:", error)
    return null
  }
}

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme))
    return true
  } catch (error) {
    console.error("Error saving theme:", error)
    return false
  }
}

export const loadTheme = () => {
  try {
    const theme = localStorage.getItem(THEME_KEY)
    return theme ? JSON.parse(theme) : null
  } catch (error) {
    console.error("Error loading theme:", error)
    return null
  }
}

export const saveTemplate = (templateId) => {
  try {
    localStorage.setItem(TEMPLATE_KEY, templateId)
    return true
  } catch (error) {
    console.error("Error saving template:", error)
    return false
  }
}

export const loadTemplate = () => {
  try {
    return localStorage.getItem(TEMPLATE_KEY) || "classic"
  } catch (error) {
    console.error("Error loading template:", error)
    return "classic"
  }
}

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(THEME_KEY)
    localStorage.removeItem(TEMPLATE_KEY)
    return true
  } catch (error) {
    console.error("Error clearing data:", error)
    return false
  }
}
