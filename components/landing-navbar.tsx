"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-36 mr-4 text-xl drop-shadow-2xl text-white font-bold">
          SESCO Trans
          {/* <Image fill alt="Logo" src="/logo2.png" /> */}
        </div>
        {/* <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          SESCO
        </h1> */}
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full bg-[#77AAFD] shadow-xl from-sky-100 to-sky-900">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}