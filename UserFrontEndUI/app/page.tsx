import { Suspense } from "react";
import HomeContent from "@/components/HomeContent";
import GradientCanvas from "@/components/GradientCanvas";
import BackgroundNoise from "@/components/BackgroundNoise";

export default function Home() {
  return (
    <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-[#1E2B3A] font-inter overflow-hidden">
      <BackgroundNoise />
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
      <GradientCanvas />
    </div>
  );
}
