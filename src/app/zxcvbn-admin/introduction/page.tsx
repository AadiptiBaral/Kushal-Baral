"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";
import axios, {AxiosError} from "axios";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  introductionSchema,
  introductionUpdateSchema,
} from "@/schemas/introductionSchema";
interface IntroductionData {
  id?: string;
  introduction: string;
  description: string;
  descriptionTitle: string;
  numberOfProjects: number;
  numberOfClients: number;
  clientSatisfaction: number;
  yearsOfExperience: number;
  email: string;
  phone: string;
  location: string;
  resume?: string;
  avatar?: string;
}

type IntroductionFormData = z.infer<typeof introductionSchema>;
type IntroductionUpdateFormData = z.infer<typeof introductionUpdateSchema>;
export default function IntroductionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
 const fetcher = async (url: string): Promise<IntroductionData | null> => {
  try {
    const response = await axios.get<IntroductionData>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null; // Return null for new users (404 is expected)
    }
    throw error;
  }
};

// 3. Update SWR hook with proper typing
const { data, error, isLoading, mutate } = useSWR<IntroductionData | null, AxiosError>(
  "/api/introduction", 
  fetcher
);
  const isUpdating = !!data; // Check if data exists to determine if we are updating
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm<IntroductionFormData | IntroductionUpdateFormData>({
  resolver: zodResolver(
    isUpdating ? introductionUpdateSchema : introductionSchema
  ),
  defaultValues: {
    introduction: "",
    description: "",
    descriptionTitle: "",
    numberOfProjects: 0,
    numberOfClients: 0,
    clientSatisfaction: 0,
    yearsOfExperience: 0,
    email: "",
    phone: "",
    location: "",
  },
});

  // Populate form with data when available
  useEffect(() => {
    if (data) {
      // Set form values with the fetched data
      reset({
        introduction: data.introduction || "",
        description: data.description || "",
        descriptionTitle: data.descriptionTitle || "",
        numberOfProjects: data.numberOfProjects || 0,
        numberOfClients: data.numberOfClients || 0,
        clientSatisfaction: data.clientSatisfaction || 0,
        yearsOfExperience: data.yearsOfExperience || 0,
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        resume: data.resume || "",
        avatar: data.avatar || "",
      });
    }
  }, [data, reset]);

  // Use a more flexible type that matches what the form actually produces
const onSubmit = async (formData: IntroductionFormData | IntroductionUpdateFormData) => {
  setIsSubmitting(true);

  try {
    // Validate required files for new profile creation
    if (!isUpdating) {
      if (!avatarRef.current?.files?.[0]) {
        toast.error("Avatar is required for new profiles");
        return;
      }
      if (!resumeRef.current?.files?.[0]) {
        toast.error("Resume is required for new profiles");
        return;
      }
    }

    const submitData = new FormData();

    // Add all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        submitData.append(key, value.toString());
      }
    });

    // Add files from refs
    if (avatarRef.current?.files?.[0]) {
      submitData.append("avatar", avatarRef.current.files[0]);
    }

    if (resumeRef.current?.files?.[0]) {
      submitData.append("resume", resumeRef.current.files[0]);
    }

    let response;
    if (isUpdating) {
      response = await axios.patch<IntroductionData>("/api/introduction", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Introduction updated successfully!");
        mutate(response.data);
      }
    } else {
      response = await axios.post<IntroductionData>("/api/introduction", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Introduction created successfully!");
        mutate(response.data);
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as { message?: string; error?: string } | undefined;
      if (error.response) {
        toast.error(
          `Error: ${errorData?.message || errorData?.error || "An error occurred"}`
        );
      } else {
        toast.error(`Error: ${error.message || "An error occurred. Please try again later."}`);
      }
    } else {
      toast.error(`Error: ${(error as Error).message || "An unexpected error occurred"}`);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading introduction data. Please try again.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
        <p className="text-muted-foreground">
          Manage your personal introduction and information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Your main introduction and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="introduction">Introduction</Label>
                  <Input
                    id="introduction"
                    placeholder="Hi, I'm..."
                    className={errors.introduction ? "border-red-500" : ""}
                    {...register("introduction")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="introduction"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionTitle">Description Title</Label>
                  <Input
                    id="descriptionTitle"
                    className={errors.descriptionTitle ? "border-red-500" : ""}
                    {...register("descriptionTitle")}
                    placeholder="What you do in a few words"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="descriptionTitle"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    className={`min-h-[120px] ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    placeholder="Detailed description of your skills and experience"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="description"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar </Label>
                  <Input
                    id="avatar"
                    ref={avatarRef}
                    type="file"
                    accept="image/*"
                    className={errors.avatar ? "border-red-500" : ""}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="avatar"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>
                  Your professional achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfProjects">Number of Projects</Label>
                    <Input
                      id="numberOfProjects"
                      {...register("numberOfProjects", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className={
                        errors.numberOfProjects ? "border-red-500" : ""
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="numberOfProjects"
                      render={({ message }) => (
                        <p className="text-sm text-red-500">{message}</p>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfClients">Number of Clients</Label>
                    <Input
                      id="numberOfClients"
                      {...register("numberOfClients", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className={errors.numberOfClients ? "border-red-500" : ""}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="numberOfClients"
                      render={({ message }) => (
                        <p className="text-sm text-red-500">{message}</p>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientSatisfaction">
                      Client Satisfaction (%)
                    </Label>
                    <Input
                      id="clientSatisfaction"
                      {...register("clientSatisfaction", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      min="0"
                      max="100"
                      className={
                        errors.clientSatisfaction ? "border-red-500" : ""
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="clientSatisfaction"
                      render={({ message }) => (
                        <p className="text-sm text-red-500">{message}</p>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">
                      Years of Experience
                    </Label>
                    <Input
                      id="yearsOfExperience"
                      {...register("yearsOfExperience", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className={
                        errors.yearsOfExperience ? "border-red-500" : ""
                      }
                    />
                    <ErrorMessage
                      errors={errors}
                      name="yearsOfExperience"
                      render={({ message }) => (
                        <p className="text-sm text-red-500">{message}</p>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="phone"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="location"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    ref={resumeRef}
                    type="file"
                    accept=".pdf, .doc, .docx"
                    className={errors.resume ? "border-red-500" : ""}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="resume"
                    render={({ message }) => (
                      <p className="text-sm text-red-500">{message}</p>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              "Saving..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
