"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Balance = {
  totalEarnings: number;
  pendingPayouts: number;
  availableBalance: number;
};

type Transaction = {
  id: string;
  orderNumber: string;
  amount: number;
  type: "ORDER" | "PAYOUT";
  status: "COMPLETED" | "PENDING";
  createdAt: string;
};

const BalancePage = () => {
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("/api/restaurants/earnings/balance");
        const data = await res.json();
        if (res.ok && data.success) {
          setBalance(data.balance);
          setTransactions(data.transactions);
        } else {
          toast.error(data.message || "Failed to fetch balance.");
        }
      } catch (error) {
        toast.error("Error fetching balance.");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchBalance();
  }, []);

  if (fetching) return <div>Loading balance...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings Balance</h2>
      {!balance ? (
        <p>No balance data available.</p>
      ) : (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Balance Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex justify-between">
                <span>Total Earnings:</span>
                <span className="font-semibold">${balance.totalEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Payouts:</span>
                <span className="font-semibold">${balance.pendingPayouts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Balance:</span>
                <span className="font-semibold text-green-600">${balance.availableBalance.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {!transactions.length ? (
                <p>No recent transactions.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.orderNumber}</TableCell>
                        <TableCell>
                          {transaction.type === "ORDER" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              transaction.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BalancePage;