// client\src\auth\sign-in\SignInPage.jsx

import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const SignInPage = () => {
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <SignIn />
        </div>
    )
}

export default SignInPage