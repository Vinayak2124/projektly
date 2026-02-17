import { TrashIcon } from "@radix-ui/react-icons"
import { Avatar,AvatarFallback } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { useDispatch } from "react-redux"
import { deleteComment } from "../../Redux/Comment/Action"

const CommentCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteComment(item.id));
    }
  return (
      <div className="flex justify-between">
          <div className="flex items-center gap-4">
              <Avatar>
                  <AvatarFallback>{ item.user?.fullName[0]}</AvatarFallback>
              </Avatar>

              <div className="sapve-y-1">
                  <p className="font-semibold">{item.user?.fullName }</p>
                  <p className="text-sm text-gray-500">{ item.content}</p>
              </div>
          </div>
          <Button onClick={handleDelete} className="rounded-full cursor-pointer" variant="ghost" size="icon">
              <TrashIcon/>
          </Button>
    </div>
  )
}

export default CommentCard