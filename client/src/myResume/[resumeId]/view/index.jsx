import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import ResumePreview from '@/Dashboard/resume/components/ResumePreview'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'

const ViewResume = () => {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/user-resume/${resumeId}`);
                if (res.status === 200) {
                    const data = res.data;
                    console.log(data);
                    console.log(resumeId);
                    setResumeInfo(data); // <-- This is the fix!
                }
            } catch (err) {
                console.error("Error fetching resume:", err);
                toast.error("Failed to load resume data.");
            }
        };

        fetchData();
    }, [resumeId]);

    const handleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print'>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36 flex items-center justify-center flex-col'>
                    <h2 className='text-center text-2xl font-medium'>Congrats! Your Ultimate Ai Generated Resume is Ready</h2>
                    <p className='text-center text-gray-600 text-lg my-5'>Now, you are ready to download your resume and you can share your resume url with your friend and family</p>
                    <div className='flex justify-between px-44 my-10 gap-10 '>
                        <Button className="bg-sky-600" size="lg" onClick={handleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello! Download and Share Your Resume",
                                url: import.meta.env.VITE_BASE_URL + "my-resume/" + resumeId+"/view",
                                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button className="bg-sky-600" size="lg">Share</Button>
                        </RWebShare>

                    </div>
                </div>
            </div>
            <div id='print-area' className='flex items-center justify-center flex-col w-200 mb-10 mt-5 mx-auto'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume