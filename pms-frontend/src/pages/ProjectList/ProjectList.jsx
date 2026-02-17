import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "../../components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Input } from "../../components/ui/input";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/Store";
import { useEffect } from "react";
import { searchProjects } from "../../Redux/Project/Action";
import { fetchProjects } from "../../Redux/Project/Action";

export const tags = [
  "all",
  "react",
  "angular",
  "nextjs",
  "java",
  "springboot",
  "nodejs",
  "expressjs",
  "flask",
  "django",
  "mongodb",
  "mysql",
  "postgresql",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { project } = useSelector(store => store)
  const dispatch = useDispatch();

  const handleFilterCategory = (value) => {
    if (value == 'all') {
      dispatch(fetchProjects({}))
    }
    dispatch(fetchProjects({ category:value }))
    console.log(`Filter changed: Category = ${value}`);
  };
   const handleFilterTag = (value) => {
     if (value == 'all') {
      dispatch(fetchProjects({}))
     }
     dispatch(fetchProjects({ tag:value }))
    console.log(`Filter changed: Tag = ${value}`);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value))
    console.log(project.searchProjects)
  };
 useEffect(() => {
    dispatch(fetchProjects({}))
  },[])
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl px-3 sm:px-6 py-4">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center gap-2 mb-4">

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <MixerHorizontalIcon className="w-4 h-4" />
          </Button>

          {/* Search */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute top-3 left-3 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              name="search"
              placeholder="Search projects..."
              onChange={handleSearchChange}
              className="pl-8 h-10 rounded-xl"
            />
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* ================= FILTERS ================= */}
          <section
            className={`
              ${showFilters ? "block" : "hidden"}
              lg:block
              lg:w-[260px]
              shrink-0
            `}
          >
            <Card className="p-4 rounded-2xl">
              <CardContent className="p-0">
                <ScrollArea className="h-[60vh] lg:h-[70vh] pr-2">

                  {/* Category */}
                  <div className="mb-5">
                    <h2 className="text-sm font-medium mb-2">Category</h2>

                    <RadioGroup
                      defaultValue="all"
                      onValueChange={(value) => { handleFilterCategory(value) , setCategory(value)}
                      }
                      className="space-y-1"
                    >
                      {["all", "fullstack", "frontend", "backend"].map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-slate-100"
                          >
                            <RadioGroupItem value={item} id={item} />
                            <label
                              htmlFor={item}
                              className="text-sm capitalize cursor-pointer"
                            >
                              {item}
                            </label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>

                  {/* Tags */}
                  <div>
                    <h2 className="text-sm font-medium mb-2">Tags</h2>

                    <RadioGroup
                      defaultValue="all"
                      onValueChange={(value) =>
                        {handleFilterTag(value), setTag(value)}
                      }
                      className="space-y-1"
                    >
                      {tags.map((item) => (
                        <div
                          key={item}
                          className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-slate-100"
                        >
                          <RadioGroupItem value={item} id={`tag-${item}`} />
                          <label
                            htmlFor={`tag-${item}`}
                            className="text-sm cursor-pointer"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          {/* ================= PROJECT LIST ================= */}
          <section className="flex-1">
            <div className="flex flex-col gap-3">
              {keyword ? project.searchProjects?.map((item, idx) => (
                <div
                  key={idx}
                  className="transition-all duration-200 hover:scale-[1.01]"
                >
                  <ProjectCard item={item} />
                </div>
              )):project.projects?.map((item) => (
                <div
                  key={item.id}
                  className="transition-all duration-200 hover:scale-[1.01]"
                >
                  <ProjectCard item={item} />
                </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
