import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { set } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChatByProject, fetchChatMessages, sendMessage } from '../../Redux/Chat/Action'
import { store } from '../../Redux/Store'
import { useParams } from 'react-router-dom'

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {auth,chat} = useSelector((store)=>store)
    const { projectId } = useParams();
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }   
    const handleSendMessage = () => {
        if (message.trim() !== "") {
            dispatch(sendMessage({
                senderId: auth.user?.id,
                projectId: projectId,
                content:message
            }
            ))
          
            setMessage("");
        }
    }
    useEffect(() => {
        dispatch(fetchChatByProject(projectId))
      
    }, [])
    
     
  useEffect(() => {
    if (chat.chat?.id) {
        dispatch(fetchChatMessages(chat.chat.id));
       
      }
       
  }, [chat.chat?.id, dispatch]);
    
  return (
      <div className='sticky'>
          <div className='border rounded-lg'>
              <h1 className='border-b p-5'>Chat Box</h1>
              <ScrollArea className="h-[32rem] w-full flex gap-3 flex-col rounded-lg p-5">
                  {chat?.messages?.map((item, idx) => (
             item.sender.id!==auth.user?.id?
                      <div key={idx} className='flex gap-2 mb-2 justify-start'> 
                      <Avatar>
                          <AvatarFallback>V</AvatarFallback>
                          
                      </Avatar>
                      <div className='space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl'>
                              <p>{item.sender.fullName} :</p>
                              <p className='text-gray-400'>{item.content}</p>
                            </div>
                      
                          </div> :
                          <div key={idx} className='  flex gap-2 mb-2 justify-end'> 
                      
                      <div className='space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl'>
                              <p>{item.sender?.fullName} :</p>
                                  <p className='text-gray-400'>{ item.content}</p>
                              </div>
                              <Avatar>
                          <AvatarFallback>V</AvatarFallback>
                          
                      </Avatar>
                      
                </div>
         
                  
                
           ) )}
              </ScrollArea>

              <div className='relative p-0 '>
                  <Input value={message} onChange={handleMessageChange} placeholder="Type a message..." className="w-full p-7 
                  focus:outline-none focus:ring-0 rounded-md border-b-0 border-x-0 "/>
                  <Button onClick={handleSendMessage} className="absolute cursor-pointer right-2 top-3 rounded-full " variant="ghost" size="icon"> 
                  <PaperPlaneIcon />
                  </Button>
                    
              </div>

          </div>
          
    </div>
  )
}

    export default ChatBox;