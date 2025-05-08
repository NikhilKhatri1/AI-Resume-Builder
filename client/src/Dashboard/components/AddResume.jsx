// client\src\Dashboard\components\AddResume.jsx
import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios'; // You'll use axios to make API requests
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [resumeTitle, setResumeTitle] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onCreate = async () => {
        setLoading(true)
        const uuid = uuidv4();
        const data = {
            data: {
                title: resumeTitle,
                resumeId: uuid,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            },
        };

        try {
            // Send the POST request to the backend to create the resume
            const response = await axios.post('https://ai-resume-builder-backend-yq3g.onrender.com/api/resumes', data);
            setLoading(false);
            console.log('Resume created successfully:', response.data);
            setOpenDialog(false); // Close the dialog after successful creation
            navigate(`/dashboard/resume/${uuid}/edit`);
        } catch (error) {
            console.error('Error creating resume:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[310px] hover:scale-105 transistion-all hover:shadow-md cursor-pointer border-dashed' onClick={() => setOpenDialog(true)}>
                <PlusSquare className='w-15 h-15' />
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            <p>Add a title for your Resume</p>
                            <Input
                                className="my-2"
                                placeholder="Ex. Full Stack Resume"
                                onChange={(e) => setResumeTitle(e.target.value)}
                            />
                        </DialogDescription>
                        <div className='flex justify-end gap-5'>
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button
                                disabled={!resumeTitle || loading}
                                onClick={() => onCreate()}
                            >
                                {
                                    loading ? <Loader2 className='animate-spin' /> : "Create"
                                }

                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddResume;
