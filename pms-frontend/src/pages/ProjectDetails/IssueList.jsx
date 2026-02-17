import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import IssueCard from "./IssueCard"
import CreateIssueForm from "./CreateIssueForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchIssues } from "../../Redux/Issue/Action"
import { useParams } from "react-router-dom"
import { store } from "../../Redux/Store"

const IssueList = ({ status, title }) => {

    const dispatch = useDispatch();
    const { projectId } = useParams();
    const {issue} = useSelector(store=>store)
    useEffect(() => {
        dispatch(fetchIssues(projectId));
    },[projectId])
    return (
      
      <div>
          <Dialog>
              <Card className="w-full md:w-[300px] lg:w-[310px]">
                  <CardHeader>
                      <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                      <div className="space-y-2">
                            {issue?.issues?.filter((issue)=>issue.status == status).map((item, idx) => <IssueCard key={idx} item={item} projectId={projectId} />)
}                      </div>
                  </CardContent>
                  <CardFooter>
                      <DialogTrigger>
                          <Button variant="outline" className="w-full flex items-center gap-2 cursor-pointer">
                              <PlusIcon/>
                              Create Issue</Button>
                      </DialogTrigger>
                  </CardFooter>

              </Card>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Create New Issue</DialogTitle>
                  </DialogHeader>
                    <CreateIssueForm status={status} />
              </DialogContent>
          </Dialog>
          
    </div>
  )
}

export default IssueList