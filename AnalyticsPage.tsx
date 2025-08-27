"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import Link from "next/link";
type AnalyticsData = {
  revenueTrends: { date: string; revenue: number }[];
  itemPopularity: { itemName: string; orderCount: number }[];
  orderVolumeByDay: { day: string; orderCount: number }[];
};

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeFilter, setTimeFilter] = useState("30days");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`/api/restaurants/dashboard/analytics?time=${timeFilter}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setAnalytics(data.analytics);
        } else {
          toast.error(data.message || "Failed to fetch analytics.");
        }
      } catch (error) {
        toast.error("Error fetching analytics.");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchAnalytics();
  }, [timeFilter]);

  if (fetching) return <div>Loading analytics...</div>;

  return (
    <div className="space-y-6">
      <Link href="/restaurants/dashboard/analytics" className="text-2xl font-bold">Analytics</Link>
      <div className="flex gap-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="365days">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {!analytics ? (
        <p>No analytics data available.</p>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-2">
                {analytics.revenueTrends.map(({ date, revenue }) => (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div
                      className="bg-blue-500 w-full rounded"
                      style={{ height: `${(revenue / Math.max(...analytics.revenueTrends.map((t) => t.revenue))) * 100}%` }}
                    />
                    <p className="text-xs mt-2">{new Date(date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Item Popularity</CardTitle>
            </CardHeader>
            <CardContent>
              {!analytics.itemPopularity.length ? (
                <p>No items ordered.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Order Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analytics.itemPopularity.map(({ itemName, orderCount }) => (
                      <TableRow key={itemName}>
                        <TableCell>{itemName}</TableCell>
                        <TableCell>{orderCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Volume by Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-2">
                {analytics.orderVolumeByDay.map(({ day, orderCount }) => (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <div
                      className="bg-green-500 w-full rounded"
                      style={{ height: `${(orderCount / Math.max(...analytics.orderVolumeByDay.map((t) => t.orderCount))) * 100}%` }}
                    />
                    <p className="text-xs mt-2">{day}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;