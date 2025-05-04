// client\src\Dashboard\resume\components\Forms\PersonalDetail.jsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import axios from 'axios';
import { Loader, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PersonalDetail = ({ enableNext }) => {
    const { resumeId } = useParams();
    const { resumeInfo = {}, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    // Fetch personal details if available
    useEffect(() => {
        const fetchPersonalDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/user-resume/${resumeId}`);
                if (res.data) {
                    setResumeInfo(res.data);
                }
            } catch (error) {
                console.log('No personal details yet, ready to create');
            }
        };

        if (resumeId) fetchPersonalDetails();
    }, [resumeId]);

    const handleInputChange = (e) => {
        enableNext(false);
        const { name, value } = e.target;
        setResumeInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateResumeDetail = (resumeId, data) =>
        axios.put(`http://localhost:8000/user-resume/${resumeId}`, data);

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateResumeDetail(resumeId, resumeInfo);
            enableNext(true);
            toast("Details updated")
        } catch (err) {
            console.error("Error saving personal details:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 rounded-lg shadow-lg border-t-sky-500 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Personal Details</h2>
            <p>Get started with your basic information</p>

            <form onSubmit={onSave}>
                <div className='grid grid-cols-2 mt-5 gap-3'>
                    <div>
                        <label className='text-sm'>First Name</label>
                        <Input
                            name="firstName"
                            required
                            value={resumeInfo.firstName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Last Name</label>
                        <Input
                            name="lastName"
                            required
                            value={resumeInfo.lastName || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Job Title</label>
                        <Input
                            name="jobTitle"
                            required
                            value={resumeInfo.jobTitle || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-sm'>Address</label>
                        <Input
                            name="address"
                            required
                            value={resumeInfo.address || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Phone</label>
                        <Input
                            name="phone"
                            required
                            value={resumeInfo.phone || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='text-sm'>Email</label>
                        <Input
                            name="email"
                            required
                            value={resumeInfo.email || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='mt-3 flex justify-end'>
                    <Button
                        className="bg-sky-600"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PersonalDetail;
