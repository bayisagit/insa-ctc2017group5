"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Clock } from "lucide-react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { map } from "better-auth";

// Mock data types
type OrderStatus = "PLACED" | "EN_ROUTE" | "DELIVERED";

type OrderTrackingData = {
  orderId: string;
  status: OrderStatus;
  courier: {
    coord: [number, number];
    bearing?: number;
  };
  destination: {
    coord: [number, number];
    name: string;
  };
  eta: string;
};

// Mock data generator
function generateMockData(orderId: string): OrderTrackingData {
  // Default coordinates (Addis Ababa area)
  const start: [number, number] = [38.7613, 9.0108];
  const end: [number, number] = [38.7800, 8.9800];
  
  // Move courier position based on orderId hash for variety
  const hash = orderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const progress = Math.min(0.9, (hash % 30) / 30); // 0-90% progress
  
  const courierPos: [number, number] = [
    start[0] + (end[0] - start[0]) * progress,
    start[1] + (end[1] - start[1]) * progress
  ];
  
  return {
    orderId,
    status: progress > 0.8 ? "DELIVERED" : "EN_ROUTE",
    courier: {
      coord: courierPos,
      bearing: hash % 360
    },
    destination: {
      coord: end,
      name: "Customer Location"
    },
    eta: `${Math.round((1 - progress) * 30)} min`
  };
}
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState<OrderTrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const courierMarker = useRef<maplibregl.Marker | null>(null);
  const destMarker = useRef<maplibregl.Marker | null>(null);
  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapRef.current,
      style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${apiKey}`, // Free demo style
      center: [38.7613, 9.0108], // Addis Ababa
      zoom: 12
    });

    // Add navigation controls
    mapInstance.current.addControl(new maplibregl.NavigationControl());
    mapInstance.current.addControl(new maplibregl.FullscreenControl());
    mapInstance.current.addControl(new maplibregl.ScaleControl());
    // mapInstance.current.addControl(new maplibregl.AttributionControl());
    mapInstance.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
  
  

    mapInstance.current.on('load',()=>{
      mapInstance.current?.flyTo({
        center: [38.7613, 9.0108],
        zoom: 14,
        speed: 1.2,
        curve: 1.5,
        essential: true,
      });
    });

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update map with tracking data
  useEffect(() => {
    if (!tracking || !mapInstance.current) return;

    // Clear existing markers
    if (courierMarker.current) courierMarker.current.remove();
    if (destMarker.current) destMarker.current.remove();

    // Add courier marker with bearing
    const courierEl = document.createElement('div');
    courierEl.className = 'courier-marker';
    courierEl.style.width = '16px';
    courierEl.style.height = '16px';
    courierEl.style.backgroundColor = '#3b82f6';
    courierEl.style.borderRadius = '50%';
    courierEl.style.border = '2px solid white';
    if (tracking.courier.bearing) {
      courierEl.style.transform = `rotate(${tracking.courier.bearing}deg)`;
    }

    courierMarker.current = new maplibregl.Marker({
      element: courierEl,
      rotationAlignment: 'map'
    })
      .setLngLat(tracking.courier.coord)
      .addTo(mapInstance.current);

    // Add destination marker
    const destEl = document.createElement('div');
    destEl.className = 'dest-marker';
    destEl.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `;

    destMarker.current = new maplibregl.Marker({
      element: destEl,
      anchor: 'bottom'
    })
      .setLngLat(tracking.destination.coord)
      .addTo(mapInstance.current);

    // Fit map to show both markers
    const bounds = new maplibregl.LngLatBounds(
      tracking.courier.coord,
      tracking.destination.coord
    );
    mapInstance.current.fitBounds(bounds, {
      padding: 100,
      maxZoom: 14
    });

  }, [tracking]);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Generate mock data based on order ID
        const mockData = generateMockData(orderId);
        setTracking(mockData);
      } catch (err) {
        setError("Failed to track order. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  const statusBadge = tracking?.status === "DELIVERED" 
    ? <Badge className="bg-green-600">Delivered</Badge>
    : tracking?.status === "EN_ROUTE" 
      ? <Badge className="bg-blue-600">On the way</Badge>
      : <Badge className="bg-yellow-600">Processing</Badge>;

  return (
    <div className="w-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Track Your Delivery</CardTitle>
          <CardDescription>
            Enter your order ID to see real-time delivery tracking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleTrackOrder} className="flex gap-2">
            <Input
              placeholder="Enter your Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tracking...
                </>
              ) : (
                "Track"
              )}
            </Button>
          </form>

          {tracking && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{tracking.destination.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Estimated arrival</p>
                  <p className="font-medium">{tracking.eta}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Status</p>
                {statusBadge}
              </div>
            </div>
          )}

          <div className="h-[400px] rounded-md overflow-hidden border">
            <div ref={mapRef} className="w-full h-full" />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}