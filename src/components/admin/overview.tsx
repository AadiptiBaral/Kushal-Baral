"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    contacts: 4,
    projects: 1,
  },
  {
    name: "Feb",
    contacts: 3,
    projects: 2,
  },
  {
    name: "Mar",
    contacts: 5,
    projects: 0,
  },
  {
    name: "Apr",
    contacts: 2,
    projects: 1,
  },
  {
    name: "May",
    contacts: 6,
    projects: 3,
  },
  {
    name: "Jun",
    contacts: 4,
    projects: 2,
  },
]

export default function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Activity overview for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip cursor={false} />
            <Bar dataKey="contacts" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Contacts" />
            <Bar dataKey="projects" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Projects" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
