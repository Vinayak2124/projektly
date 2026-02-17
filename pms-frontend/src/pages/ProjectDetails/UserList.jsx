import React from 'react'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Redux/Store'
import { assignedUserToIssue } from '../../Redux/Issue/Action'

const UserList = ({issueDetails}) => {
    const { project } = useSelector(store => store);
    const dispatch = useDispatch();
    const handleAssignIssueToUser = (userId) => {
        dispatch(assignedUserToIssue({issueId:issueDetails.id,userId}))
    }
  return (
      <div className="space-y-2">
          <div className='border rounded-md'>
              <p className='py-2 px-3'> {issueDetails.assignee?.fullName || "Not assigned"}</p>
          </div>
          {project.projectDetails?.team.map((item, idx) => <div
              onClick={() => handleAssignIssueToUser(item.id) }
              key={idx} className='py-2 group hover:bg-slate-800 flex items-center cursor-pointer px-4 rounded-md space-x-4'>
              <Avatar>
                  <AvatarFallback>
                      {item.fullName[0]}
                  </AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                  <p className='text-sm font-medium leading-0.5'>{item.fullName}</p>
                  <p className='text-sm  text-muted-foreground'>@{item.email}</p>
              </div>
          </div>)}
    </div>
  )
}

export default UserList