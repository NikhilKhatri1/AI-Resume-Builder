import React from 'react';
import dummyData from '@/Data/Dummy';

const SummaryPreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;
    return (
        <p className='text-xs'>
            {data.summary}
        </p>
    );
};

export default SummaryPreview;
