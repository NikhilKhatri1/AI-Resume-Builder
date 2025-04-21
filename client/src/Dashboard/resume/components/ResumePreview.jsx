import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonDetailPreview from './Preview/PersonDetailPreview';
import SummaryPreview from './Preview/SummaryPreview';
import ExperiencePreview from './Preview/ExperiencePreview';
import EducationPreview from './Preview/EducationPreview';
import SkillsPreview from './Preview/SkillsPreview';
import dummyData from '@/Data/Dummy';

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  // Fallback logic for merging dummyData with resumeInfo
  const mergedData = {
    ...dummyData,
    ...resumeInfo,
    experience: resumeInfo?.experience?.length ? resumeInfo.experience : dummyData.experience,
    education: resumeInfo?.education?.length ? resumeInfo.education : dummyData.education,
    skills: resumeInfo?.skills?.length ? resumeInfo.skills : dummyData.skills,
    summery: resumeInfo?.summary?.trim() ? resumeInfo.summary : dummyData.summary,
    themeColor: resumeInfo?.themeColor || dummyData.themeColor,
  };
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: mergedData.themeColor }}>
      <PersonDetailPreview resumeInfo={mergedData} />
      <SummaryPreview resumeInfo={mergedData} />
      <ExperiencePreview resumeInfo={mergedData} />
      <EducationPreview resumeInfo={mergedData} />
      <SkillsPreview resumeInfo={mergedData} />
    </div>
  );
};

export default ResumePreview;
