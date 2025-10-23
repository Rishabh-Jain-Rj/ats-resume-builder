"use client";

export default function ResumePreview({ data, template = "ats-friendly" }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month] = dateString.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} — ${end}`;
  };

  // Group skills by category
  const skillsByCategory = {};
  data.skills?.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill.name);
  });

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 text-slate-900 font-serif print:p-0">
      {/* Header - Name and Contact */}
      <div className="mb-6 pb-4 border-b-2 border-slate-300">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          {data.personalInfo.fullName}
        </h1>
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-slate-700">
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.phone && data.personalInfo.email && <span>◆</span>}
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {(data.personalInfo.phone || data.personalInfo.email) &&
            data.personalInfo.location && <span>◆</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-slate-300 pb-1">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">{exp.position}</h3>
                  <span className="text-xs text-slate-600">
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  {exp.company}
                </p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <span className="text-xs text-slate-600">
                    {formatDate(edu.graduationDate)}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700">
                  {edu.school}
                </p>
                {edu.field && (
                  <p className="text-sm text-slate-700">{edu.field}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm">{project.name}</h3>
                  {project.link && (
                    <span className="text-xs text-slate-600">
                      {project.link}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{project.description}</p>
                {project.technologies && (
                  <p className="text-xs text-slate-700 mt-1">
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1">
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <p className="text-xs font-bold text-slate-900 print:font-bold">
                  {category}
                </p>
                <p className="text-sm text-slate-700">{skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
