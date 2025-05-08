import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Dummy from '../../../../Data/Dummy';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext.jsx';

function Skills({ enableNext }) {
    const [skillsList, setSkillsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // Fetch existing data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://ai-resume-builder-backend-yq3g.onrender.com/user-resume/${resumeId}`);
                if (res.status === 200) {
                    const data = res.data;
                    if (data.skills && data.skills.length > 0) {
                        setSkillsList(data.skills);
                        setResumeInfo(data);
                    } else {
                        toast.info("No skills found. Loaded dummy data.");
                        setSkillsList(Dummy.skills || [{ name: '', rating: 0 }]);
                    }
                }
            } catch (err) {
                console.error("Error fetching skills:", err);
                toast.error("Failed to load skills.");
                setSkillsList(Dummy.skills || [{ name: '', rating: 0 }]);
            }
        };

        fetchData();
    }, [resumeId]);

    // Sync with context
    useEffect(() => {
        setResumeInfo(prev => ({
            ...prev,
            skills: skillsList
        }));
    }, [skillsList]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
    };

    const RemoveSkills = () => {
        setSkillsList(prev => prev.slice(0, -1));
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const res = await axios.put(`https://ai-resume-builder-backend-yq3g.onrender.com/user-resume/${resumeId}`, {
                skills: skillsList.map(({ id, ...rest }) => rest)
            });

            if (res.status === 200) {
                toast.success("Skills saved successfully!");
                setResumeInfo(res.data.data);
                enableNext(true);
            } else {
                toast.error("Failed to save skills.");
            }
        } catch (err) {
            console.error("Save error:", err);
            toast.error("Server error while saving skills.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 rounded-lg shadow-lg border-t-sky-500 border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input
                                className="w-full"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={item.rating}
                            onChange={(v) => handleChange(index, 'rating', v)}
                        />
                    </div>
                ))}
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary">+ Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary">- Remove</Button>
                </div>
                <Button className="bg-sky-600" disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
