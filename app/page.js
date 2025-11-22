"use client";

import { useState, useEffect } from "react";
import { DEFAULT_RESUME_DATA } from "@/constants/resume-templates";
import { saveResumeData, loadResumeData } from "@/utils/storage";
import FormEditor from "@/components/form-editor";
import ResumePreview from "@/components/resume-preview";
import ATSIndicator from "@/components/ats-indicator";
import ExportOptions from "@/components/export-options";
import { FiDownload, FiRotateCcw } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import ConfirmPopup from "@/components/confirm-popup";

export default function Home() {
  const [resumeData, setResumeData] = useState(DEFAULT_RESUME_DATA);
  const [showATSDrawer, setShowATSDrawer] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("form");
  const [isSaved, setIsSaved] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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

  const handleClearData = () => {
    setResumeData({
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
        summary: "",
      },
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      skills: [],
    });
    localStorage.removeItem("resumeData");
    setIsSaved(true);
    setShowClearConfirm(false); // <-- Close popup!
  };

  const displayHeaderUI = () => (
    <header className="sticky top-0 z-50 bg-white/90  shadow-sm backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-10 py-3">
        <div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text  bg-blue-500 ">
            ResumeCrafter
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ATS-Optimized Resume Builder
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentView("form")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer ${
              currentView === "form"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setCurrentView("preview")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer ${
              currentView === "preview"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowExportOptions(true)}
            className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded-lg font-semibold text-sm flex items-center gap-1"
            title="Export resume"
          >
            <FiDownload size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg font-semibold text-sm flex items-center gap-1"
            title="Reset all data"
          >
            <FiRotateCcw size={18} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2 bg-yellow-500 cursor-pointer text-white rounded-lg font-semibold text-sm flex items-center gap-1"
            title="Clear all data"
          >
            <FiTrash2 size={18} />
            <span className="hidden sm:inline">Clear Data</span>
          </button>
        </div>
      </nav>
    </header>
  );

  const displayFormTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
      <div className="lg:col-span-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <div className=" bg-blue-500  text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Resume Information</h2>
            <p className="text-sm mt-1">Fill in your details below</p>
          </div>
          <div>
            <FormEditor data={resumeData} onDataUpdate={handleDataUpdate} />
          </div>
        </div>
      </div>

      {/* ATS Indicator - 2 columns */}
      <div className="lg:col-span-2">
        <div className="cursor-pointer">
          <ATSIndicator
            resumeData={resumeData}
            onOpenDrawer={() => setShowATSDrawer(true)}
          />
        </div>

        <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-300 shadow-sm flex items-center justify-center gap-2 text-gray-700 text-sm font-medium">
          <div
            className={`w-3 h-3 rounded-full ${
              isSaved ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
            }`}
          />
          {isSaved ? "All changes saved" : "Saving changes..."}
        </div>
      </div>
    </div>
  );

  const displayPreviewUI = () => <ResumePreview data={resumeData} />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg font-semibold text-gray-800">
            Loading ResumeCrafter...
          </p>
          <p className="text-sm text-gray-500 mt-2">Preparing your workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {displayHeaderUI()}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {currentView === "form" ? <>{displayFormTab()}</> : displayPreviewUI()}
      </main>

      {/* ATS Drawer */}
      {showATSDrawer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full sm:max-w-2xl border border-gray-200">
            <div className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ATS Score Details
              </h2>
              <button
                onClick={() => setShowATSDrawer(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-xl transition-all"
              >
                ×
              </button>
            </div>
            <div className="p-8 max-h-96 overflow-y-auto">
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
      {showClearConfirm && (
        <ConfirmPopup
          title="Clear All Data?"
          message="This will erase all resume fields and leave everything empty. This action cannot be undone."
          isDangerous={true}
          onConfirm={handleClearData}
          onCancel={() => setShowClearConfirm(false)}
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
