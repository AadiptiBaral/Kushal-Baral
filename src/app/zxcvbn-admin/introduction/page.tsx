"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {toast} from "sonner"
import { Save, Plus, X } from "lucide-react"

interface PersonalValue {
  id: string
  icon: string
  title: string
  description: string
}

interface Introduction {
  introduction: string
  description: string
  descriptionTitle: string
  numberOfProjects: number
  numberOfClients: number
  clientSatisfaction: number
  yearsOfExperience: number
  resume: string
  personalValues: PersonalValue[]
  email: string
  phone: string
  location: string
}

export default function IntroductionPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [introduction, setIntroduction] = useState<Introduction>({
    introduction: "",
    description: "",
    descriptionTitle: "",
    numberOfProjects: 0,
    numberOfClients: 0,
    clientSatisfaction: 0,
    yearsOfExperience: 0,
    resume: "",
    personalValues: [],
    email: "",
    phone: "",
    location: "",
  })

  const [newValue, setNewValue] = useState({
    icon: "",
    title: "",
    description: "",
  })

  useEffect(() => {
    // In a real app, you would fetch the introduction data from your database
    // This is just mock data for demonstration
    const mockIntroduction = {
      introduction: "Hi, I'm John Doe, a Full Stack Developer",
      description:
        "I specialize in creating beautiful, functional, and user-friendly websites and applications. With a passion for clean code and modern design, I deliver solutions that exceed expectations.",
      descriptionTitle: "Crafting Digital Experiences",
      numberOfProjects: 50,
      numberOfClients: 30,
      clientSatisfaction: 98,
      yearsOfExperience: 7,
      resume: "https://example.com/resume.pdf",
      personalValues: [
        {
          id: "1",
          icon: "code",
          title: "Clean Code",
          description: "I write code that is readable, maintainable, and follows best practices.",
        },
        {
          id: "2",
          icon: "zap",
          title: "Performance",
          description: "I optimize for speed and efficiency in everything I build.",
        },
        {
          id: "3",
          icon: "users",
          title: "User-Focused",
          description: "I create solutions with the end user's needs in mind.",
        },
      ],
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    }

    setIntroduction(mockIntroduction)
    setLoading(false)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setIntroduction((prev) => ({
      ...prev,
      [name]:
        name.includes("number") ||
        name.includes("Number") ||
        name.includes("satisfaction") ||
        name.includes("experience")
          ? Number.parseInt(value) || 0
          : value,
    }))
  }

  const addPersonalValue = () => {
    if (!newValue.icon || !newValue.title || !newValue.description) {
     toast.error("Please fill in all fields for the personal value.")
      return
    }

    const personalValue: PersonalValue = {
      id: Date.now().toString(),
      ...newValue,
    }

    setIntroduction((prev) => ({
      ...prev,
      personalValues: [...prev.personalValues, personalValue],
    }))

    setNewValue({ icon: "", title: "", description: "" })
  }

  const removePersonalValue = (id: string) => {
    setIntroduction((prev) => ({
      ...prev,
      personalValues: prev.personalValues.filter((value) => value.id !== id),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // In a real app, you would save the introduction to your database
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    setSaving(false)
    toast.success("Introduction saved successfully!")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
        <p className="text-muted-foreground">Manage your personal introduction and information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your main introduction and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="introduction">Introduction</Label>
                  <Input
                    id="introduction"
                    name="introduction"
                    value={introduction.introduction}
                    onChange={handleChange}
                    placeholder="Hi, I'm..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descriptionTitle">Description Title</Label>
                  <Input
                    id="descriptionTitle"
                    name="descriptionTitle"
                    value={introduction.descriptionTitle}
                    onChange={handleChange}
                    placeholder="What you do in a few words"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={introduction.description}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    placeholder="Detailed description of your skills and experience"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your professional achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfProjects">Number of Projects</Label>
                    <Input
                      id="numberOfProjects"
                      name="numberOfProjects"
                      type="number"
                      value={introduction.numberOfProjects}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfClients">Number of Clients</Label>
                    <Input
                      id="numberOfClients"
                      name="numberOfClients"
                      type="number"
                      value={introduction.numberOfClients}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientSatisfaction">Client Satisfaction (%)</Label>
                    <Input
                      id="clientSatisfaction"
                      name="clientSatisfaction"
                      type="number"
                      min="0"
                      max="100"
                      value={introduction.clientSatisfaction}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      value={introduction.yearsOfExperience}
                      onChange={handleChange}
                      required
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
                    name="email"
                    type="email"
                    value={introduction.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={introduction.phone} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={introduction.location} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume URL</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="url"
                    value={introduction.resume}
                    onChange={handleChange}
                    placeholder="https://example.com/resume.pdf"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Values</CardTitle>
                <CardDescription>Your core values and principles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {introduction.personalValues.map((value) => (
                    <div key={value.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{value.icon}</Badge>
                          <h4 className="font-medium">{value.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePersonalValue(value.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="newIcon">Icon</Label>
                    <Select
                      value={newValue.icon}
                      onValueChange={(value) => setNewValue((prev) => ({ ...prev, icon: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="code">Code</SelectItem>
                        <SelectItem value="zap">Zap</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                        <SelectItem value="heart">Heart</SelectItem>
                        <SelectItem value="star">Star</SelectItem>
                        <SelectItem value="shield">Shield</SelectItem>
                        <SelectItem value="target">Target</SelectItem>
                        <SelectItem value="lightbulb">Lightbulb</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newTitle">Title</Label>
                    <Input
                      id="newTitle"
                      value={newValue.title}
                      onChange={(e) => setNewValue((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Value title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newDescription">Description</Label>
                    <Textarea
                      id="newDescription"
                      value={newValue.description}
                      onChange={(e) => setNewValue((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Value description"
                      className="min-h-[80px]"
                    />
                  </div>

                  <Button type="button" onClick={addPersonalValue} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Personal Value
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? (
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
  )
}
