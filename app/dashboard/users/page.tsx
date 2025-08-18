// src/app/store/[storeId]/users/page.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Role = "ADMIN" | "CUSTOMER" | "STORE_OWNER" | "DRIVER";
type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  lastActive: Date;
  phone?: string;
  image?: string;
  orderCount: number;
  totalSpent: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: new Date(2023, 5, 15),
    lastActive: new Date(2023, 10, 20),
    phone: "+1 (555) 123-4567",
    orderCount: 12,
    totalSpent: 1250.75,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "STORE_OWNER",
    status: "ACTIVE",
    createdAt: new Date(2023, 4, 10),
    lastActive: new Date(2023, 10, 21),
    phone: "+1 (555) 987-6543",
    image: "https://example.com/avatar1.jpg",
    orderCount: 0,
    totalSpent: 0,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: new Date(2023, 6, 5),
    lastActive: new Date(2023, 10, 18),
    orderCount: 5,
    totalSpent: 450.25,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "DRIVER",
    status: "ACTIVE",
    createdAt: new Date(2023, 3, 22),
    lastActive: new Date(2023, 10, 22),
    phone: "+1 (555) 456-7890",
    image: "https://example.com/avatar2.jpg",
    orderCount: 0,
    totalSpent: 0,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "CUSTOMER",
    status: "INACTIVE",
    createdAt: new Date(2023, 2, 15),
    lastActive: new Date(2023, 8, 30),
    orderCount: 3,
    totalSpent: 210.5,
  },
  {
    id: "6",
    name: "Diana Miller",
    email: "diana@example.com",
    role: "CUSTOMER",
    status: "BANNED",
    createdAt: new Date(2023, 7, 10),
    lastActive: new Date(2023, 9, 5),
    phone: "+1 (555) 789-0123",
    orderCount: 8,
    totalSpent: 980.0,
  },
];

const roleColors = {
  ADMIN: "bg-purple-100 text-purple-800",
  CUSTOMER: "bg-blue-100 text-blue-800",
  STORE_OWNER: "bg-green-100 text-green-800",
  DRIVER: "bg-orange-100 text-orange-800",
};

const statusColors = {
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-yellow-100 text-yellow-800",
  BANNED: "bg-red-100 text-red-800",
};

export default function StoreUsersPage({ params }: { params: { storeId: string } }) {
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // Role filter
      if (roleFilter !== "all" && user.role !== roleFilter) return false;
      
      // Status filter
      if (statusFilter !== "all" && user.status !== statusFilter) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !user.name.toLowerCase().includes(query) &&
          !user.email.toLowerCase().includes(query) &&
          !(user.phone && user.phone.toLowerCase().includes(query))
        ) {
          return false;
        }
      }
      
      return true;
    });
  }, [roleFilter, statusFilter, searchQuery]);

  const activeUsers = useMemo(() => {
    return mockUsers.filter(u => u.status === "ACTIVE").length;
  }, []);

  const inactiveUsers = useMemo(() => {
    return mockUsers.filter(u => u.status === "INACTIVE").length;
  }, []);

  const bannedUsers = useMemo(() => {
    return mockUsers.filter(u => u.status === "BANNED").length;
  }, []);

  const customers = useMemo(() => {
    return mockUsers.filter(u => u.role === "CUSTOMER").length;
  }, []);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search users..."
            className="w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>Add User</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as Role | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="STORE_OWNER">Store Owner</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as UserStatus | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="BANNED">Banned</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setRoleFilter("all");
            setStatusFilter("all");
            setSearchQuery("");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All users in this store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
            <CardDescription>Currently active users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Regular customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Banned</CardTitle>
            <CardDescription>Restricted users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bannedUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            {filteredUsers.length} users found for store #{params.storeId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[user.status]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.phone || "N/A"}
                  </TableCell>
                  <TableCell>
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    {formatDate(user.lastActive)}
                  </TableCell>
                  <TableCell>
                    {user.orderCount}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(user.totalSpent)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}