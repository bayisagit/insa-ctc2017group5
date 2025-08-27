"use client";

import type * as React from "react";
import {
  BarChart3,
  ShoppingCart,
  Store,
  Star,
  Bell,
  Wallet,
  User,
  Settings,
  HelpCircle,
  Tag,
  Clock,
} from "lucide-react";
import { NavProjects } from "@/components/restaurantdashboard/NavProjects";
import { NavMain } from "@/components/restaurantdashboard/NavMain";
import { NavUser } from "@/components/restaurantdashboard/NavUser";
import { TeamSwitcher } from "@/components/restaurantdashboard/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation"; // Import useParams for dynamic route

// Define the restaurant ID as a prop or from route params
interface RestaurantAppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  restaurantId?: string; // Optional prop if not using useParams
}

export function RestaurantAppSidebar({ restaurantId, ...props }: RestaurantAppSidebarProps) {
  // Use useParams to get the restaurant ID from the route
  const params = useParams();
  const id = restaurantId || params.id; // Fallback to prop if provided, else use route param

  // Validate that id exists
  if (!id) {
    console.error("Restaurant ID is required for sidebar navigation.");
  }

  const data = {
    user: {
      name: "Restaurant Owner",
      email: "owner@mekin.com",
      avatar: "/restaurant-avatar.png",
    },
    teams: [
      {
        name: "Bayisa Restaurant",
        logo: Store,
        plan: "Restaurant",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: `/restaurants/${id}/dashboard`,
        icon: BarChart3,
        isActive: true,
        items: [
          { title: "Overview", url: `/restaurants/${id}/dashboard/overview` },
          { title: "Order Summary", url: `/restaurants/${id}/dashboard/ordersummary` },
          { title: "Analytics", url: `/restaurants/${id}/dashboard/analytics` },
        ],
      },
      {
        title: "Orders",
        url: `/restaurants/${id}/orders`,
        icon: ShoppingCart,
        items: [
          { title: "Pending Orders", url: `/restaurants/${id}/orders/pending` },
          { title: "In Progress", url: `/restaurants/${id}/orders/progress` },
          { title: "Order History", url: `/restaurants/${id}/orders/history` },
        ],
      },
      {
        title: "Items",
        url: `/restaurants/${id}/items`,
        icon: Store,
        items: [
          { title: "Manage Items", url: `/restaurants/${id}/items/manage` },
          { title: "Add Item", url: `/restaurants/${id}/items/additem` },
          { title: "Categories", url: `/restaurants/${id}/items/categories` },
        ],
      },
      {
        title: "Offers",
        url: `/restaurants/${id}/offers`,
        icon: Tag,
        items: [
          { title: "Active Offers", url: `/restaurants/${id}/offers/activeoffer` },
          { title: "Create Offer", url: `/restaurants/${id}/offers/createoffer` },
          { title: "Offer History", url: `/restaurants/${id}/offers/offerhistory` },
        ],
      },
      {
        title: "Opening Hours",
        url: `/restaurants/${id}/hours`,
        icon: Clock,
        items: [
          { title: "View Schedule", url: `/restaurants/${id}/openinghours` },
          { title: "Update Schedule", url: `/restaurants/${id}/openinghours` },
        ],
      },
      {
        title: "Reviews",
        url: `/restaurants/${id}/reviews`,
        icon: Star,
        items: [
          { title: "Customer Reviews", url: `/restaurants/${id}/reviews/review` },
          { title: "Ratings Summary", url: `/restaurants/${id}/reviews/rating` },
        ],
      },
      {
        title: "Earnings",
        url: `/restaurants/${id}/earnings`,
        icon: Wallet,
        items: [
          { title: "Balance", url: `/restaurants/${id}/earnings/balance` },
          { title: "Payout History", url: `/restaurants/${id}/earnings/history` },
        ],
      },
    ],
    projects: [
      { name: "Notifications", url: `/restaurants/${id}/notifications`, icon: Bell },
      { name: "Support", url: `/restaurants/${id}/support`, icon: HelpCircle },
      { name: "Store Profile", url: `/restaurants/${id}/profile`, icon: User },
    ],
  };

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