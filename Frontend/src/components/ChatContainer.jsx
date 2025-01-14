import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './Skeletons/MessageSkeleton'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {

  const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages } = useChatStore()
  const { authUser } = useAuthStore()

  const messageEndRef = useRef(null)

  useEffect(() => {
    if(!selectedUser?._id) return

    getMessages(selectedUser._id)
    subscribeToMessages()
    
    return () => unSubscribeFromMessages()
  }, [selectedUser._id, getMessages, subscribeToMessages, unSubscribeFromMessages])

  useEffect(() => {
    if(messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [messages])

  if(isMessageLoading)
    return (
      <div
      className='flex-1 flex flex-col overflow-y-scroll scrollbar-hidden'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
  )

  return (
    <div
    className='flex-1 flex flex-col overflow-y-scroll scrollbar-hidden'> 
      <ChatHeader/>

      <div
      className='flex-1 overflow-y-scroll scrollbar-hidden p-6 space-y-4'>

      {messages?.length > 0 ? (
        messages.map((message) => (

          <div
          key={message._id}
          className={`chat ${ message.sender === authUser._id ? 'chat-end' : 'chat-start' }`}
          ref={messageEndRef}>

            <div
            className="chat-image avatar">

              <div
              className="size-10 rounded-full border">
                <img
                src={ message.sender === authUser._id
                    ? authUser.profilePicture || '/DefaultAvatar.png'
                    : selectedUser?.profilePicture || '/DefaultAvatar.png' }
                alt="Profile Picture"
                />
              </div>

            </div>

            <div
            className="chat-header mb-1">

              <time
              className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>

            </div>

            <div
            className='chat-bubble flex justify-center items-center'>
              { message.message && <p>{message.message}</p> }
            </div>

          </div>
        ))) :
        (
          <div
          className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </div>
        )}       

      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer