import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Dummy from '../../../../Data/Dummy.jsx'; // ✅ Fallback data

const formField = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: ''
};

const Education = ({enableNext}) => {
    const [educationalList, setEducationalList] = useState([formField]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    

    // ✅ Fetch existing resume data or use Dummy fallback
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user-resume/${resumeId}`);
                if (response.status === 200) {
                    const data = response.data;
                    setResumeInfo(data);
                    setEducationalList(data.education && data.education.length > 0 ? data.education : Dummy.education);
                }
            } catch (error) {
                console.error('Error fetching education data:', error);
                setEducationalList(Dummy.education); // fallback on error
            }
        };

        if (resumeId) {
            fetchData();
        }
    }, [resumeId, setResumeInfo]);
    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const updatedList = [...educationalList];
        updatedList[index][name] = value;

        setEducationalList(updatedList);

        // 🔁 Sync resumeInfo context immediately
        setResumeInfo(prev => ({
            ...prev,
            education: updatedList
        }));
    };

    const AddNewEducation = () => {
        setEducationalList([...educationalList, { ...formField }]);
    };

    const RemoveEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        }
    };

    const updateResumeDetail = (resumeId, data) =>
        axios.put(`http://localhost:8000/user-resume/${resumeId}`, data);

    const onSave = async () => {
        setLoading(true);
        try {
            const updated = { ...resumeInfo, education: educationalList };
            await updateResumeDetail(resumeId, updated);
            setResumeInfo(updated);
            toast('Education updated');
            enableNext(true);
        } catch (err) {
            console.error('Error saving education:', err);
            toast.error('Failed to save education');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 rounded-lg shadow-lg border-t-sky-500 border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Education</h2>
                <p>Add Your Educational Details</p>
                <div>
                    {educationalList.map((item, index) => (
                        <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label className='text-xs'>University Name</label>
                                <Input
                                    name="universityName"
                                    value={item.universityName}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Degree</label>
                                <Input
                                    name="degree"
                                    value={item.degree}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Major</label>
                                <Input
                                    name="major"
                                    value={item.major}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>Start Date</label>
                                <Input
                                    type="date"
                                    name="startDate"
                                    value={item.startDate}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label className='text-xs'>End Date</label>
                                <Input
                                    type="date"
                                    name="endDate"
                                    value={item.endDate}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label className='text-xs'>Description</label>
                                <textarea
                                    className='border w-full rounded-lg'
                                    name='description'
                                    value={item.description}
                                    onChange={(e) => handleChange(e, index)}
                                ></textarea>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3'>
                        <Button
                            onClick={AddNewEducation}
                            variant="outline"
                            className="border-purple-600 hover:text-purple-600"
                        >
                            + Add More Education
                        </Button>
                        <Button
                            onClick={RemoveEducation}
                            variant="outline"
                            className="border-rose-600 hover:text-rose-600"
                        >
                            - Remove
                        </Button>
                    </div>

                    <Button
                        onClick={onSave}
                        disabled={loading}
                        className="bg-sky-600"
                    >
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Education;
