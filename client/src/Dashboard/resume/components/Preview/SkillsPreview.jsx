import React from 'react';
import dummyData from "../../../../Data/Dummy.jsx";

const SkillsPreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;

    return (
        <div>
            <h2 className='text-center font-bold text-sm mb-2' style={{ color: data.themeColor }}>
                Skills
            </h2>
            <hr style={{ borderColor: data.themeColor }} />
            <div className='grid grid-cols-2 gap-3 my-4'>
                {(data.skills || []).map((skill, index) => {
                    const widthPercent = Math.max(20, (skill.rating || 0) * 20); // min 20%
                    return (
                        <div key={index} className='flex justify-between items-center'>
                            <h2 className='text-xs w-1/3'>{skill.name}</h2>
                            <div className='h-2 w-2/3 bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className='h-2 rounded-full transition-all duration-500'
                                    style={{
                                        backgroundColor: data.themeColor,
                                        width: `${widthPercent}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillsPreview;
