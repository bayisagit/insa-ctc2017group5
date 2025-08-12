"use client"

import type * as React from "react"
import { BarChart3, ShoppingCart, Store, Truck, Users, Bell, CreditCard, Star, MapPin, Utensils } from "lucide-react"
import { NavProjects } from "@/components/nav-projects" // Import NavProjects

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// Updated data for food delivery platform
const data = {
  user: {
    name: "Admin User",
    email: "admin@mekin.com",
    avatar: "/admin-interface.png",
  },
  teams: [
    {
      name: "Mekin Admin",
      logo: Utensils,
      plan: "Enterprise",
    },
    {
      name: "Operations",
      logo: BarChart3,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "In Progress",
          url: "#",
        },
        {
          title: "Completed",
          url: "#",
        },
      ],
    },
    {
      title: "Restaurants",
      url: "#",
      icon: Store,
      items: [
        {
          title: "All Restaurants",
          url: "#",
        },
        {
          title: "Pending Approval",
          url: "#",
        },
        {
          title: "Menu Management",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Drivers",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "All Drivers",
          url: "#",
        },
        {
          title: "Available",
          url: "#",
        },
        {
          title: "Verification",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Customers",
          url: "#",
        },
        {
          title: "Restaurant Owners",
          url: "#",
        },
        {
          title: "User Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Transactions",
          url: "#",
        },
        {
          title: "Refunds",
          url: "#",
        },
        {
          title: "Payouts",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Promotions",
      url: "#",
      icon: Star,
    },
    {
      name: "Delivery Zones",
      url: "#",
      icon: MapPin,
    },
    {
      name: "Notifications",
      url: "#",
      icon: Bell,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> // Use NavProjects here
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
