import React from 'react'

const EducationPreview = ({ resumeInfo }) => {
    return (
        <div>
            <h2
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor }}
            >Education
            </h2>
            <hr
                style={{ borderColor: resumeInfo?.themeColor }}
            />
            {resumeInfo?.education.map((education, index) => (
                <div className='my-5' key={index}>
                    <h2
                        className='text-sm font-bold'
                        style={{ color: resumeInfo?.themeColor }}
                    >
                        {education?.universityName}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {education?.degree} in {education?.major}
                        <span>
                            {education?.startDate} - {education?.endDate}
                        </span>
                    </h2>
                    <p className='text-xs my-2'>
                        {education?.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default EducationPreview