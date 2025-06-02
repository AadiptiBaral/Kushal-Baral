"use client";

import type React from "react";
import { useEffect, useRef, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Save } from "lucide-react";
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
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { introductionSchema } from "@/schemas/introductionSchema";
import * as z from "zod";

interface IntroductionData {
  _id?: string;
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
  avatar?: string;
  resume?: string;
}

interface UpdateIntroductionProps {
  initialData: IntroductionData;
}

type IntroductionFormData = z.infer<typeof introductionSchema>;

export default function UpdateIntroduction({ initialData }: UpdateIntroductionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IntroductionFormData>({
    resolver: zodResolver(introductionSchema),
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

  useEffect(() => {
    if (initialData) {
      reset({
        introduction: initialData.introduction || "",
        description: initialData.description || "",
        descriptionTitle: initialData.descriptionTitle || "",
        numberOfProjects: initialData.numberOfProjects || 0,
        numberOfClients: initialData.numberOfClients || 0,
        clientSatisfaction: initialData.clientSatisfaction || 0,
        yearsOfExperience: initialData.yearsOfExperience || 0,
        email: initialData.email || "",
        phone: initialData.phone || "",
        location: initialData.location || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (formData: IntroductionFormData) => {
    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== null) {
          submitData.append(key, value.toString());
        }
      });

      // Validate and attach files if selected
      const avatarFile = avatarRef.current?.files?.[0];
      const resumeFile = resumeRef.current?.files?.[0];

      if (avatarFile) {
        try {
          const { avatar_schema } = await import("@/schemas/introductionSchema");
          avatar_schema.parse(avatarFile);
          submitData.append("avatar", avatarFile);
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            toast.error(validationError.errors[0]?.message || "Invalid avatar file");
            return;
          }
          throw validationError;
        }
      }

      if (resumeFile) {
        try {
          const { resume_schema } = await import("@/schemas/introductionSchema");
          resume_schema.parse(resumeFile);
          submitData.append("resume", resumeFile);
        } catch (validationError) {
          if (validationError instanceof z.ZodError) {
            toast.error(validationError.errors[0]?.message || "Invalid resume file");
            return;
          }
          throw validationError;
        }
      }

      const response = await axios.patch("/api/introduction", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        toast.success("Introduction updated successfully!");
        if (avatarRef.current) avatarRef.current.value = "";
        if (resumeRef.current) resumeRef.current.value = "";
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as { message?: string; error?: string } | undefined;
        toast.error(
          `Error: ${errorData?.message || errorData?.error || "An error occurred"}`
        );
      } else {
        toast.error(`Error: ${(error as Error).message || "An unexpected error occurred"}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
        <p className="text-muted-foreground">
          Update your personal introduction and information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Main introduction details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InputField id="introduction" label="Introduction" register={register} errors={errors} />
                <InputField id="descriptionTitle" label="Description Title" register={register} errors={errors} />
                <TextAreaField id="description" label="Description" register={register} errors={errors} />
                <FileField id="avatar" label="Avatar (optional)" ref={avatarRef} accept="image/*" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Professional achievements</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <NumberField id="numberOfProjects" label="Number of Projects" register={register} errors={errors} />
                <NumberField id="numberOfClients" label="Number of Clients" register={register} errors={errors} />
                <NumberField id="clientSatisfaction" label="Client Satisfaction (%)" register={register} errors={errors} />
                <NumberField id="yearsOfExperience" label="Years of Experience" register={register} errors={errors} />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <InputField id="email" label="Email" register={register} errors={errors} type="email" />
                <InputField id="phone" label="Phone" register={register} errors={errors} />
                <InputField id="location" label="Location" register={register} errors={errors} />
                <FileField id="resume" label="Resume (optional)" ref={resumeRef} accept=".pdf,.doc,.docx" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : <>
              <Save className="mr-2 h-4 w-4" /> Update Introduction
            </>}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ✅ Reusable Components
const InputField = ({ id, label, register, errors, type = "text" }: any) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} {...register(id)} className={errors[id] ? "border-red-500" : ""} />
    <ErrorMessage errors={errors} name={id} render={({ message }) => <p className="text-sm text-red-500">{message}</p>} />
  </div>
);

const TextAreaField = ({ id, label, register, errors }: any) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea id={id} {...register(id)} className={`min-h-[120px] ${errors[id] ? "border-red-500" : ""}`} />
    <ErrorMessage errors={errors} name={id} render={({ message }) => <p className="text-sm text-red-500">{message}</p>} />
  </div>
);

const NumberField = ({ id, label, register, errors }: any) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="number" {...register(id, { valueAsNumber: true })} className={errors[id] ? "border-red-500" : ""} />
    <ErrorMessage errors={errors} name={id} render={({ message }) => <p className="text-sm text-red-500">{message}</p>} />
  </div>
);

const FileField = forwardRef(({ id, label, accept }: any, ref: any) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} ref={ref} type="file" accept={accept} />
  </div>
));
FileField.displayName = "FileField";
