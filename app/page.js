"use client";

import { useState, useEffect } from "react";
import { DEFAULT_RESUME_DATA } from "@/constants/resume-templates";
import { saveResumeData, loadResumeData } from "@/utils/storage";
import FormEditor from "@/components/form-editor";
import ResumePreview from "@/components/resume-preview";
import ATSIndicator from "@/components/ats-indicator";
import ExportOptions from "@/components/export-options";
import { FiDownload, FiRotateCcw } from "react-icons/fi";
import ConfirmPopup from "@/components/confirm-popup";

export default function Home() {
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA);
  const [showATSDrawer, setShowATSDrawer] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("form");
  const [isSaved, setIsSaved] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const savedData = loadResumeData();
    if (savedData) setResumeData(savedData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        saveResumeData(resumeData);
        setIsSaved(true);
      }, 500);
      setIsSaved(false);
      return () => clearTimeout(timer);
    }
  }, [resumeData, isLoading]);

  const handleDataUpdate = (newData) => {
    setResumeData(newData);
  };

  const handleReset = () => {
    setResumeData(DEFAULT_RESUME_DATA);
    localStorage.removeItem("resumeData");
    setIsSaved(true);
    setShowResetConfirm(false);
  };

  const displayHeaderUI = () => (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              ResumeCrafter
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              ATS-Optimized Resume Builder
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentView("form")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base cursor-pointer ${
                currentView === "form"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setCurrentView("preview")}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base cursor-pointer ${
                currentView === "preview"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Preview
            </button>
          </div>

          <div className="flex gap-2 ">
            <button
              onClick={() => setShowExportOptions(true)}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base cursor-pointer flex items-center gap-2"
              title="Export resume"
            >
              <FiDownload size={18} />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base cursor-pointer flex items-center gap-2"
              title="Reset all data"
            >
              <FiRotateCcw size={18} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const displayTopRowUI = () => (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
      {/* Form Editor - 4 columns */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
            <h2 className="text-lg font-semibold">Resume Information</h2>
            <p className="text-sm text-blue-100">Fill in your details</p>
          </div>
          <div className=" overflow-y-auto">
            <FormEditor data={resumeData} onDataUpdate={handleDataUpdate} />
          </div>
        </div>
      </div>

      {/* ATS Indicator - 2 columns */}
      <div className="lg:col-span-2">
        <ATSIndicator
          resumeData={resumeData}
          onOpenDrawer={() => setShowATSDrawer(true)}
        />

        <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
          <p className="text-xs text-slate-600">
            {isSaved ? "✓ All changes saved" : "Saving..."}
          </p>
        </div>
      </div>
    </div>
  );

  const displayPreviewUI = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Resume Preview</h2>
          <p className="text-sm text-slate-300">
            Your resume as it will appear to employers
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-8 bg-slate-50 min-h-screen overflow-auto">
        <ResumePreview data={resumeData} />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading ResumeCrafter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {displayHeaderUI()}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "form" ? <>{displayTopRowUI()}</> : displayPreviewUI()}
      </main>

      {/* ATS Drawer */}
      {showATSDrawer && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-lg sm:rounded-lg overflow-hidden shadow-xl w-full sm:max-w-2xl ">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-slate-900">
                ATS Score Details
              </h2>
              <button
                onClick={() => setShowATSDrawer(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="p-6 m-2 max-h-96 overflow-y-auto">
              <ATSIndicator resumeData={resumeData} showFullDetails={true} />
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <ConfirmPopup
          title="Reset All Data?"
          message="This will delete all your resume data and reset to defaults. This action cannot be undone."
          isDangerous={true}
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}

      {showExportOptions && (
        <ExportOptions
          resumeData={resumeData}
          onClose={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
}
