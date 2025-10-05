"use client";


import type * as React from "react";
import {
  BarChart3,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Bell,
  CreditCard,
  Star,
  MapPin,
  Utensils,
} from "lucide-react";
import { NavProjects } from "@/components/admindashboard/NavProjects"; // Import NavProjects

import { NavMain } from "@/components/admindashboard/NavMain";
import { NavUser } from "@/components/admindashboard/NavUser";
import { TeamSwitcher } from "@/components/admindashboard/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Updated data for food delivery platform
const data = {
  user: {
    name: "Admin User",
    email: "admin@mekin.com",
    avatar: "/admin-interface.png",
  },
  teams: [
    {
      name: "Bayisa Admin",
      logo: Utensils,
      plan: "Manage",
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
      url: "/admin/dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/admin/dashboard/overview",
        },
        {
          title: "Analytics",
          url: "/admin/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/admin/dashboard/reports",
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
          url: "/admin/orders/all",
        },
        {
          title: "Pending",
          url: "/admin/orders/pending",
        },
        {
          title: "In Progress",
          url: "/admin/orders/in-progress",
        },
        {
          title: "Completed",
          url: "/admin/orders/completed",
        },
      ],
    },
    {
      title: "Restaurants",
      url: "/admin/restaurants",
      icon: Store,
      items: [
        {
          title: "All Restaurants",
          url: "/admin/restaurants/allrestaurants",
        },
        {
          title: "Pending Approval",
          url: "/admin/restaurants/pending",
        },
        {
          title: "Menu Management",
          url: "/admin/restaurants/menu",
        },
        {
          title: "Categories",
          url: "/admin/restaurants/categories",
        },
      ],
    },
    {
      title: "Drivers",
      url: "/admin/drivers",
      icon: Truck,
      items: [
        {
          title: "All Drivers",
          url: "/admin/drivers/all",
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
