"use client"

import type * as React from "react"
import { BarChart3, ShoppingCart,  Users, Bell, CreditCard, Star, MapPin, Utensils, StoreIcon, TruckIcon } from "lucide-react"
import { NavProjects } from "@/components/nav-projects" // Import NavProjects

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"



export const sidebarData = {
  teams: [
    {
      id: 1,
      name: "Mekin Admin",
      logo: Utensils,
      plan: "Enterprise",
      user: {
        name: "Admin User",
        email: "admin@mekin.com",
        avatar: "/avatars/admin.png"
      }
    },
    {
      id: 2,
      name: "Operations",
      logo: BarChart3,
      plan: "Pro",
      user: {
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
      id: 'stores',
      title: "Stores",
      url: "/stores",
      icon: StoreIcon,
      items: [
        {
          id: 'all-stores',
          title: "All Stores",
          url: "/stores/all",
        },
        {
          id: 'pending-approval',
          title: "Pending Approval",
          url: "/stores/pending",
        },
        {
          id: 'products',
          title: "Product Management",
          url: "/stores/products",
        },
        {
          id: 'categories',
          title: "Categories",
          url: "/stores/categories",
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavProjects projects={sidebarData.projects} /> 
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.teams[0].user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
