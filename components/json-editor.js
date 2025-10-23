"use client"

import { useState, useEffect } from "react"
import { validateResumeData } from "@/utils/resume-validator"

export default function JSONEditor({ data, onDataUpdate }) {
  const [jsonText, setJsonText] = useState("")
  const [error, setError] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [showValidation, setShowValidation] = useState(false)
  const [isCompact, setIsCompact] = useState(true)

  useEffect(() => {
    setJsonText(JSON.stringify(data, null, 2))
  }, [data])

  const handleChange = (e) => {
    const text = e.target.value
    setJsonText(text)

    try {
      const parsed = JSON.parse(text)
      setError("")
      onDataUpdate(parsed)
      const validation = validateResumeData(parsed)
      setValidationErrors(validation.errors)
    } catch (err) {
      setError("Invalid JSON format")
      setValidationErrors([])
    }
  }

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText)
      setJsonText(JSON.stringify(parsed, null, 2))
      setError("")
    } catch (err) {
      setError("Invalid JSON format")
    }
  }

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(jsonText)
      const validation = validateResumeData(parsed)
      setValidationErrors(validation.errors)
      setShowValidation(true)
    } catch (err) {
      setError("Invalid JSON format")
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Resume Data (JSON)</h3>
          <p className="text-xs text-slate-600">Edit your resume information</p>
        </div>
        <button
          onClick={() => setIsCompact(!isCompact)}
          className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
        >
          {isCompact ? "Expand" : "Compact"}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <textarea
          value={jsonText}
          onChange={handleChange}
          className={`flex-1 p-4 font-mono text-xs resize-none focus:outline-none bg-white text-slate-900 border-0 ${
            error ? "bg-red-50" : ""
          }`}
          spellCheck="false"
          style={{
            lineHeight: "1.5",
          }}
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-3 text-xs text-red-700 font-semibold">✕ {error}</div>
      )}

      {/* Validation Display */}
      {showValidation && validationErrors.length > 0 && (
        <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-3 max-h-20 overflow-y-auto">
          <p className="text-xs font-bold text-yellow-900 mb-2">Validation Issues:</p>
          <ul className="space-y-1">
            {validationErrors.map((err, idx) => (
              <li key={idx} className="text-xs text-yellow-800">
                • {err}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-slate-200 px-4 py-3 bg-white flex gap-2">
        <button
          onClick={handleFormat}
          className="px-3 py-2 bg-slate-600 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors"
        >
          Format
        </button>
        <button
          onClick={handleValidate}
          className="px-3 py-2 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          Validate
        </button>
      </div>
    </div>
  )
}
