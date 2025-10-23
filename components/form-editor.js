"use client";

import { useState } from "react";

export default function FormEditor({ data, onDataUpdate }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [editorMode, setEditorMode] = useState("form");
  const [jsonError, setJsonError] = useState("");
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));

  const handleJsonChange = (text) => {
    setJsonText(text);
    try {
      const parsed = JSON.parse(text);
      onDataUpdate(parsed);
      setJsonError("");
    } catch (e) {
      setJsonError("Invalid JSON format");
    }
  };

  const handleDataChange = (newData) => {
    onDataUpdate(newData);
    setJsonText(JSON.stringify(newData, null, 2));
  };

  const handlePersonalInfoChange = (field, value) => {
    const newData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    };
    handleDataChange(newData);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    handleDataChange({ ...data, experience: newExperience });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...data.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    handleDataChange({ ...data, education: newEducation });
  };

  const handleProjectsChange = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    handleDataChange({ ...data, projects: newProjects });
  };

  const handleSkillsChange = (index, field, value) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    handleDataChange({ ...data, skills: newSkills });
  };

  const addExperience = () => {
    const newData = {
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    };
    handleDataChange(newData);
  };

  const removeExperience = (index) => {
    const newData = {
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    };
    handleDataChange(newData);
  };

  const addEducation = () => {
    const newData = {
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
    };
    handleDataChange(newData);
  };

  const removeEducation = (index) => {
    const newData = {
      ...data,
      education: data.education.filter((_, i) => i !== index),
    };
    handleDataChange(newData);
  };

  const addProject = () => {
    const newData = {
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now(),
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    };
    handleDataChange(newData);
  };

  const removeProject = (index) => {
    const newData = {
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    };
    handleDataChange(newData);
  };

  const addSkill = () => {
    const newData = {
      ...data,
      skills: [...data.skills, { id: Date.now(), name: "", category: "" }],
    };
    handleDataChange(newData);
  };

  const removeSkill = (index) => {
    const newData = {
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    };
    handleDataChange(newData);
  };

  const displayPersonalTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={data.personalInfo.fullName}
          onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={data.personalInfo.email}
          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          value={data.personalInfo.phone}
          onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={data.personalInfo.location}
          onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New York, NY"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Professional Summary
        </label>
        <textarea
          value={data.personalInfo.summary}
          onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          placeholder="Brief overview of your professional background and goals..."
        />
      </div>
    </div>
  );

  const displayExperienceTab = () => (
    <div className="space-y-4">
      {data.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 border border-slate-200 rounded-lg bg-slate-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">
              Experience {index + 1}
            </h3>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Company Name"
            />
            <input
              type="text"
              value={exp.position}
              onChange={(e) =>
                handleExperienceChange(index, "position", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Job Title"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) =>
                  handleExperienceChange(index, "startDate", e.target.value)
                }
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) =>
                  handleExperienceChange(index, "endDate", e.target.value)
                }
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              rows="3"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer"
      >
        + Add Experience
      </button>
    </div>
  );

  const displayEducationTab = () => (
    <div className="space-y-4">
      {data.education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 border border-slate-200 rounded-lg bg-slate-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">
              Education {index + 1}
            </h3>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={edu.school}
              onChange={(e) =>
                handleEducationChange(index, "school", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="School/University Name"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Degree (e.g., Bachelor of Science)"
            />
            <input
              type="text"
              value={edu.field}
              onChange={(e) =>
                handleEducationChange(index, "field", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Field of Study"
            />
            <input
              type="month"
              value={edu.graduationDate}
              onChange={(e) =>
                handleEducationChange(index, "graduationDate", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer"
      >
        + Add Education
      </button>
    </div>
  );

  const displayProjectsTab = () => (
    <div className="space-y-4">
      {data.projects.map((project, index) => (
        <div
          key={project.id}
          className="p-4 border border-slate-200 rounded-lg bg-slate-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">
              Project {index + 1}
            </h3>
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={project.name}
              onChange={(e) =>
                handleProjectsChange(index, "name", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Project Name"
            />
            <textarea
              value={project.description}
              onChange={(e) =>
                handleProjectsChange(index, "description", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              rows="2"
              placeholder="Project description..."
            />
            <input
              type="text"
              value={project.technologies}
              onChange={(e) =>
                handleProjectsChange(index, "technologies", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Technologies used (e.g., React, Node.js)"
            />
            <input
              type="url"
              value={project.link}
              onChange={(e) =>
                handleProjectsChange(index, "link", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Project link (optional)"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addProject}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer"
      >
        + Add Project
      </button>
    </div>
  );

  const displaySkillsTab = () => (
    <div className="space-y-4">
      {data.skills.map((skill, index) => (
        <div key={skill.id} className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Skill
            </label>
            <input
              type="text"
              value={skill.name}
              onChange={(e) =>
                handleSkillsChange(index, "name", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="e.g., JavaScript"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={skill.category}
              onChange={(e) =>
                handleSkillsChange(index, "category", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="e.g., Programming"
            />
          </div>
          <button
            onClick={() => removeSkill(index)}
            className="text-red-600 hover:text-red-700 font-medium px-3 py-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer"
      >
        + Add Skill
      </button>
    </div>
  );

  return (
    <div className="p-6">
      {/* Editor Mode Toggle */}
      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setEditorMode("form")}
          className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
            editorMode === "form"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "border-b-2 border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Form Editor
        </button>
        <button
          onClick={() => setEditorMode("json")}
          className={`px-4 py-2 font-medium transition-colors cursor-pointer ${
            editorMode === "json"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "border-b-2 border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          JSON Editor
        </button>
      </div>

      {/* Form Mode */}
      {editorMode === "form" && (
        <>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-200 overflow-x-auto">
            {[
              { id: "personal", label: "Personal" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "personal" && displayPersonalTab()}
          {activeTab === "experience" && displayExperienceTab()}
          {activeTab === "education" && displayEducationTab()}
          {activeTab === "projects" && displayProjectsTab()}
          {activeTab === "skills" && displaySkillsTab()}
        </>
      )}

      {/* JSON Editor Mode */}
      {editorMode === "json" && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              Edit your resume data as JSON. Changes will sync with the form
              editor automatically.
            </p>
          </div>
          {jsonError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-900 font-semibold">{jsonError}</p>
            </div>
          )}
          <textarea
            value={jsonText}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs resize-none"
            rows="20"
            spellCheck="false"
          />
        </div>
      )}
    </div>
  );
}
