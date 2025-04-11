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
  const data = resumeInfo || dummyData;

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]' style={{ borderColor: data.themeColor }}>
      <PersonDetailPreview resumeInfo={data} />
      <SummaryPreview resumeInfo={data} />
      <ExperiencePreview resumeInfo={data} />
      <EducationPreview resumeInfo={data} />
      <SkillsPreview resumeInfo={data} />
    </div>
  );
};

export default ResumePreview;
