'use client'

import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Mon', Delivered: 12, Pending: 3 },
  { name: 'Tue', Delivered: 18, Pending: 2 },
  { name: 'Wed', Delivered: 10, Pending: 5 },
  { name: 'Thu', Delivered: 20, Pending: 1 },
  { name: 'Fri', Delivered: 15, Pending: 4 },
  { name: 'Sat', Delivered: 25, Pending: 0 },
]

const recentDeliveries = [
  { id: 'DEL-001', customer: 'John Doe', status: 'Delivered', time: '1 hour ago' },
  { id: 'DEL-002', customer: 'Jane Smith', status: 'Pending', time: '2 hours ago' },
  { id: 'DEL-003', customer: 'Alex Johnson', status: 'Delivered', time: 'Today' },
  { id: 'DEL-004', customer: 'Sarah Williams', status: 'Pending', time: 'Yesterday' },
]

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Delivery Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-500">Total Deliveries</h2>
          <p className="text-2xl font-bold">180</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-500">Pending</h2>
          <p className="text-2xl font-bold text-yellow-500">12</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">168</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-500">Canceled</h2>
          <p className="text-2xl font-bold text-red-600">3</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Delivery Performance (Weekly)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Delivered" fill="#10b981" />
            <Bar dataKey="Pending" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Deliveries Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Deliveries</h2>
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentDeliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">{delivery.id}</td>
                <td className="py-2 px-4">{delivery.customer}</td>
                <td className={`py-2 px-4 font-medium ${delivery.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {delivery.status}
                </td>
                <td className="py-2 px-4 text-sm text-gray-500">{delivery.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
