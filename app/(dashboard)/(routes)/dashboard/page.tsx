"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRightFromCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { tools } from "@/constants";

export default function HomePage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card

  return (
    <div className="h-[90vh]">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-sky-400 drop-shadow-lg">
          Explore the power of SESCO
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center drop-shadow-md">
          Enjoy some of the services that are at your service
        </p>
      </div>
      <div className="mb-12 px-4 md:px-20 lg:px-32 space-y-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className={`p-4 border-black/5 flex items-center mt-4 justify-between shadow-md hover:shadow-xl transition cursor-pointer rounded-2xl ${
              hoveredCard === tool.href ? " scale-105 md:scale-110" : ""
            } ${index === tools.length - 1 ? "sm:mb-8 md:mb-0" : ""}`} // Add a bottom margin to the last card on small screens
            style={{ height: "120px" }}
            onMouseEnter={() => setHoveredCard(tool.href)} // Set the hovered card
            onMouseLeave={() => setHoveredCard(null)} // Reset the hovered card
          >
            <div className={cn("p-2 w-fit rounded-md", tool.color)}>
              <tool.icon
                className={cn(
                  "w-10 h-10 transition drop-shadow-md",
                  tool.color,
                  hoveredCard === tool.href ? "scale-150 shadow-sm  transition-all duration-300" : ""
                )}
              />
            </div>
            <div className="font-semibold text-lg md:text-xl lg:text-xl drop-shadow-lg">{tool.label}</div>

            <ArrowUpRightFromCircle
              className={`w-5 h-5 opacity-50 ${
                hoveredCard === tool.href ? " rotate-45 transition-all scale-125 opacity-90" : ""
              }`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}