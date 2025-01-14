import { Users, UserSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import SidebarSkeleton from './Skeletons/SidebarSkeleton'

const Sidebar = () => {

  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()  

  const { onlineUsers, authUser } = useAuthStore()

  const [ showOnlineOnly, setShowOnlineOnly ] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly
                        ? users.filter((user) => onlineUsers.includes(user._id) && user._id !== authUser._id )
                        : users.filter((user) => user._id !== authUser._id)

  if(isUsersLoading) return <SidebarSkeleton />

  return (
    <aside
    className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 overflow-y-scroll scrollbar-hidden'>
      
      {/* HEADER */}
      <div
      className='border-b border-base-300 w-full p-5'>

        <div
        className='flex items-center gap-2'>
          <Users className='size-6' />
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>

        {/* SHOW ONLINE USERS FEATURE */}
        <div
        className='mt-5 hidden lg:flex items-center gap-2'>

          <label
          className='cursor-pointer flex items-center gap-2'>
            <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className='checkbox checkbox-xs' 
            />

            <span className='text-xs'>Show online only</span>
          </label>
          
        </div>

      </div>  


      {/* USERS CONTAINER */}
      <div
      className='overflow-y-auto scrollbar-hidden w-full py-3'>
        { filteredUsers.map((user) => ( 

          // USER
          <button
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : "" }`}
          >

            <div
            className='relative mx-auto lg:mx-0'>
              <img
              src={ user.profilePicture || "/DefaultAvatar.png" }
              alt={ user.username }
              className='size-12 object-cover rounded-full'
              />

              { onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
              ) }
            </div>

            <div
            className='hidden lg:block text-left min-w-0'>
              <div
              className='font-medium truncate'>
                { user.username }
              </div>

              <div
              className='text-sm text-zinc-400'>
                { onlineUsers.includes(user._id) ? "Online" : "Offline" }
              </div>
            </div>

          </button>
        )) }

        {/* WHEN ALL USERS ARE NOT ONLINE */}
        { filteredUsers.length ==  0 && (
          <div
          className='text-center text-zinc-500 py-4'>
            No online users
          </div>
        )}

      </div>

    </aside>
  )
}

export default Sidebar