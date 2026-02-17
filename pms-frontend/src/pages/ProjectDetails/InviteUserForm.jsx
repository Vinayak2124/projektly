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
import { inviteToProject } from '../../Redux/Project/Action'
import { useParams } from 'react-router-dom'

const InviteUserForm = () => {
  const dispatch = useDispatch()
  const {projectId} = useParams()
     const form = useForm({
          defaultValues: {
              email: "",
          },
     })
    const onSubmit = (data) => {
      console.log("invite user form data", data)
      dispatch(inviteToProject({email:data.email,projectId:projectId}))
    }
    return (
     
        <div>
            <Form{...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                    
                                    <FormControl>
                                      <Input {...field} type="email" className="w-full border border-gray-700 py-5 px-5" placeholder="Enter user email" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                    />
                    
                    <DialogClose asChild>
                        <Button type="submit">Invite User</Button>
                    </DialogClose>

                    </form>
                </Form>
    </div>
  )
}

export default InviteUserForm