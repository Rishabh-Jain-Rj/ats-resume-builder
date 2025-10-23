"use client";

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  onReset,
  onClose,
}) {
  const templates = [
    {
      id: "ats-friendly",
      name: "ATS Friendly",
      description: "Simple, clean, and ATS-optimized",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Classic professional format",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Contemporary layout",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Resume Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Template Selection */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Select Template
            </h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template.id);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all border-2 cursor-pointer ${
                    selectedTemplate === template.id
                      ? "bg-blue-50 border-blue-600 text-blue-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold text-sm">{template.name}</div>
                  <div className="text-xs text-slate-600">
                    {template.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 mb-3 font-semibold">
              Danger Zone
            </p>
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure? This will clear all your data and cannot be undone."
                  )
                ) {
                  onReset();
                  onClose();
                }
              }}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold text-sm cursor-pointer border-2 border-red-700"
            >
              🗑️ Reset All Data
            </button>
            <p className="text-xs text-red-600 mt-2">
              This will delete all your resume data and reset to defaults.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
