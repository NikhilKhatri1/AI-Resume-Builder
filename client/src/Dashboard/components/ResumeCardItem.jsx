import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { LoaderCircle, MoreVertical } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const ResumeCardItem = ({ resume, onDeleteSuccess }) => {
    const navigate = useNavigate()
    const [openAlert, setOpenAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const onDelete = async () => {
        setLoading(true)
        try {
            const response = await axios.delete(`http://localhost:8000/api/resumes/${resume.resumeId}`)
            if (response.status === 200) {
                toast.success("Resume deleted successfully")
                onDeleteSuccess(resume.resumeId)  // Notify parent to remove resume from list
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete resume")
        } finally {
            setLoading(false)
            setOpenAlert(false)
        }
    }

    return (
        <div>
            <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
                <div className='p-14 bg-gradient-to-b from-pink-300 via-purple-200 to-blue-300 h-[310px] rounded-t-lg border-t-4 flex justify-center items-center border border-purple-400 rounded-lg hover:scale-102 transition-all hover:shadow-sm shadow-primary'>
                    <img src="/cv.png" width={100} height={100} />
                </div>
            </Link>

            <div className='flex justify-between p-3 border text-black bg-purple-500 rounded-b-xl'>
                <h2 className='text-center my-1 text-sm'>{resume.title}</h2>
                <div className='text-lg'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVertical className='h-4 w-4 cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white px-4 py-2 rounded-lg cursor-pointer'>
                            <DropdownMenuItem
                                onClick={() => navigate(`/dashboard/resume/${resume.resumeId}/edit`)}
                                className='mt-1 hover:border-1 rounded-lg px-2 py-1'
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate(`/my-resume/${resume.resumeId}/view`)}
                                className='mt-1 hover:border-1 rounded-lg px-2 py-1'
                            >
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate(`/my-resume/${resume.resumeId}/view`)}
                                className='mt-1 hover:border-1 rounded-lg px-2 py-1'
                            >
                                Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setOpenAlert(true)}
                                className='mt-1 hover:border-1 rounded-lg px-2 py-1 text-red-600'
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <AlertDialog open={openAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this resume.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={onDelete}>
                                    {loading ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Delete'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default ResumeCardItem