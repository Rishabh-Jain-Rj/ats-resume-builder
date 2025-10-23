"use client";

import { COLOR_PRESETS, FONT_OPTIONS } from "@/constants/resume-templates";

export default function SettingsPopup({
  theme,
  fonts,
  onThemeUpdate,
  onFontsUpdate,
  onClose,
  onReset,
}) {
  const handleColorChange = (field, value) => {
    onThemeUpdate({
      ...theme,
      [field]: value,
    });
  };

  const handleFontChange = (field, value) => {
    onFontsUpdate({
      ...fonts,
      [field]: value,
    });
  };

  const applyPreset = (preset) => {
    onThemeUpdate({
      primary: preset.primary,
      accent: preset.accent,
      background: "#ffffff",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Resume Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Color Presets */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Theme Color
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="w-full aspect-square rounded-lg border-2 border-slate-200 hover:border-slate-400 transition-colors"
                  style={{ backgroundColor: preset.primary }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Custom Color
            </h3>
            <div className="flex gap-2">
              <input
                type="color"
                value={theme.primary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                className="w-12 h-10 rounded-lg cursor-pointer border border-slate-300"
              />
              <input
                type="text"
                value={theme.primary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Fonts */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Font</h3>
            <select
              value={fonts.body}
              onChange={(e) => handleFontChange("body", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
