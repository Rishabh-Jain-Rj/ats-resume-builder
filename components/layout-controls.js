"use client"

import { useState } from "react"
import { SECTION_VISIBILITY_OPTIONS } from "@/constants/resume-templates"

export default function LayoutControls({ visibleSections, sectionOrder, onSectionVisibilityChange, onSectionReorder }) {
  const [isDragging, setIsDragging] = useState(null)

  const handleDragStart = (e, sectionId) => {
    setIsDragging(sectionId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e, targetId) => {
    e.preventDefault()
    if (!isDragging || isDragging === targetId) {
      setIsDragging(null)
      return
    }

    const draggedIndex = sectionOrder.indexOf(isDragging)
    const targetIndex = sectionOrder.indexOf(targetId)

    const newOrder = [...sectionOrder]
    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, isDragging)

    onSectionReorder(newOrder)
    setIsDragging(null)
  }

  const handleDragEnd = () => {
    setIsDragging(null)
  }

  const moveSection = (sectionId, direction) => {
    const currentIndex = sectionOrder.indexOf(sectionId)
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === sectionOrder.length - 1)
    ) {
      return
    }

    const newOrder = [...sectionOrder]
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    newOrder.splice(currentIndex, 1)
    newOrder.splice(newIndex, 0, sectionId)
    onSectionReorder(newOrder)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Section Layout</h3>

      <div className="space-y-2">
        {sectionOrder.map((sectionId) => {
          const section = SECTION_VISIBILITY_OPTIONS.find((s) => s.id === sectionId)
          if (!section) return null

          return (
            <div
              key={sectionId}
              draggable
              onDragStart={(e) => handleDragStart(e, sectionId)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, sectionId)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-2 p-2 rounded border-2 transition-all cursor-move ${
                isDragging === sectionId
                  ? "bg-blue-50 border-blue-400 opacity-50"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={visibleSections[sectionId] || false}
                onChange={() => onSectionVisibilityChange(sectionId)}
                className="w-4 h-4 rounded cursor-pointer"
              />

              {/* Drag Handle */}
              <span className="text-slate-400 text-sm">⋮⋮</span>

              {/* Label */}
              <span className="flex-1 text-xs font-medium text-slate-700">{section.label}</span>

              {/* Move Buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => moveSection(sectionId, "up")}
                  disabled={sectionOrder.indexOf(sectionId) === 0}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 text-xs"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection(sectionId, "down")}
                  disabled={sectionOrder.indexOf(sectionId) === sectionOrder.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 text-xs"
                >
                  ↓
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
