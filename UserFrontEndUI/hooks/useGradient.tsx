// hooks/useGradient.ts
import { useEffect } from "react";
import { gradient } from "@/components/Animation/Gradient";

export function useGradient() {
  useEffect(() => {
    gradient.initGradient("#gradient-canvas");
  }, []);
}
