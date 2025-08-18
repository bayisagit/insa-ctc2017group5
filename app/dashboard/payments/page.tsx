"use client";

import { useState, useMemo } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";
type PaymentMethod = "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "PAYPAL" | "MOBILE_PAYMENT";

interface Payment {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  provider?: string;
}

// Single branch mock data
const BRANCH_NAME = "Main Branch";
const mockPayments: Payment[] = [
  {
    id: "1",
    orderNumber: "ORD-1001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    date: new Date(2023, 5, 15),
    amount: 45.99,
    method: "CREDIT_CARD",
    status: "COMPLETED",
    transactionId: "TXN123456",
    provider: "Stripe",
  },
  {
    id: "2",
    orderNumber: "ORD-1002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    date: new Date(2023, 5, 16),
    amount: 129.99,
    method: "PAYPAL",
    status: "PENDING",
    transactionId: "TXN789012",
    provider: "PayPal",
  },
  {
    id: "3",
    orderNumber: "ORD-1003",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    date: new Date(2023, 5, 17),
    amount: 89.5,
    method: "DEBIT_CARD",
    status: "FAILED",
    transactionId: "TXN345678",
    provider: "Stripe",
  },
];

const statusColors = {
  COMPLETED: "bg-green-100 text-green-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-blue-100 text-blue-800",
  PARTIALLY_REFUNDED: "bg-blue-100 text-blue-800",
};

const methodIcons = {
  CASH: "💰",
  CREDIT_CARD: "💳",
  DEBIT_CARD: "💳",
  PAYPAL: "🔵",
  MOBILE_PAYMENT: "📱",
};

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | "all">("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      if (statusFilter !== "all" && payment.status !== statusFilter) return false;
      if (methodFilter !== "all" && payment.method !== methodFilter) return false;
      if (dateFilter && !isSameDay(payment.date, dateFilter)) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !payment.orderNumber.toLowerCase().includes(q) &&
          !payment.customerName.toLowerCase().includes(q) &&
          !payment.customerEmail.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [statusFilter, methodFilter, dateFilter, searchQuery]);

  const getTotal = (status: PaymentStatus | "REFUNDED_GROUP") => {
    return filteredPayments
      .filter(p => 
        status === "REFUNDED_GROUP" 
          ? p.status === "REFUNDED" || p.status === "PARTIALLY_REFUNDED"
          : p.status === status
      )
      .reduce((sum, p) => sum + p.amount, 0);
  };

  function isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{BRANCH_NAME} Payments</h1>
        <Input
          placeholder="Search payments..."
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as PaymentStatus | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="REFUNDED">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Select value={methodFilter} onValueChange={(v) => setMethodFilter(v as PaymentMethod | "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="CASH">Cash</SelectItem>
            <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
            <SelectItem value="DEBIT_CARD">Debit Card</SelectItem>
            <SelectItem value="PAYPAL">PayPal</SelectItem>
            <SelectItem value="MOBILE_PAYMENT">Mobile Payment</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start", !dateFilter && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : <span>Filter by date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} />
          </PopoverContent>
        </Popover>

        <Button variant="outline" onClick={() => { 
          setStatusFilter("all"); setMethodFilter("all"); setDateFilter(undefined); setSearchQuery("");
        }}>
          Clear Filters
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Completed" amount={getTotal("COMPLETED")} count={filteredPayments.filter(p => p.status === "COMPLETED").length} />
        <SummaryCard title="Pending" amount={getTotal("PENDING")} count={filteredPayments.filter(p => p.status === "PENDING").length} />
        <SummaryCard title="Failed" amount={getTotal("FAILED")} count={filteredPayments.filter(p => p.status === "FAILED").length} />
        <SummaryCard title="Refunded" amount={getTotal("REFUNDED_GROUP")} count={filteredPayments.filter(p => ["REFUNDED", "PARTIALLY_REFUNDED"].includes(p.status)).length} />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>{filteredPayments.length} payments found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.orderNumber}</TableCell>
                  <TableCell>
                    <div>{payment.customerName}</div>
                    <div className="text-sm text-muted-foreground">{payment.customerEmail}</div>
                  </TableCell>
                  <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{methodIcons[payment.method]}</span>
                      {payment.method.replace("_", " ")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[payment.status]}>{payment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {payment.transactionId && <div className="text-sm">ID: {payment.transactionId}</div>}
                    {payment.provider && <div className="text-sm">Via {payment.provider}</div>}
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

function SummaryCard({ title, amount, count }: { title: string; amount: number; count: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)}</div>
        <p className="text-sm text-muted-foreground">{count} transactions</p>
      </CardContent>
    </Card>
  );
}
