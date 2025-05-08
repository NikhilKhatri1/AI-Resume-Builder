// client\src\components\custom\Header.jsx

import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
const Header = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
      <img className='cursor-pointer' onClick={() => navigate("/")} src="/logo.svg" alt="logo-ResumiAi" height={100} width={100} />
      {
        isSignedIn
          ?
          <div className='flex items-center gap-5'>
            <Link to={"/dashboard"}>
              <Button className="cursor-pointer" variant={"outline"}>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
          :
          <Link to={'/auth/sign-in'}>
            <Button>Get Started</Button>
          </Link>
      }

    </div>
  )
}

export default Header