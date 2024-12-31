"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarRange, Route, DollarSign, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    icon: CalendarRange,
    title: "Intelligent Scheduling",
    description: "quick explanation lkjasfd kajhsdfklhjhalfkdjhasef kajhsdfkjhasdfkjhasdkfh"
  },
  {
    icon: Route,
    title: "Optimized Routing",
    description: "quick explanation lkjasfd kajhsdfklhjhalfkdjhasef kajhsdfkjhasdfkjhasdkfh"
  },
  {
    icon: DollarSign,
    title: "Beta Pricing",
    description: "quick explanation lkjasfd kajhsdfklhjhalfkdjhasef kajhsdfkjhasdfkjhasdkfh"
  },
  {
    icon: Sparkles,
    title: "Feature Releases",
    description: "quick explanation lkjasfd kajhsdfklhjhalfkdjhasef kajhsdfkjhasdfkjhasdkfh"
  }
];

export function DashboardSplash() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80"
        >
          <div className="relative w-full max-w-[690px]">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                background: 'radial-gradient(79.61% 56.85% at 79.2% 18.12%, rgba(192, 235, 253, 0.80) 0%, rgba(255, 255, 255, 0.80) 100%), radial-gradient(108.83% 82.49% at 2.46% 98.91%, #F43F5E 37.51%, #FFF 100%)'
              }}
            >
              <div className="px-4 sm:px-12 py-12">
                <div className="text-center mb-8">
                  <h2 className="text-[28px] sm:text-[36px] font-bold text-[#2E1065] mb-2 leading-none font-sans">
                    Welcome to Veer!
                  </h2>
                  <p className="text-[#475569] font-sans">
                    We're so glad you're here.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 mx-auto max-w-[504px]">
                  {features.map((feature) => (
                    <div
                      key={feature.title}
                      className={cn(
                        "mx-auto w-[240px] min-h-[135px] p-4 rounded-xl",
                        "bg-gradient-to-br from-white/70 to-white/50",
                        "border border-white",
                        "shadow-[0px_20px_40px_rgba(0,0,0,0.10)]",
                        "backdrop-blur-[25px]",
                        "flex flex-col items-center text-center"
                      )}
                    >
                      <div className="w-6 h-6 mb-3 text-[#2E1065] shrink-0">
                        <feature.icon className="w-full h-full" />
                      </div>
                      <h3 className="text-xs font-semibold mb-1 text-[#2E1065] line-clamp-1 font-sans">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-[#475569] line-clamp-3 font-sans">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#2E1065] text-white hover:bg-[#2E1065]/90 px-8 font-sans"
                    size="lg"
                  >
                    Let's go!
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 