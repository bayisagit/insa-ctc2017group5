"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ActiveOffersPage = () => {
  const [offers, setOffers] = useState<
    {
      id: string;
      code: string;
      description: string | null;
      discountType: "PERCENTAGE" | "FIXED";
      discountValue: number;
      startDate: string;
      endDate: string;
      isActive: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchActiveOffers = async () => {
      try {
        const res = await fetch("/api/restaurants/offers/active");
        const data = await res.json();
        if (res.ok && data.success) {
          setOffers(data.offers);
        } else {
          toast.error(data.message || "Failed to fetch active offers.");
        }
      } catch (error) {
        toast.error("Error fetching active offers.");
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchActiveOffers();
  }, []);

  const handleDeactivate = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/restaurant/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: false }),
      });

      if (res.ok) {
        toast.success("Offer deactivated successfully!");
        setOffers((prev) => prev.filter((offer) => offer.id !== id));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to deactivate offer.");
      }
    } catch (error) {
      toast.error("Error deactivating offer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading active offers...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Active Offers</h2>
      {offers.length === 0 ? (
        <p>No active offers found.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Discount Type</TableHead>
              <TableHead>Discount Value</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.code}</TableCell>
                <TableCell>{offer.description || "N/A"}</TableCell>
                <TableCell>{offer.discountType}</TableCell>
                <TableCell>
                  {offer.discountType === "PERCENTAGE"
                    ? `${offer.discountValue}%`
                    : `$${offer.discountValue.toFixed(2)}`}
                </TableCell>
                <TableCell>{new Date(offer.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(offer.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeactivate(offer.id)}
                    disabled={loading}
                  >
                    Deactivate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ActiveOffersPage;