// client\src\Dashboard\Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // You should already have axios installed
import { useUser } from '@clerk/clerk-react';  // Assuming you are using Clerk for authentication
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';

const Dashboard = () => {
  const { user } = useUser();  // Get user data from Clerk
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error message if any
  // console.log(BACKEND_URL);
  // Function to fetch user resume list
  const userDataList = async () => {
    if (!user) return;

    try {
      const response = await axios.get('http://localhost:8000/api/resumes', {
        params: { userEmail: user.primaryEmailAddress.emailAddress },
      });
      console.log(response.data);  // Log the response data
      setResumeList(response.data);
      setLoading(false);
    } catch (error) {
      setError('No resumes found');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      userDataList();  // Fetch resumes when user is available
    }
  }, [user]);  // Re-run whenever user data changes

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {resumeList && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard