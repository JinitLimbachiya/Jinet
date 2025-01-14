import { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { X, Send } from 'lucide-react'

const MessageInput = () => {

  const [ text, setText ] = useState("")
  const { sendMessage } = useChatStore()

  const handleSendMessage = async (e) => {    
    e.preventDefault()

    if(!text.trim() ) return

    await sendMessage({ message: text })
    setText("")
    
  }
  
  return (
    <div
    className='p-4 w-full'>

      <form
      onSubmit={handleSendMessage}
      className='flex items-center gap-2'>

        <div
        className='flex-1 flex gap-3'>

          <input
          type="text"
          placeholder='Type a message...'
          className='w-full input input-bordered rounded-lg input-sm sm:input-md'
          value={text}
          onChange={(e) => setText(e.target.value)}
          />

          <button
          type='submit'
          disabled={!text.trim()}
          className='btn btn-circle'>
            <Send size={25}/>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput