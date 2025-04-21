import React, { useEffect, useState } from 'react'
import PersonalDetail from './Forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './Forms/Summery'

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    const savedIndex = localStorage.getItem("activeFormIndex");
    return savedIndex ? parseInt(savedIndex) : 1;
  });

  const [enableNext, setEnableNext] = useState(false);

  // Update localStorage when activeFormIndex changes
  useEffect(() => {
    localStorage.setItem("activeFormIndex", activeFormIndex);
  }, [activeFormIndex]);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button
          size="sm"
          className="flex gap-2 bg-emerald-700"
        >
          <LayoutGrid /> Theme
        </Button>

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
      {/* Add more steps similarly */}
    </div>
  );
};

export default FormSection;
