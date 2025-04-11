import React from 'react';
import dummyData from '@/Data/Dummy';

const SkillsPreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;

    return (
        <div>
            <h2 className='text-center font-bold text-sm mb-2' style={{ color: data.themeColor }}>
                Skills
            </h2>
            <hr style={{ borderColor: data.themeColor }} />
            <div className='grid grid-cols-2 gap-3 my-4'>
                {
                    (data.skills || []).map((skill, index) => (
                        <div key={index} className='flex justify-between items-center'>
                            <h2 className='text-xs'>{skill.name}</h2>
                            <div className='h-2 bg-gray-200 w-[120px]'>
                                <div
                                    className='h-2'
                                    style={{
                                        backgroundColor: data.themeColor,
                                        width: `${Math.round((skill.rating || 0) / 20) * 20}%`  // round rating to nearest 20%
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SkillsPreview;
