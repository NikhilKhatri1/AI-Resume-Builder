// client\src\Dashboard\resume\components\Preview\SummaryPreview.jsx

import React from 'react';
import dummyData from "../../../../Data/Dummy.jsx";

const SummaryPreview = ({ resumeInfo }) => {
    const data = resumeInfo || dummyData;
    return (
        <p className='text-xs'>
            {data.summary}
        </p>
    );
};

export default SummaryPreview;
