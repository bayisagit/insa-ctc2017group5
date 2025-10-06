"use client";

import { useState, useMemo } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
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

export default function StoreUsersClient({
  storeId,
  initialUsers,
}: {
  storeId: string;
  initialUsers: User[];
}) {
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user) => {
      if (roleFilter !== "all" && user.role !== roleFilter) return false;
      if (statusFilter !== "all" && user.status !== statusFilter) return false;
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
  }, [roleFilter, statusFilter, searchQuery, initialUsers]);

  const counts = useMemo(() => {
    const active = initialUsers.filter(u => u.status === "ACTIVE").length;
    const inactive = initialUsers.filter(u => u.status === "INACTIVE").length;
    const banned = initialUsers.filter(u => u.status === "BANNED").length;
    const customers = initialUsers.filter(u => u.role === "CUSTOMER").length;
    return { active, inactive, banned, customers };
  }, [initialUsers]);

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <div className="space-y-6">
      {/* Search and Add */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Users</h2>
        <div className="flex items-center gap-2">
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
        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as Role | "all")}>
          <SelectTrigger><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="STORE_OWNER">Store Owner</SelectItem>
            <SelectItem value="DRIVER">Driver</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as UserStatus | "all")}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="BANNED">Banned</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => { setRoleFilter("all"); setStatusFilter("all"); setSearchQuery(""); }}>
          Clear Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Users", value: initialUsers.length },
          { title: "Active", value: counts.active },
          { title: "Customers", value: counts.customers },
          { title: "Banned", value: counts.banned },
        ].map((c) => (
          <Card key={c.title}>
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{c.value}</div></CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>{filteredUsers.length} users found for store #{storeId}</CardDescription>
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
                        <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge className={roleColors[user.role]}>{user.role}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[user.status]}>{user.status}</Badge></TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.lastActive)}</TableCell>
                  <TableCell>{user.orderCount}</TableCell>
                  <TableCell>{formatCurrency(user.totalSpent)}</TableCell>
                  <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
