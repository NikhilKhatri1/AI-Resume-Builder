import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Dummy from "../../../../Data/Dummy.jsx"; // fallback data

const Summary = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { id } = useParams(); // assuming route is /resume/:id
    const [summary, setSummary] = useState('');

    const [loading, setLoading] = useState(false);

    // Fallback to dummy summary if not available
    useEffect(() => {
        const dummySummary = Dummy?.summary || Dummy?.summery || "A passionate developer eager to grow.";
        const summaryValue = resumeInfo?.summary || dummySummary;
        setSummary(summaryValue);

        setResumeInfo(prev => ({
            ...prev,
            summary: summaryValue
        }));
    }, []);

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/personalDetail/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ summary }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Summary saved successfully!");
                setResumeInfo(prev => ({
                    ...prev,
                    summary: data.summary
                }));
            } else {
                alert("Failed to save summary.");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error while saving summary.");
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
                        <Button type="button" variant="outline" size="sm" className="border-purple-600 hover:text-purple-600">
                            Generate by AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        placeholder="Brief summary about your experience or career goal..."
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                        <Button className="bg-sky-700" type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Summary;
