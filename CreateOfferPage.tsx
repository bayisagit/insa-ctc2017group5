"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateOfferPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountType: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    discountValue: 0,
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.code || !formData.discountValue || !formData.startDate || !formData.endDate) {
      toast.error("Code, discount value, start date, and end date are required.");
      return false;
    }
    if (formData.discountValue <= 0) {
      toast.error("Discount value must be greater than 0.");
      return false;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/restaurants/offers/createoffer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Offer created successfully!");
        setTimeout(() => router.push("/restaurants/offers/active"), 1500);
      } else {
        toast.error(data.message || "Failed to create offer.");
      }
    } catch (error) {
      toast.error("Error creating offer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create Offer</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="code">Offer Code</Label>
          <Input id="code" value={formData.code} onChange={(e) => handleChange("code", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="discountType">Discount Type</Label>
          <Select value={formData.discountType} onValueChange={(value) => handleChange("discountType", value)}>
            <SelectTrigger id="discountType">
              <SelectValue placeholder="Select discount type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentage</SelectItem>
              <SelectItem value="FIXED">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="discountValue">Discount Value</Label>
          <Input
            id="discountValue"
            type="number"
            step="0.01"
            value={formData.discountValue}
            onChange={(e) => handleChange("discountValue", parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Offer"}
        </Button>
      </div>
    </div>
  );
};

export default CreateOfferPage;