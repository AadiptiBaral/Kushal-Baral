import type { Metadata } from "next";
import DashboardStats from "@/components/admin/dashboard-stats";
import Overview from "@/components/admin/overview";
import RecentContacts from "@/components/admin/recent-contacts";
import FeaturedProjects from "@/components/admin/featured-project";
import dbConnect from "@/lib/connectDb";
import Project from "@/models/projects.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard overview",
};

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Please log in to access the dashboard.
        </h1>
      </div>
    );
  }
  async function fetchProjects() {
    try {
      await dbConnect();
      const projects = await Project.find({ featured: true })
        .sort({ createdAt: -1 })
        .lean();

      if (!projects || projects.length === 0) {
        return [];
      }
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }
  const projects = await fetchProjects();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <Overview />
        <RecentContacts />
      </div>
      <FeaturedProjects projects={projects} />
    </div>
  );
}
