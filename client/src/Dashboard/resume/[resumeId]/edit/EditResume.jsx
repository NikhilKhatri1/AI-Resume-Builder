// resume/[resumeId]/edit/EditResume.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import Dummy from '@/Data/Dummy';

const EditResume = () => {
    const params = useParams();
    const [resumeInfo, setResumeInfo] = useState()
    useEffect(() => {
        setResumeInfo(Dummy)
    },[])
    return (
        <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section  */}
                <FormSection />
                {/* Preview Section  */}
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default EditResume