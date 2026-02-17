import { useParams } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import CreateCommentForm from "./CreateCommentForm.jsx";
import CommentCard from "./CommentCard.jsx";
import { Select, SelectContent, SelectTrigger, SelectValue,SelectItem } from "../../components/ui/select.jsx";
import { Avatar, AvatarFallback } from "../../components/ui/avatar.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  fetchIssueById, updateIssueStatus } from "../../Redux/Issue/Action.js";
import { store } from "../../Redux/Store.js";
import { fetchProjectById } from "../../Redux/Project/Action.js";
import { fetchComment } from "../../Redux/Comment/Action.js";
const IssueDetails = () => {
    const dispatch = useDispatch();
    const { projectId, issueId } = useParams();
    const { issue } = useSelector(store => store)
    const { project } = useSelector(store => store)
    const {comment} = useSelector(store=>store)
    const handleUpdateIssueStatus = (status) => { 
        dispatch(updateIssueStatus(issueId, status))
       
        console.log("Selected status:", status);       
    }
    useEffect(() => {
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComment(issueId))
        dispatch(fetchProjectById(projectId))       
    },[issueId,dispatch,projectId])
  return (
      <div className="px-20 py-8 text-gray-400 ">
          <div className="flex justify-between p-10 rounded-lg border-2">
              <ScrollArea className="h-[80vh] w-[60%]">
                  <div>
                      <h1 className="text-xl font-semibold text-zinc-800">{issue.issueDetails?.title}</h1>

                      <div className="py-5"> 
                          <h2 className="text-gray-600 font-semibold">Description</h2>
                          <p className="text-gray-400 text-sm mt-3">{ issue.issueDetails?.description}</p>
                      </div>

                      <div className="mt-5 ">
                          <h1 className="pb-3">Activity</h1>
                          <Tabs defaultValue="comments" className="w-400px">
                              <TabsList className="mb-5">
                                  <TabsTrigger value="all">All</TabsTrigger>
                                  <TabsTrigger value="comments">Comments</TabsTrigger>
                                  <TabsTrigger value="history">History</TabsTrigger>
                              </TabsList>
                              <TabsContent value="all">All make changes to your account here</TabsContent>
                              <TabsContent value="comments">
                                  <CreateCommentForm issueId={issueId} projectId={projectId} />
                                  <div className="mt-8 space-y-6">
                                      {comment.comments?.map((item, idx) => <CommentCard key={idx} item={item} />  )}
                                  </div>
                              </TabsContent>
                              <TabsContent value="history">History Section</TabsContent>
                              
                            </Tabs>
                      </div>
                  </div>
              </ScrollArea>
              <div className="w-full lg:w-[30%] space-y-2">
                  <Select onValueChange={handleUpdateIssueStatus}>
                      <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="To Do" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="pending">To Do</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                      </SelectContent>
                  </Select>

                  <div className="border rounded-lg">
                      <p>Details</p>
                      <div className="p-5">
                          <div className="space-y-7">
                              <div className="flex gap-10 items-center">
                                  
                                  <p className="w-24">Assignees :</p>

                                  {issue.issueDetails?.assignee?.fullName ?  <div className="flex items-center gap-2">
                                      <Avatar>
                                          <AvatarFallback>{ issue.issueDetails?.assignee?.fullName[0]}</AvatarFallback>

                                      </Avatar>
                                      <p>{ issue.issueDetails?.assignee?.fullName}</p>
                                      </div>: <p>Not assigned</p>}
                                 
                              </div>
                              <div className="flex gap-10 items-center">
                                  
                                  <p className="w-24">Labels :</p>
                                      
                                      <p>None </p>
                              </div>
                              <div className="flex gap-10 items-center">
                                  
                                  <p className="w-24">Status :</p>
                                  <Badge>{ issue.issueDetails?.status}</Badge>
                                     
                              </div>

                              <div className="flex gap-10 items-center">
                                  
                                  <p className="w-24">Release :</p>
                                  
                                      <p>11-feb-2026</p>
                                      </div>
                          </div>
                          <div className="flex gap-10 items-center">
                                  
                                  <p className="w-24">Reporter :</p>
                                  <div className="flex items-center gap-2">
                                      <Avatar>
                                          <AvatarFallback>{project.projectDetails?.owner?.fullName[0]}</AvatarFallback>

                                      </Avatar>
                                      <p>{project.projectDetails?.owner?.fullName} </p>
                                      </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              </div>
          </div>  
   
  )
}

export default IssueDetails