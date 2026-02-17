import React, { useEffect } from 'react'
import { Card } from '../../components/ui/card'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Button } from '../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import { Badge } from '../../components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteProjectById } from '../../Redux/Project/Action'

const ProjectCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteProjectById({projectId:item?.id}))
  }

 
  return (
    <Card
      className="
        p-5
        rounded-2xl
        shadow-sm
        border
        bg-background
        transition-all
        duration-300
        hover:shadow-md
        hover:-translate-y-0.5
      "
    >
      <div className="flex flex-col gap-4">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-start">

          <div className="space-y-1">
            <div className="flex items-center gap-3">

              <h1 onClick={() => navigate(`/project/${item.id}`)} className="text-base font-semibold cursor-pointer">
                {item?.name}
              </h1>

              <DotFilledIcon className="text-muted-foreground w-3 h-3" />

              <p className="text-sm text-muted-foreground capitalize">
               {item?.category}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {item?.description}
            </p>
          </div>

          {/* ================= MENU ================= */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="
                  rounded-full
                  transition
                  hover:bg-muted
                "
              >
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Update</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ================= TECH STACK ================= */}
        <div className="flex flex-wrap gap-2">
          {item?.tags?.map((tag, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="rounded-md px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>

      </div>
    </Card>
  )
}

export default ProjectCard
