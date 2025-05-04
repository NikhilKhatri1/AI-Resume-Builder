// client\src\Dashboard\resume\components\RichTextEditor.jsx
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/Context/ResumeInfoContext';
import { Bold, Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { AIChatSession } from '../../../../services/AIMODAL';
import { toast } from 'sonner';

const PROMPT = 'position titile: {positionTitle} , Depends on position title give me 2-3 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    const [loading, setLoading] = useState(false)

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);



    const generateSummaryFromAI = async () => {
        setLoading(true)
        if (!resumeInfo.experience[index].title) {
            toast('please Add Position Title');
            return;
        }
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title)
        const result = await AIChatSession.sendMessage(prompt);
        // console.log(result.response.text());
        const resp = result.response.text();
        const cleanHTML = resp.replace(/[{}\[\]\\]/g, '');
        setValue(cleanHTML);
        onRichTextEditorChange({ target: { value: cleanHTML } });
        setLoading(false)
    }

    return (
        <div>
            <div className='flex justify-between items-center my-2'>
                <label>Summary</label>
                <Button
                    onClick={generateSummaryFromAI}
                    variant="outline"
                    size="sm"
                    className="border-purple-600 hover:text-purple-600 flex gap-2"
                >{
                        loading
                            ? <LoaderCircle className='animate-spin' />
                            : <><Brain className='h-4 w-4' />Generate from AI</>
                    }</Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor