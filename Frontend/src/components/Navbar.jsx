import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare,  User, LogOut } from 'lucide-react'

const Navbar = () => {

  const { logOut, authUser } = useAuthStore()

  return (
    <header
    className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>

      <div
      className='container mx-auto px-4 h-16'>
        <div
        className='flex items-center justify-between h-full'>

          <div
          className='flex items-center gap-8'>
            <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div
              className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                <img
                src='/JinetLogo.png'
                alt='Logo'
                className="w-7 h-7 text-primary"  />
              </div>

              <h1
              className='text-lg font-bold'>
                Jinet
              </h1>
            </Link>
          </div>
          
          <div
          className='flex items-center gap-2'>
            {authUser && (
              <>
                <Link
                to="/profile"
                className='btn btn-sm gap-2' >
                  <User className='size-5' />
                  <span className='hidden sm:inline'>Profile</span>
                </Link>

                <button
                onClick={logOut}
                className='flex gap-2 items-center'>
                  <LogOut className='size-5' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>

    </header>
  )
}

export default Navbar