
import type { Metadata } from "next";
import DashboardStats from "@/components/admin/dashboard-stats";
import Overview from "@/components/admin/overview";
import RecentContacts from "@/components/admin/recent-contacts";
import FeaturedProjects from "@/components/admin/featured-project";
export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard overview",
};

export default async function AdminDashboard() {
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
      <FeaturedProjects />
    </div>
  );
}
