// client\src\Dashboard\resume\components\FormSection.jsx

import React, { useEffect, useState } from 'react'
import PersonalDetail from './Forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './Forms/Summery'
import Experience from './Forms/Experience'
import Education from './Forms/Education'
import Skills from './Forms/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ViewResume from '@/myResume/[resumeId]/view'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeFormIndex");
    return savedIndex ? parseInt(savedIndex) : 1;
  });
  const { resumeId } = useParams();
  const [enableNext, setEnableNext] = useState(false);


  // Update localStorage when activeFormIndex changes
  // useEffect(() => {
  //   localStorage.setItem("activeFormIndex", activeFormIndex);
  // }, [activeFormIndex]);

  // console.log(activeFormIndex)
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Link to={"/dashboard"}><Button variant="outline" size="sm" className="border-purple-700 text-purple-700"><Home /></Button></Link>
          <Button size="sm" className="flex gap-2 bg-emerald-700">
            <LayoutGrid /> Theme
          </Button>

        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-zinc-900 hover:text-white"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2 bg-sky-600"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Render forms conditionally */}
      {activeFormIndex === 1 && <PersonalDetail enableNext={(v) => setEnableNext(v)} />}
      {activeFormIndex === 2 && <Summary enableNext={(v) => setEnableNext(v)} />}
      {activeFormIndex === 3 && <Experience enableNext={(v) => setEnableNext(v)} />}
      {activeFormIndex === 4 && <Education enableNext={(v) => setEnableNext(v)} />}
      {activeFormIndex === 5 && <Skills enableNext={(v) => setEnableNext(v)} />}
      {activeFormIndex === 6 && <Navigate to={'/my-resume/' + resumeId + '/view'} />}
      {/* Add more steps similarly */}
    </div>
  );
};

export default FormSection;
