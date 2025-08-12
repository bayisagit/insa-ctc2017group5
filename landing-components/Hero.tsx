"use client";
import { Button } from "./ui/button";
import React from "react";
import "@/app/globals.css"; // If needed for theme setup

export default function Hero() {
  return (
    <section className="relative h-138 w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 h-full w-full object-cover z-[-1]"
      >
        <source src="/videos/backgrounddisplay.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="flex flex-col justify-center items-center h-full text-center px-4 md:px-10">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-100 dark:text-white leading-tight">
            Your local restaurant with
            <br />
            convenient food delivery.
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto text-white dark:text-emerald-100">
            The food you want, where you want it. The best restaurants in town and the fastest delivery guys eagerly waiting to serve you!
            All with a click of a button.
          </p>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Button variant="default" size="lg">Share With</Button>
            <Button variant="secondary" size="lg">Get It</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
