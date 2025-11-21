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

  const formatDateRange = (startDate, endDate, isCurrentRole) => {
    const start = formatDate(startDate);
    const end = isCurrentRole ? "Present" : formatDate(endDate);
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
    <div
      className="max-w-4xl mx-auto bg-white shadow-sm rounded-md p-8 sm:p-12 text-slate-900 font-serif print:p-0"
      style={{ lineHeight: "1.25" }}
    >
      <div className="mb-6 pb-4 border-b-2 border-slate-300">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ fontSize: "24px" }}
        >
          {data.personalInfo.fullName}
        </h1>
        <div
          className="flex flex-wrap gap-1 text-xs sm:text-sm text-slate-700 mb-2"
          style={{ fontSize: "11px", lineHeight: "1.4" }}
        >
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && (
            <>
              <span>|</span>
              <span>{data.personalInfo.phone}</span>
            </>
          )}
          {data.personalInfo.location && (
            <>
              <span>|</span>
              <span>{data.personalInfo.location}</span>
            </>
          )}
        </div>
        {(data.personalInfo.linkedin ||
          data.personalInfo.github ||
          data.personalInfo.website) && (
          <div
            className="flex flex-wrap gap-1 text-xs sm:text-sm text-slate-700"
            style={{ fontSize: "11px", lineHeight: "1.4" }}
          >
            {data.personalInfo.linkedin && (
              <>
                <span>LinkedIn:</span>
                <a
                  href={data.personalInfo.linkedin}
                  className="text-blue-600 hover:underline"
                >
                  {data.personalInfo.linkedin}
                </a>
              </>
            )}
            {data.personalInfo.github && (
              <>
                <span>|</span>
                <span>GitHub:</span>
                <a
                  href={data.personalInfo.github}
                  className="text-blue-600 hover:underline"
                >
                  {data.personalInfo.github}
                </a>
              </>
            )}
            {data.personalInfo.website && (
              <>
                <span>|</span>
                <span>Portfolio:</span>
                <a
                  href={data.personalInfo.website}
                  className="text-blue-600 hover:underline"
                >
                  {data.personalInfo.website}
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {data.personalInfo.summary && (
        <div className="mb-6" style={{ fontSize: "12px", lineHeight: "1.3" }}>
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-2 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Summary
          </h2>
          <p className="leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold" style={{ fontSize: "13.5px" }}>
                    {exp.position}
                  </h3>
                  <span
                    className="text-xs text-slate-600"
                    style={{ fontSize: "11px" }}
                  >
                    {formatDateRange(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrentRole
                    )}
                  </span>
                </div>
                <p
                  className="text-xs font-semibold text-slate-700 mb-2"
                  style={{ fontSize: "11.5px" }}
                >
                  {exp.company}
                  {exp.location && ` | ${exp.location}`}
                </p>
                {(exp.bullets || []).length > 0 && (
                  <ul
                    className="leading-relaxed space-y-1"
                    style={{ fontSize: "12px", lineHeight: "1.3" }}
                  >
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex gap-2">
                        <span className="text-slate-600">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold" style={{ fontSize: "13.5px" }}>
                    {edu.degree}
                  </h3>
                  <span
                    className="text-xs text-slate-600"
                    style={{ fontSize: "11px" }}
                  >
                    {formatDateRange(
                      edu.startDate,
                      edu.endDate,
                      edu.isCurrentRole
                    )}
                  </span>
                </div>
                <p
                  className="text-xs font-semibold text-slate-700"
                  style={{ fontSize: "11.5px" }}
                >
                  {edu.school}
                </p>
                {edu.field && (
                  <p
                    className="text-sm text-slate-700"
                    style={{ fontSize: "12px" }}
                  >
                    {edu.field}
                  </p>
                )}
                {edu.score && (
                  <p
                    className="text-xs text-slate-700"
                    style={{ fontSize: "11px" }}
                  >
                    Score: {edu.score}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold" style={{ fontSize: "13.5px" }}>
                    {project.name}
                  </h3>
                  {project.link && (
                    <span
                      className="text-xs text-slate-600"
                      style={{ fontSize: "11px" }}
                    >
                      {project.link}
                    </span>
                  )}
                </div>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "12px", lineHeight: "1.3" }}
                >
                  {project.description}
                </p>
                {project.technologies && (
                  <p
                    className="text-xs text-slate-700 mt-1"
                    style={{ fontSize: "11px" }}
                  >
                    <span className="font-semibold">Technologies:</span>{" "}
                    {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Certifications & Achievements
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <p
                    className="text-sm font-semibold text-slate-900"
                    style={{ fontSize: "12.5px" }}
                  >
                    {cert.title}
                  </p>
                  <p
                    className="text-xs text-slate-700"
                    style={{ fontSize: "11px" }}
                  >
                    {cert.issuer}
                  </p>
                </div>
                {cert.date && (
                  <span
                    className="text-xs text-slate-600"
                    style={{ fontSize: "11px" }}
                  >
                    {formatDate(cert.date)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2
            className="text-sm font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-1"
            style={{ fontSize: "14px", fontWeight: "bold" }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <p
                  className="text-xs font-bold text-slate-900 print:font-bold"
                  style={{ fontSize: "12px", fontWeight: "bold" }}
                >
                  {category}
                </p>
                <p
                  className="text-sm text-slate-700"
                  style={{ fontSize: "12px" }}
                >
                  {skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
