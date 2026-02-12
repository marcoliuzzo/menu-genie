import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile, MealPlanResult } from "@/types";

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  mealPlan: MealPlanResult | null;
  setMealPlan: (plan: MealPlanResult | null) => void;
}

const defaultProfile: UserProfile = {
  diet: "",
  allergies: [],
  goals: [],
  budget: 60,
  cookingTime: "30",
  pantry: [],
  energy: 7,
  mood: "",
  equipment: ["fornelli"],
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [mealPlan, setMealPlan] = useState<MealPlanResult | null>(null);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, mealPlan, setMealPlan }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
