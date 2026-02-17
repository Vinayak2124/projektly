import { useForm } from 'react-hook-form'
import {  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../components/ui/form"
import { DialogClose } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createIssue } from '../../Redux/Issue/Action'
const CreateIssueForm = ({status}) => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

        const form = useForm({
              defaultValues: {
                issueName: "",
            description: "",
                  
              },
         })
  const onSubmit = (data) => {
   
          dispatch(createIssue({title:data.issueName,description:data.description,projectId:projectId,status:status}))
            console.log("create issue form data", data)
        }
  return (
      <div>
          <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <FormField
                                control={form.control}
                                name="issueName"
                                render={({ field }) => (
                                  <FormItem>
                    
                                    <FormControl>
                                      <Input {...field} type="text" className="w-full border border-gray-700 py-5 px-5" placeholder="Enter issue name" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                  />
                       <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                    
                                    <FormControl>
                                      <Input {...field} type="text" className="w-full border border-gray-700 py-5 px-5" placeholder="Enter issue description" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                    />
                    
                    <DialogClose asChild>
                        <Button type="submit">Create Issue</Button>
                    </DialogClose>

                    </form>
                </Form>
    </div>
  )
}

export default CreateIssueForm