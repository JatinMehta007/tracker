"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils"; 

export const WobbleCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {

  return (
   
      <div
        className=" bg  [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  "
      >
        <motion.div
          className={cn("", className)}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
  );
};

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  );
};