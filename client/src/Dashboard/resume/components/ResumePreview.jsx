import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonDetailPreview from './Preview/PersonDetailPreview';
import SummaryPreview from './Preview/SummaryPreview';

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor: resumeInfo?.themeColor
      }}
    >
      {/* Person Detail  */}
      <PersonDetailPreview resumeInfo={resumeInfo} />
      {/* Summary  */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience  */}

      {/* Skills  */}
    </div>
  )
}

export default ResumePreview