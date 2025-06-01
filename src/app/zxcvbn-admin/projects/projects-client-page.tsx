"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectsTable from "@/components/admin/projects/project-table";
import ProjectsTableSkeleton from "@/components/admin/projects/project-tab-skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";
import { projectSchema } from "@/schemas/projectSchema";
import { ErrorMessage } from "@hookform/error-message";
import ProjectTagInput from "@/components/admin/projects/project-tag-input";
import axios from "axios";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const categories = [
  "All Projects",
  "Graphics Design",
  "Motion Graphics",
  "Logo Designs",
  "User Interface",
];
const statuses = ["in-progress", "completed", "conecpt"];
export default function ProjectsClientPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      longDescription: "",
      category: "",
      tags: [],
      featured: false,
      status: "",
      year: new Date().getFullYear(),
      client: "",
      duration: "",
      link: "",
    },
  });
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const { data, error, isLoading, mutate } = useSWR("/api/project", fetcher);
  const onSubmit = async (formData: z.infer<typeof projectSchema>) => {
    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof typeof formData;
        const value = formData[typedKey];

        if (value !== undefined && value !== "") {
          if (key === "tags") {
            submitData.append(key, JSON.stringify(value));
          } else if (key === "featured") {
            submitData.append(key, value.toString());
          } else if (key === "year") {
            submitData.append(key, value.toString());
          } else {
            submitData.append(key, value.toString());
          }
        }
      });

      if (fileInputRef.current?.files?.[0]) {
        submitData.append("image", fileInputRef.current.files[0]);
      }

      const response = await axios.post("/api/project", submitData);

      if (response.status === 201) {
        toast.success("Project added successfully!");
        setDialogOpen(false);
        mutate();
      }
    } catch (error: any) {
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle loading and error states
  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-10">
          <p className="text-red-500">
            Failed to load projects: {error.message}
          </p>
          <Button onClick={() => mutate()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const projects = data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {isLoading ? (
        <ProjectsTableSkeleton />
      ) : (
        <ProjectsTable projects={projects} />
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>
                Create a new project for your portfolio. Fill out the details
                below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <div className="col-span-3">
                  <Input
                    id="title"
                    {...register("title")}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="title" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Overview
                </Label>
                <div className="col-span-3">
                  <Input
                    id="description"
                    {...register("description")}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="description" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="longDescription" className="text-right">
                  Description
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="longDescription"
                    {...register("longDescription")}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="longDescription" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                    value={watch("category")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((cat) => cat !== "All Projects")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage errors={errors} name="category" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Status
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value) => setValue("status", value)}
                    value={watch("status")}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage errors={errors} name="status" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="image" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <div className="col-span-3">
                  <Input
                    id="client"
                    {...register("client")}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="client" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <div className="col-span-3">
                  <Input
                    id="year"
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    className="col-span-3"
                  />
                  <ErrorMessage errors={errors} name="year" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Tags</Label>
                <div className="col-span-3">
                  <ProjectTagInput
                    tags={watch("tags")}
                    onChange={(tags) => setValue("tags", tags)}
                  />
                  <ErrorMessage errors={errors} name="tags" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="featured" className="text-right">
                  Featured
                </Label>
                <div className="col-span-3 flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    {...register("featured")}
                    className="mr-2 h-4 w-4"
                  />
                  <Label htmlFor="featured" className="text-sm font-normal">
                    Mark as featured project
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
