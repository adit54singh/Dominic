import { useState, useEffect, useMemo } from "react";
import ProfileCard, { generateSampleProfiles } from "./ProfileCard";

export default function RotatingProfileCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const profiles = useMemo(() => generateSampleProfiles(), []);
  const visibleCards = 3; // Number of cards to show at once

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % (profiles.length - visibleCards + 1)
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [profiles.length]);

  const visibleProfiles = useMemo(() => {
    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % profiles.length;
      visible.push(profiles[index]);
    }
    return visible;
  }, [currentIndex, profiles, visibleCards]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-6 transition-transform duration-1000 ease-in-out">
        {visibleProfiles.map((profile, index) => (
          <div 
            key={`${profile.id}-${currentIndex}-${index}`}
            className="flex-shrink-0"
          >
            <ProfileCard 
              profile={profile} 
              className="transform transition-all duration-1000 hover:scale-105"
            />
          </div>
        ))}
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: profiles.length - visibleCards + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
