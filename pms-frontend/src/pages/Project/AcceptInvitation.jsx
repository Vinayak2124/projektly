import React from 'react'
import { Button } from '../../components/ui/button'
import { acceptInvitation } from '../../Redux/Project/Action';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AcceptInvitation = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token')
    const navigate = useNavigate()
    const handleAcceptInvitation = () => {
        dispatch(acceptInvitation({token,navigate}))
    }
  return (
      <div className='h-[85vh] flex flex-col justify-center items-center'>
          <h1 className='py-5 font-semibold text-xl'>you are invited to join the project</h1>
          <Button onClick ={handleAcceptInvitation} className="cursor-pointer">Accept Invitation</Button>
    </div>
  )
}

export default AcceptInvitation