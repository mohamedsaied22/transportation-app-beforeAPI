"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold ">
        <h1>Streamline Your Logistics Operations with SESCO Trans app</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fffff] via-[#779dfd] to-[#bfd3f5] h-[100px]">
          <TypewriterComponent
            options={{
              strings: [
                "Booking Made Easy.",
                "Contractor Management.",
                "Vessel Management.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
      Get Started with SESCO Trans ERP Today.
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="premium" className=" text-sky-100 md:text-lg p-4 md:p-6 rounded-full font-semibold shadow-xl from-sky-300 to-sky-900 ">
          Sign In Now
          </Button>
        </Link>
      </div>
    
    </div>
  );
};