"use client";

import { useMemo } from "react";
import { FiInfo } from "react-icons/fi";
import {
  calculateATSScore,
  getATSRecommendations,
  getATSWarnings,
} from "@/constants/ats-scoring";

export default function ATSIndicator({
  resumeData,
  showFullDetails = false,
  onOpenDrawer,
}) {
  const { score, breakdown } = useMemo(
    () => calculateATSScore(resumeData),
    [resumeData]
  );
  const recommendations = useMemo(
    () => getATSRecommendations(resumeData),
    [resumeData]
  );
  const warnings = useMemo(() => getATSWarnings(resumeData), [resumeData]);

  const getScoreColor = (score) => {
    if (score >= 90) return "from-green-500 to-green-600";
    if (score >= 75) return "from-blue-500 to-blue-600";
    if (score >= 50) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Work";
  };

  const errors = recommendations.filter((r) => r.type === "error");
  const warningItems = recommendations.filter((r) => r.type === "warning");

  if (!showFullDetails) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 top-24 cursor-pointer">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 group relative">
              <h3 className="text-lg font-bold text-slate-900">ATS Score</h3>
              <button
                onClick={() => onOpenDrawer && onOpenDrawer()}
                className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <FiInfo size={18} />
              </button>
              <div className="absolute bottom-full left-0  hidden group-hover:block bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10">
                Click to see detailed recommendations
              </div>
            </div>
            <span
              className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(
                score
              )} bg-clip-text text-transparent`}
            >
              {score}%
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
            <div
              className={`h-full transition-all duration-300 bg-gradient-to-r ${getScoreColor(
                score
              )}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {getScoreLabel(score)}
          </p>
        </div>

        {/* Top Warning */}
        {warnings.length > 0 && (
          <div className="mb-4 p-3 rounded-lg border-l-4 border-yellow-500 bg-yellow-50">
            <p className="text-xs font-semibold text-yellow-900">
              {warnings[0].title}
            </p>
            <p className="text-xs text-yellow-800 mt-1">
              {warnings[0].message}
            </p>
          </div>
        )}

        {/* Critical Issues */}
        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs font-bold text-red-900 mb-2">
              Critical Issues ({errors.length}):
            </p>
            <ul className="space-y-1">
              {errors.slice(0, 3).map((rec, idx) => (
                <li
                  key={idx}
                  className="text-xs text-red-800 flex items-start gap-2"
                >
                  <span className="text-red-600 font-bold mt-0.5">✕</span>
                  <span>{rec.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Success */}
        {score === 100 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800 font-semibold">
              ✓ Perfect! Your resume is fully optimized for ATS systems.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Display */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">ATS Score</h3>
          <span
            className={`text-4xl font-bold bg-gradient-to-r ${getScoreColor(
              score
            )} bg-clip-text text-transparent`}
          >
            {score}%
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-300 bg-gradient-to-r ${getScoreColor(
              score
            )}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-sm font-semibold text-slate-700">
          {getScoreLabel(score)}
        </p>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="p-3 rounded-lg border-l-4 border-yellow-500 bg-yellow-50">
          <p className="text-sm font-semibold text-yellow-900 mb-1">
            {warnings[0].title}
          </p>
          <p className="text-xs text-yellow-800">{warnings[0].message}</p>
        </div>
      )}

      {/* Score Breakdown */}
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="text-sm font-bold text-slate-900 mb-3">
          Score Breakdown
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-700">Personal Info</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(breakdown.personalInfo / 25) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-900 w-8 text-right">
                {breakdown.personalInfo}/25
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-700">Experience</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(breakdown.experience / 30) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-900 w-8 text-right">
                {Math.round(breakdown.experience)}/30
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-700">Education</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${(breakdown.education / 20) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-900 w-8 text-right">
                {Math.round(breakdown.education)}/20
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-700">Skills</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${(breakdown.skills / 15) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-900 w-8 text-right">
                {Math.round(breakdown.skills)}/15
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-700">Projects</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500"
                  style={{ width: `${(breakdown.projects / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-900 w-8 text-right">
                {Math.round(breakdown.projects)}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Issues */}
      {errors.length > 0 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs font-bold text-red-900 mb-2">
            Critical Issues ({errors.length}):
          </p>
          <ul className="space-y-1">
            {errors.map((rec, idx) => (
              <li
                key={idx}
                className="text-xs text-red-800 flex items-start gap-2"
              >
                <span className="text-red-600 font-bold mt-0.5">✕</span>
                <span>{rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warningItems.length > 0 && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs font-bold text-yellow-900 mb-2">
            Suggestions ({warningItems.length}):
          </p>
          <ul className="space-y-1">
            {warningItems.map((rec, idx) => (
              <li
                key={idx}
                className="text-xs text-yellow-800 flex items-start gap-2"
              >
                <span className="text-yellow-600 font-bold mt-0.5">!</span>
                <span>{rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success */}
      {score === 100 && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800 font-semibold">
            ✓ Perfect! Your resume is fully optimized for ATS systems.
          </p>
        </div>
      )}
    </div>
  );
}
