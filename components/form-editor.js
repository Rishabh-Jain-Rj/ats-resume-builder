"use client";

import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

export default function FormEditor({ data, onDataUpdate }) {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedFormTab") || "personal";
    }
    return "personal";
  });
  const [editorMode, setEditorMode] = useState("form");
  const [jsonError, setJsonError] = useState("");
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedFormTab", tabId);
    }
  };

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

  const handleExperienceBulletChange = (expIndex, bulletIndex, value) => {
    const newExperience = [...data.experience];
    if (!newExperience[expIndex].bullets) {
      newExperience[expIndex].bullets = [];
    }
    newExperience[expIndex].bullets[bulletIndex] = value;
    handleDataChange({ ...data, experience: newExperience });
  };

  const addExperienceBullet = (expIndex) => {
    const newExperience = [...data.experience];
    if (!newExperience[expIndex].bullets) {
      newExperience[expIndex].bullets = [];
    }
    newExperience[expIndex].bullets.push("");
    handleDataChange({ ...data, experience: newExperience });
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    const newExperience = [...data.experience];
    newExperience[expIndex].bullets.splice(bulletIndex, 1);
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

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...(data.certifications || [])];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    handleDataChange({ ...data, certifications: newCertifications });
  };

  const addCertification = () => {
    const newData = {
      ...data,
      certifications: [
        ...(data.certifications || []),
        { id: Date.now(), title: "", issuer: "", date: "" },
      ],
    };
    handleDataChange(newData);
  };

  const removeCertification = (index) => {
    const newData = {
      ...data,
      certifications: (data.certifications || []).filter((_, i) => i !== index),
    };
    handleDataChange(newData);
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
          location: "",
          startDate: "",
          endDate: "",
          bullets: [],
          isCurrentRole: false,
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
          startDate: "",
          endDate: "",
          isCurrentRole: false,
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
          LinkedIn Profile (Optional)
        </label>
        <input
          type="url"
          value={data.personalInfo.linkedin || ""}
          onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          GitHub Profile (Optional)
        </label>
        <input
          type="url"
          value={data.personalInfo.github || ""}
          onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://github.com/yourprofile"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Portfolio/Website (Optional)
        </label>
        <input
          type="url"
          value={data.personalInfo.website || ""}
          onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://yourportfolio.com"
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
              Work Experience {index + 1}
            </h3>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer flex items-center gap-1"
            >
              <FiX size={16} />
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
            <input
              type="text"
              value={exp.location || ""}
              onChange={(e) =>
                handleExperienceChange(index, "location", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Location (e.g., San Francisco, CA)"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleExperienceChange(index, "startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <div className="flex gap-2">
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "endDate", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={exp.isCurrentRole}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={exp.isCurrentRole || false}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          "isCurrentRole",
                          e.target.checked
                        )
                      }
                      className="cursor-pointer"
                    />
                    <span className="text-slate-700">Present</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700">
                Key Responsibilities & Achievements
              </label>
              {(exp.bullets || []).map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2">
                  <span className="text-slate-400 mt-2">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) =>
                      handleExperienceBulletChange(
                        index,
                        bulletIndex,
                        e.target.value
                      )
                    }
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Add achievement or responsibility..."
                  />
                  <button
                    onClick={() => removeExperienceBullet(index, bulletIndex)}
                    className="text-red-600 hover:text-red-700 font-medium px-2 py-2 cursor-pointer"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addExperienceBullet(index)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer flex items-center gap-1"
              >
                <FiPlus size={16} />
                Add Bullet Point
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <FiPlus size={18} />
        Add Work Experience
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
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer flex items-center gap-1"
            >
              <FiX size={16} />
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
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  End Date
                </label>
                <div className="flex gap-2">
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      handleEducationChange(index, "endDate", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={edu.isCurrentRole}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={edu.isCurrentRole || false}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "isCurrentRole",
                          e.target.checked
                        )
                      }
                      className="cursor-pointer"
                    />
                    <span className="text-slate-700">Present</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <FiPlus size={18} />
        Add Education
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
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer flex items-center gap-1"
            >
              <FiX size={16} />
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
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <FiPlus size={18} />
        Add Project
      </button>
    </div>
  );

  const displayCertificationsTab = () => (
    <div className="space-y-4">
      {(data.certifications || []).map((cert, index) => (
        <div
          key={cert.id}
          className="p-4 border border-slate-200 rounded-lg bg-slate-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-slate-900">
              Certification {index + 1}
            </h3>
            <button
              onClick={() => removeCertification(index)}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer flex items-center gap-1"
            >
              <FiX size={16} />
              Remove
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={cert.title}
              onChange={(e) =>
                handleCertificationChange(index, "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Certification Title"
            />
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) =>
                handleCertificationChange(index, "issuer", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Issuing Organization"
            />
            <input
              type="month"
              value={cert.date}
              onChange={(e) =>
                handleCertificationChange(index, "date", e.target.value)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addCertification}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <FiPlus size={18} />
        Add Certification
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
            className="text-red-600 hover:text-red-700 font-medium px-3 py-2 cursor-pointer flex items-center gap-1"
          >
            <FiX size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={addSkill}
        className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <FiPlus size={18} />
        Add Skill
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
              { id: "experience", label: "Work Experience" },
              { id: "education", label: "Education" },
              { id: "projects", label: "Projects" },
              { id: "certifications", label: "Certifications" },
              { id: "skills", label: "Skills" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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
          {activeTab === "certifications" && displayCertificationsTab()}
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
