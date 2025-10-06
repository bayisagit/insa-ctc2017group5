// src/app/store/[storeId]/users/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import StoreUsersClient  from "./_comp/page"
async function getUsers(storeId: string): Promise<any[]> {
  // Fetch from API or database instead of mock data
  // For now, using mock data for demo
  const mockUsers = [
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
    // ... more mock users
  ];

  return mockUsers;
}

export default async function StoreUsersPage({ params }: { params: Promise<{ storeId: string }> }) {
  const storeId = (await params).storeId;
  const users = await getUsers(storeId);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>Manage users for store #{storeId}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Pass initial data to the client component */}
          <StoreUsersClient storeId={storeId} initialUsers={users} />
        </CardContent>
      </Card>
    </div>
  );
}
