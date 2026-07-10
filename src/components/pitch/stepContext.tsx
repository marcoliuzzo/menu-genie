import { createContext, useContext } from "react";

type Ctx = { step: number; totalSteps: number };
const StepCtx = createContext<Ctx>({ step: 0, totalSteps: 1 });

export const StepProvider = StepCtx.Provider;
export const useStep = () => useContext(StepCtx);
