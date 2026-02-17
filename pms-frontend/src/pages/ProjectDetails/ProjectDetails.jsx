import { ScrollArea } from "../../components/ui/scroll-area"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"
import InviteUserForm from "./InviteUserForm.jsx"
import IssueList from "./IssueList.jsx"
import ChatBox from "./ChatBox.jsx"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProjectById } from "../../Redux/Project/Action.js"
import { useParams } from "react-router-dom"
import { store } from "../../Redux/Store.js"
const ProjectDetails = () => {
    const dispatch = useDispatch();
    const  {projectId} = useParams();
    const {project} = useSelector(store=>store)
    const handleProjectInvitation = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        // console.log(projectId)
        dispatch(fetchProjectById(projectId))
        
    }, [projectId]
    )
    console.log("fetch project details",project.projectDetails)
  return (
      <div className="mt-5 px-10 ">
          <div className="lg:flex gap-5 justify-between pb-4">
              <ScrollArea className="h-screen lg:w[69%] pr-2">
                  <div className=" pb-10 w-full">
                      <h1 className="text-zinc-800 text-lg font-semibold pb-5">
                      {project.projectDetails?.name}
                      </h1>
                      <div className="space-y-5 pb-10">
                          <p className="w-full md:max-w-lg lg:max-w-xl text-gray-400 text-sm">
                          {project.projectDetails?.description}
                          </p>
                      </div>
                      <div className="flex">
                          <p className="w-36">Project Lead  :</p>
                          <p> {project.projectDetails?.owner?.fullName}
 </p>
                      </div>
                      <div className="flex">
                          <p className="w-36">Members :</p>
                          <div className="flex items-center gap-2">
                              {project.projectDetails?.team.map((item,idx) => <Avatar className="cursor-pointer" key={idx}>
                                  <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                              </Avatar>)}
                          </div>
<Dialog>
  <DialogTrigger asChild>
    <Button
      className="ml-2 cursor-pointer"
      variant="outline"
      size="sm"
    >
      <span>Invite</span>
      <PlusIcon className="w-3 h-3 ml-1" />
    </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite User to Project</DialogTitle>
    </DialogHeader>

    <InviteUserForm />

   
  </DialogContent>
</Dialog>

                      </div>
                      <div className="flex ">
                          <p>Category :</p>
                          <p className="ml-2 ">  {project.projectDetails?.category}
</p>
                      </div>
                      <div className="flex ">
                          <p>
                              Status :
                          </p>
                          <Badge className="bg-blue-500 text-white ml-2">In Progress</Badge>
                      </div>

                      <section>
                          <p className="py-5 border-b text-lg tracking-wider">Tasks</p>
                          <div className="lg:flex mg:flex gap-3 justify-between py-5">
                              <IssueList status="pending" title="Todo List" />
                                <IssueList status="In Progress" title="In Progress "/>
                              <IssueList status="Done" title="Done"/>

                          </div>
                      </section>
                  </div >
                  
              </ScrollArea>
              <div className="lg:w-[30%] rounded-md sticky rigth-5 top-10">
                  <ChatBox/>
              </div>
          </div>
    
          
    </div>
  )
}

export default ProjectDetails