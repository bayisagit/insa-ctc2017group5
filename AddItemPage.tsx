"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Variant = {
  size: string;
  price: number;
  stockQuantity: number;
};

const AddItemPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
    categoryId: "",
    variants: [{ size: "", price: 0, stockQuantity: 0 }] as Variant[],
  });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/items/categories");
        const data = await res.json();
        if (res.ok && data.success) {
          setCategories(data.categories);
        } else {
          toast.error(data.message || "Failed to fetch categories.");
        }
      } catch (error) {
        toast.error("Error fetching categories.");
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", price: 0, stockQuantity: 0 }],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.categoryId || !formData.image) {
      toast.error("Name, description, category, and image are required.");
      return false;
    }

    if (formData.variants.length === 0) {
      toast.error("At least one variant is required.");
      return false;
    }

    for (const variant of formData.variants) {
      if (!variant.size || variant.price <= 0 || variant.stockQuantity < 0) {
        toast.error("Valid size, price (> 0), and stock quantity (>= 0) are required for each variant.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      let imageUrl = "";
      let imagePublicId = "";

      if (formData.image) {
        const timestamp = Date.now();
        const sanitizedItemName = formData.name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
        imagePublicId = `restaurant-delivery-system/menu-items/${sanitizedItemName}_${timestamp}`;

        const imageFormData = new FormData();
        imageFormData.append("file", formData.image);
        imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        imageFormData.append("public_id", imagePublicId);
        imageFormData.append("folder", "restaurant-delivery-system/menu-items");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Image upload failed.");
        }

        imageUrl = data.secure_url;
        imagePublicId = data.public_id;
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        image: imageUrl,
        imagePublicId,
        categoryId: formData.categoryId,
        variants: formData.variants,
      };

      const res = await fetch("/api/restaurants/items/menuitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Menu item added successfully!");
        setTimeout(() => router.push("/restaurants/items/manage"), 1500);
        setFormData({
          name: "",
          description: "",
          image: null,
          categoryId: "",
          variants: [{ size: "", price: 0, stockQuantity: 0 }],
        });
        setImagePreview(null);
      } else {
        toast.error(data.message || "Failed to add menu item.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <h2 className="text-2xl font-bold">Add Menu Item</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.categoryId} onValueChange={(value) => handleChange("categoryId", value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder={fetchingCategories ? "Loading..." : "Select category"} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <Image src={imagePreview} alt="Preview" width={200} height={200} className="mt-4 rounded-lg" />
        )}
      </div>
      <div>
        <Label>Variants</Label>
        {formData.variants.map((variant, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
              placeholder="Size"
            />
            <Input
              type="number"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, "price", parseFloat(e.target.value))}
              placeholder="Price"
            />
            <Input
              type="number"
              value={variant.stockQuantity}
              onChange={(e) => handleVariantChange(index, "stockQuantity", parseInt(e.target.value))}
              placeholder="Stock"
            />
            {formData.variants.length > 1 && (
              <Button variant="ghost" onClick={() => removeVariant(index)}>
                <X size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline" onClick={addVariant}>
          <Plus size={16} className="mr-2" /> Add Variant
        </Button>
      </div>
      <Button onClick={handleSubmit} disabled={loading || fetchingCategories}>
        {loading ? "Adding..." : "Add Item"}
      </Button>
    </div>
  );
};

export default AddItemPage;