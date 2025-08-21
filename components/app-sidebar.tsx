"use client"
// "use server"
// import type * as React from "react"
import React, {useEffect,useState} from "react"
import { BarChart3, ShoppingCart,  Users, Bell, CreditCard, Star, MapPin, Utensils, StoreIcon, TruckIcon } from "lucide-react"
import { NavProjects } from "@/components/nav-projects" // Import NavProjects

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { getOrganization } from "@/server/organization"



export const sidebarData = {
branches: [
  {
    id: 1,
    name: " Downtown Branch",
    type: "Restaurant",
    location: "Downtown, Addis Ababa",
    logo: Utensils,
    plan: "Enterprise",
    manager: {
      name: "Admin User",
      email: "admin@mekin.com",
      avatar: "/avatars/admin.png"
    }
  },
  {
    id: 2,
    name: "Market Branch",
    type: "Supermarket",
    location: "Bole, Addis Ababa",
    logo: BarChart3,
    plan: "Pro",
    manager: {
      name: "Operations User",
      email: "operations@mekin.com",
      avatar: "/avatars/operations.png"
    }
  },
],

  navMain: [
    {
      id: 'dashboard',
      title: "Dashboard",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          id: 'overview',
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          id: 'analytics',
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          id: 'reports',
          title: "Reports",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      id: 'orders',
      title: "Orders",
      url: "/orders",
      icon: ShoppingCart,
      items: [
        {
          id: 'all-orders',
          title: "All Orders",
          url: "/orders/all",
        },
        {
          id: 'pending',
          title: "Pending",
          url: "/orders/pending",
        },
        {
          id: 'in-progress',
          title: "In Progress",
          url: "/orders/in-progress",
        },
        {
          id: 'completed',
          title: "Completed",
          url: "/orders/completed",
        },
      ],
    },
{
  id: 'organizations',
  title: "Organizations",
  url: "/organizations",
  icon: StoreIcon, // replace with your icon
  items: [
    {
      id: 'all-organizations',
      title: "All Organizations",
      url: "/organizations/all",
    },
    {
      id: 'my-organizations',
      title: "My Organizations",
      url: "/organizations/mine",
    },
    {
      id: 'tasks',
      title: "Tasks / Permissions",
      url: "/organizations/tasks",
      items: [
        {
          id: 'create-project',
          title: "Create Project",
          url: "/organizations/tasks/create-project",
        },
        {
          id: 'manage-users',
          title: "Manage Users",
          url: "/organizations/tasks/manage-users",
        },
        {
          id: 'view-reports',
          title: "View Reports",
          url: "/organizations/tasks/view-reports",
        },
        {
          id: 'settings',
          title: "Organization Settings",
          url: "/organizations/tasks/settings",
        },
      ],
    },
  ],
},

    {
      id: 'drivers',
      title: "Drivers",
      url: "/drivers",
      icon: TruckIcon,
      items: [
        {
          id: 'all-drivers',
          title: "All Drivers",
          url: "/drivers/all",
        },
        {
          id: 'available',
          title: "Available",
          url: "/drivers/available",
        },
        {
          id: 'verification',
          title: "Verification",
          url: "/drivers/verification",
        },
        {
          id: 'performance',
          title: "Performance",
          url: "/drivers/performance",
        },
      ],
    },
    {
      id: 'users',
      title: "Users",
      url: "/users",
      icon: Users,
      items: [
        {
          id: 'customers',
          title: "Customers",
          url: "/users/customers",
        },
        {
          id: 'store-owners',
          title: "Store Owners",
          url: "/users/store-owners",
        },
        {
          id: 'analytics',
          title: "User Analytics",
          url: "/users/analytics",
        },
      ],
    },
    {
      id: 'payments',
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
      items: [
        {
          id: 'transactions',
          title: "Transactions",
          url: "/payments/transactions",
        },
        {
          id: 'refunds',
          title: "Refunds",
          url: "/payments/refunds",
        },
        {
          id: 'payouts',
          title: "Payouts",
          url: "/payments/payouts",
        },
      ],
    },
  ],
  projects: [
    {
      id: 'promotions',
      name: "Promotions",
      url: "/promotions",
      icon: Star,
    },
    {
      id: 'delivery-zones',
      name: "Delivery Zones",
      url: "/delivery-zones",
      icon: MapPin,
    },
    {
      id: 'notifications',
      name: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
  ],
};

// Inside AppSidebar
export  function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const [organizations, setOrganizations] = React.useState<any[]>([]);

  // React.useEffect(() => {
  //   getOrganization().then((data) => setOrganizations(data));
  // }, []);

  // // Map the fetched data to the shape expected by TeamSwitcher
  // const teams = organizations.map((org) => ({
  //   name: org.name,
  //   logo: org.logo ? () => <img src={org.logo} alt={org.name} /> : Utensils, // fallback icon
  //   plan: org.members?.[0]?.role || "Member", // just an example, you can adjust
  // }));
  // const organazation=await getOrganization()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.branches} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavProjects projects={sidebarData.projects} /> 
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.branches[0]?.manager} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
