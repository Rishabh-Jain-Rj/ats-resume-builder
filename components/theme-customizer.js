"use client"

import { useState } from "react"
import { COLOR_PRESETS, FONT_OPTIONS } from "@/constants/resume-templates"

export default function ThemeCustomizer({ theme, fonts, onThemeUpdate, onFontsUpdate }) {
  const [expandedSection, setExpandedSection] = useState("presets")

  const handleColorPresetClick = (preset) => {
    onThemeUpdate({
      ...theme,
      primary: preset.primary,
      accent: preset.accent,
    })
  }

  const handlePrimaryColorChange = (e) => {
    onThemeUpdate({
      ...theme,
      primary: e.target.value,
    })
  }

  const handleAccentColorChange = (e) => {
    onThemeUpdate({
      ...theme,
      accent: e.target.value,
    })
  }

  const handleBackgroundColorChange = (e) => {
    onThemeUpdate({
      ...theme,
      background: e.target.value,
    })
  }

  const handleFontChange = (fontType, fontValue) => {
    onFontsUpdate({
      ...fonts,
      [fontType]: fontValue,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Theme</h3>

      {/* Color Presets */}
      <div className="mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === "presets" ? null : "presets")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <label className="text-sm font-medium text-slate-700 cursor-pointer">Color Presets</label>
          <span className="text-slate-500">{expandedSection === "presets" ? "−" : "+"}</span>
        </button>

        {expandedSection === "presets" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleColorPresetClick(preset)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
              >
                <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.primary }} />
                <span className="text-sm">{preset.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom Colors */}
      <div className="mb-6">
        <button
          onClick={() => setExpandedSection(expandedSection === "colors" ? null : "colors")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <label className="text-sm font-medium text-slate-700 cursor-pointer">Custom Colors</label>
          <span className="text-slate-500">{expandedSection === "colors" ? "−" : "+"}</span>
        </button>

        {expandedSection === "colors" && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primary}
                  onChange={handlePrimaryColorChange}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-mono">{theme.primary}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.accent}
                  onChange={handleAccentColorChange}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-mono">{theme.accent}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.background}
                  onChange={handleBackgroundColorChange}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-mono">{theme.background}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fonts */}
      <div>
        <button
          onClick={() => setExpandedSection(expandedSection === "fonts" ? null : "fonts")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <label className="text-sm font-medium text-slate-700 cursor-pointer">Fonts</label>
          <span className="text-slate-500">{expandedSection === "fonts" ? "−" : "+"}</span>
        </button>

        {expandedSection === "fonts" && (
          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Heading Font</label>
              <select
                value={fonts.heading}
                onChange={(e) => handleFontChange("heading", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Body Font</label>
              <select
                value={fonts.body}
                onChange={(e) => handleFontChange("body", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
