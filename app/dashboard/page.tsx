import { redirect } from "next/navigation"

export default async function DashboardPage() {
  // Check if user is logged in via localStorage (client-side check will be needed)
  // For now, redirect to admin login
  redirect("/auth/login")
}
