import React from 'react';

const LatestResumePreview = ({ resume }) => {
    if (!resume) return null;

    return (
        <div className="border p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold" style={{ color: resume.themeColor }}>
                {resume.firstName} {resume.lastName}
            </h2>
            <p className="text-sm text-gray-600">{resume.jobTitle}</p>
            <p className="mt-2 text-sm text-gray-800">{resume.summary}</p>

            <div className="mt-4">
                <h3 className="font-semibold text-sm mb-1" style={{ color: resume.themeColor }}>Top Skills:</h3>
                <ul className="list-disc list-inside text-sm">
                    {(resume.skills || []).slice(0, 3).map((skill, idx) => (
                        <li key={idx}>{skill.name} ({skill.rating}/5)</li>
                    ))}
                </ul>
            </div>

            {resume.experience?.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold text-sm mb-1" style={{ color: resume.themeColor }}>Recent Experience:</h3>
                    <p className="text-sm">{resume.experience[0].title} at {resume.experience[0].companyName}</p>
                </div>
            )}
        </div>
    );
};

export default LatestResumePreview;
