"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function RestaurantInfoCard() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  // Dummy restaurant data
  const restaurant = {
    name: "Fresh Groceries",
    description:
      "Fresh Groceries is a locally-owned food store in the heart of Addis Ababa, dedicated to providing fresh, organic, and high-quality produce. We source our fruits and vegetables directly from trusted local farms to ensure the highest freshness and taste.",
    openingHours: [
      { day: "Monday - Friday", time: "8:00 AM – 8:00 PM" },
      { day: "Saturday", time: "9:00 AM – 6:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    contact: { phone: "+251 900 123 456", email: "info@freshgroceries.com" },
    specialties: ["Organic fruits and vegetables", "Healthy snacks and beverages", "Seasonal offers and combo packs"],
    location: { lat: 9.0108, lng: 38.7613, address: "Bole, Addis Ababa, Ethiopia" },
    reviews: [
      { user: "Sarah M.", text: "The quality of their apples is unmatched – fresh, juicy, and perfectly sweet!" },
      { user: "Daniel T.", text: "Great service and friendly staff. I always get my weekly groceries here." },
    ],
  };

  // Initialize map
  useEffect(() => {
    if (mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json",
        center: [restaurant.location.lng, restaurant.location.lat],
        zoom: 14,
      });

      new maplibregl.Marker({ color: "red" })
        .setLngLat([restaurant.location.lng, restaurant.location.lat])
        .addTo(map);
    }
  }, []);

  return (
    <Card className="mt-8">
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold">{restaurant.name}</h2>
        <p className="text-gray-600">{restaurant.description}</p>

        <Separator />

        <div>
          <h3 className="font-semibold">Opening Hours</h3>
          <ul className="text-gray-600">
            {restaurant.openingHours.map((item) => (
              <li key={item.day}>
                {item.day}: {item.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <p className="text-gray-600">Phone: {restaurant.contact.phone}</p>
          <p className="text-gray-600">Email: {restaurant.contact.email}</p>
        </div>

        <div>
          <h3 className="font-semibold">Specialties</h3>
          <ul className="list-disc list-inside text-gray-600">
            {restaurant.specialties.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Customer Reviews</h3>
          <ul className="space-y-2 text-gray-600">
            {restaurant.reviews.map((review, index) => (
              <li key={index}>
                <span className="font-medium">{review.user}:</span> {review.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <div ref={mapContainer} className="w-full h-64 rounded-lg border" />
          <p className="mt-2 text-gray-600">{restaurant.location.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
