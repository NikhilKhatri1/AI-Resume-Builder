import React from 'react';
import dummyData from "../../../../Data/Dummy.jsx";

const ExperiencePreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;

    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2' style={{ color: data.themeColor }}>
                Professional Experience
            </h2>
            <hr style={{ borderColor: data.themeColor }} />

            {(data.experience || []).map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold' style={{ color: data.themeColor }}>
                        {experience.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {experience.companyName}, {experience.city}, {experience.state}
                        <span>
                            {experience.startDate} to {experience.currentlyWorking ? "Present" : experience.endDate}
                        </span>
                    </h2>

                    {/* 🔧 Styling applied for rich text content */}
                    <div
                        className='text-xs my-2 leading-relaxed [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5 [&>li]:mb-1'
                        dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ExperiencePreview;
