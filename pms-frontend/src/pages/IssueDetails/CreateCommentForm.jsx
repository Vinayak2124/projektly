import { useForm } from 'react-hook-form'
import {  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../components/ui/form"
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Avatar, AvatarFallback } from '../../components/ui/avatar'
import { useDispatch } from 'react-redux'
import { createComment } from '../../Redux/Comment/Action'
const CreateCommentForm = ({issueId, projectId}) => {
    const dispatch = useDispatch()
       const form = useForm({
            defaultValues: {
                content: "",
            },
       })
    const onSubmit = (data) => {
          dispatch(createComment({content:data.content,issueId}))
          console.log("Comment data", data)
      }
      return (
       
          <div>
              <Form{...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex gap-3">
                            <FormField
                                  control={form.control}
                                  name="content"
                                  render={({ field }) => (
                                    <FormItem className="flex gap-2">
                                          <div>
                                              <Avatar className="border-2">
                                                  <AvatarFallback>V</AvatarFallback>
                                              </Avatar>

                                        </div>
                                      <FormControl>
                                        <Input {...field} type="text" className="w-[20rem] border border-gray-700 py-3 px-5 " placeholder="add your comment " />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                      />
                      
                     
                          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white">Comment</Button>
                      
  
                      </form>
                  </Form>
      </div>
    )
}

export default CreateCommentForm