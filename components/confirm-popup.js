"use client";
import { MdDangerous } from "react-icons/md";
export default function ConfirmPopup({
  title,
  message,
  onConfirm,
  onCancel,
  isDangerous = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                isDangerous ? "bg-red-100" : "bg-blue-100"
              }`}
            >
              {" "}
              <MdDangerous
                className={isDangerous ? "text-red-600" : "text-blue-600"}
                size={24}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="text-sm text-slate-600 mt-2">{message}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors font-medium text-sm cursor-pointer ${
              isDangerous
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isDangerous ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
