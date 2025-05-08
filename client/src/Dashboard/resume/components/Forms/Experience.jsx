import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import Dummy from '../../../../Data/Dummy';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import RichTextEditor from '../RichTextEditor';
import { LoaderCircle } from 'lucide-react';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummary: ''
};

const Experience = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();

    // Fetch experience data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://ai-resume-builder-backend-yq3g.onrender.com/user-resume/${resumeId}`);
                if (res.status === 200) {
                    const data = res.data;
                    if (data.experience && data.experience.length > 0) {
                        setExperienceList(data.experience);
                        setResumeInfo(data);
                    } else {
                        toast.info("No experience data found. Loaded dummy data.");
                        setExperienceList(Dummy.experience);
                    }
                }
            } catch (err) {
                console.error("Error fetching experience:", err);
                toast.error("Failed to load experience data.");
                setExperienceList(Dummy.experience);
            }
        };

        fetchData();
    }, [resumeId]);

    const handleChange = (index, e) => {
        const newEntries = [...experienceList];
        const { name, value } = e.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const handleCheckboxChange = (index, checked) => {
        const newEntries = [...experienceList];
        newEntries[index].currentlyWorking = checked;
        if (checked) {
            newEntries[index].endDate = ''; // Optional: clear endDate
        }
        setExperienceList(newEntries);
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]);
    };

    const RemoveExperience = () => {
        setExperienceList(prev => prev.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const res = await axios.put(`https://ai-resume-builder-backend-yq3g.onrender.com/user-resume/${resumeId}`, {
                experience: experienceList
            });

            if (res.status === 200) {
                toast.success("Experience saved successfully!");
                setResumeInfo(res.data.data);
                enableNext(true);
            } else {
                toast.error("Failed to save experience.");
            }
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Server error while saving experience.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            experience: experienceList
        }));
    }, [experienceList]);

    return (
        <div>
            <div className='p-5 rounded-lg shadow-lg border-t-sky-500 border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add Your previous Job Experience</p>

                {experienceList.map((item, index) => (
                    <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input
                                type="date"
                                name="endDate"
                                value={item.endDate}
                                onChange={(e) => handleChange(index, e)}
                                disabled={item.currentlyWorking}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type="checkbox"
                                checked={item.currentlyWorking}
                                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                            />
                            <label className='text-xs'>Currently Working</label>
                        </div>
                        <div className='col-span-2'>
                            <RichTextEditor
                                index={index}
                                defaultValue={item.workSummary}
                                onRichTextEditorChange={(e) => handleRichTextEditor(e, "workSummary", index)}
                            />
                        </div>
                    </div>
                ))}

                <div className='flex justify-between items-center'>
                    <div className='flex gap-3'>
                        <Button onClick={AddNewExperience} variant="outline" className="border-purple-600 hover:text-purple-600">
                            + Add More Experience
                        </Button>
                        <Button onClick={RemoveExperience} variant="outline" className="border-rose-600 hover:text-rose-600">
                            - Remove
                        </Button>
                    </div>

                    <Button onClick={onSave} disabled={loading} className="bg-sky-600">
                        {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Experience;
