import type { Metadata } from "next"
import ProjectsClientPage from "./projects-client-page"

export const metadata: Metadata = {
  title: "Projects Management",
  description: "Manage portfolio projects",
}

export default function ProjectsPage() {
  return <ProjectsClientPage />
}
