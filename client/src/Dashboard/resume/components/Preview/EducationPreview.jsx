// client\src\Dashboard\resume\components\Preview\EducationPreview.jsx
import React from 'react';
import dummyData from '../../../../Data/Dummy.jsx';

const EducationPreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;

    return (
        <div>
            <h2 className='text-center font-bold text-sm mb-2' style={{ color: data.themeColor }}>
                Education
            </h2>
            <hr style={{ borderColor: data.themeColor }} />
            {
                (data.education || []).map((education, index) => (
                    <div key={index} className='my-5'>
                        <h2 className='text-sm font-bold' style={{ color: data.themeColor }}>
                            {education.universityName}
                        </h2>
                        <h2 className='text-xs flex justify-between'>
                            {education.degree} in {education.major}
                            <span>{education.startDate} - {education.endDate}</span>
                        </h2>
                        <p className='text-xs my-2'>{education.description}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default EducationPreview;
