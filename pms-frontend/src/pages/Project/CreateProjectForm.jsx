import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { tags as availableTags } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { createProject } from "../../Redux/Project/Action";

const CreateProjectForm = () => {
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "fullstack",
      tags: [],
    },
  });

  const onSubmit = (data) => {
    dispatch(createProject(data))
    console.log("form data", data);
  };

  const addTag = (tag, field) => {
    if (!field.value.includes(tag)) {
      form.setValue("tags", [...field.value, tag]);
    }
  };

  const removeTag = (tag, field) => {
    form.setValue(
      "tags",
      field.value.filter((t) => t !== tag)
    );
  };

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Project Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter project name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Describe your project..."
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Select */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">FullStack</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags Select */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>

                <FormControl>
                  <Select onValueChange={(value) => addTag(value, field)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add tags" />
                    </SelectTrigger>
                    <SelectContent >
                      {availableTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {field.value.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <Cross1Icon
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag, field)}
                      />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </DialogClose>

        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
