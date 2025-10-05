"use client"

import React from "react";
import { AppSidebar } from "@/components/admindashboard/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Remove empty strings and split path
  const segments = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
                {/* Home / Dashboard Link */}
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Bayisa Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {segments.slice(1).map((segment, index) => {
                const href = "/" + segments.slice(0, index + 2).join("/");
                const isLast = index === segments.slice(1).length - 1;

                return (
                  <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <span className="capitalize">{segment}</span>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={href} className="capitalize">
                            {segment}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
