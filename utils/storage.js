// Local storage utilities for persisting resume data
const STORAGE_KEY = "resumeCrafter_data";

export const saveResumeData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving resume data:", error);
    return false;
  }
};

export const loadResumeData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading resume data:", error);
    return null;
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing data:", error);
    return false;
  }
};
