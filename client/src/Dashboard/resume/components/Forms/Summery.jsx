// client\src\Dashboard\resume\components\Forms\Summery.jsx

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Dummy from "../../../../Data/Dummy.jsx"; // fallback data
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../../services/AIMODAL.js';


const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

const Summary = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams(); // assuming route is /resume/:id
    const [summary, setSummary] = useState(resumeInfo?.summary || Dummy.summary); // fallback to dummy summary
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();


    // Fetch initial data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user-resume/${resumeId}`);
                if (response.status === 200) {
                    setResumeInfo(response.data); // Update context with fetched data
                    setSummary(response.data.summary || Dummy.summary); // Set summary from fetched data
                }
            } catch (err) {
                console.error("Error fetching resume data:", err);
            }
        };

        fetchData();
    }, [resumeId, setResumeInfo]);

    // Update context when summary changes
    useEffect(() => {
        if (summary !== resumeInfo?.summary) {
            setResumeInfo({
                ...resumeInfo,
                summary: summary
            });
        }
    }, [summary, resumeInfo, setResumeInfo]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        // console.log(PROMPT);
        const result = await AIChatSession.sendMessage(PROMPT);
        // console.log(JSON.parse(result.response.text()))

        setAiGeneratedSummaryList(JSON.parse(result.response.text()))
        setLoading(false);
    }

    // Function to save the summary data
    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8000/user-resume/${resumeId}`, {
                summary
            });

            if (response.status === 200) {
                toast("Summary saved successfully!");
                setResumeInfo(prev => ({
                    ...prev,
                    summary: response.data.summary
                }));
                enableNext(true);
            } else {
                toast.error("Failed to save summary.");
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error("Server error while saving summary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-5 rounded-lg shadow-lg border-t-sky-500 border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>
                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button
                            onClick={() => GenerateSummaryFromAI()}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-purple-600 hover:text-purple-600 flex gap-2"
                        >
                            <Brain className='h-4 w-4' /> Generate by AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        placeholder="Brief summary about your experience or career goal..."
                        value={summary}
                        onChange={(e) => {
                            enableNext(false);
                            setSummary(e.target.value)
                        }}
                        required
                    />
                    <div className="mt-2 flex justify-end">
                        <Button className="bg-sky-700" type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Ai Generated Summary List */}
            {
                aiGeneratedSummaryList &&
                <div>
                    <h1 className='font-bold text-lg'>Suggestion</h1>
                    {
                        aiGeneratedSummaryList.map((item, index) => (
                            <div>
                                <h2 className='font-bold my-1'>Level: {item?.experience_level}</h2>
                                <p>{item?.summary}</p>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Summary;
