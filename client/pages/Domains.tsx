import { Suspense, lazy } from "react";
import NavBar from "@/components/NavBar";

// Lazy load the heavy AnimatedDomains component
const AnimatedDomains = lazy(() => import("@/components/AnimatedDomains"));

export default function Domains() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <div className="relative">
        <Suspense
          fallback={
            <div className="min-h-[80vh] flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading domains...</p>
              </div>
            </div>
          }
        >
          <AnimatedDomains />
        </Suspense>
      </div>
    </div>
  );
}
