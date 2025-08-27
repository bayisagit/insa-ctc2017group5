"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { toast, Toaster } from "sonner";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<{ id: string; name: string; description: string }[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/restaurants/items/categories");
        const data = await res.json();
        if (res.ok && data.success) {
          setCategories(data.categories);
        } else {
          toast.error(data.message || "Failed to fetch categories.");
        }
      } catch (error) {
        toast.error("Error fetching categories.");
      } finally {
        setFetching(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (field: "name" | "description", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Category name is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(editingId ? "Category updated successfully!" : "Category added successfully!");
        setFormData({ name: "", description: "" });
        setEditingId(null);
        // Refresh categories
        const fetchRes = await fetch("/api/categories");
        const fetchData = await fetchRes.json();
        if (fetchRes.ok && fetchData.success) {
          setCategories(fetchData.categories);
        }
      } else {
        toast.error(data.message || "Failed to save category.");
      }
    } catch (error) {
      toast.error("Error saving category.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: { id: string; name: string; description: string }) => {
    setFormData({ name: category.name, description: category.description });
    setEditingId(category.id);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Category deleted successfully!");
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (error) {
      toast.error("Error deleting category.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <h2 className="text-2xl font-bold">Manage Categories</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Category" : "Add Category"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleEdit(category)}>
                  <Pencil size={16} />
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(category.id)}>
                  <Trash size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesPage;