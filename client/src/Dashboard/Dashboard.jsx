import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch user resume list
  const userDataList = async () => {
    if (!user) return;

    try {
      const response = await axios.get('https://ai-resume-builder-backend-yq3g.onrender.com/api/resumes' || 'http://localhost:8000/api/resumes', {
        params: { userEmail: user.primaryEmailAddress.emailAddress },

      });
      console.log(response)
      setResumeList(response.data);
      setLoading(false);
    } catch (error) {
      setError('No resumes found');
      setLoading(false);
      console.log(error)
    }
  };

  // Handle resume deletion
  const handleDeleteSuccess = (deletedResumeId) => {
    setResumeList((prevList) => prevList.filter((resume) => resume.id !== deletedResumeId));
  };

  useEffect(() => {
    if (user) {
      userDataList();  // Fetch resumes when user is available
    }
  }, [user]);

  return (
    <div className='p-10 md:px-20 lg:px-32 bg-gray-100 h-screen'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} onDeleteSuccess={handleDeleteSuccess} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard