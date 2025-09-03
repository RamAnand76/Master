
"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type LoadingState = {
  text: string;
  icon: React.ReactNode;
};

const LoaderCore = ({
  loadingStates,
  currentState,
}: {
  loadingStates: LoadingState[];
  currentState: number;
}) => {
  return (
    <div className="flex flex-col relative">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-[12px] bottom-[12px] w-0.5 bg-border -z-10">
         <motion.div 
            className="w-full bg-primary"
            initial={{ height: "0%" }}
            animate={{ height: `${(currentState / (loadingStates.length - 1)) * 100}%`}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
         />
      </div>

      {loadingStates.map((state, index) => {
        const isCompleted = index < currentState;
        const isActive = index === currentState;

        return (
          <motion.div
            key={index}
            className="flex items-center gap-4 my-2"
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div 
                className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-background transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-muted-foreground/50 border-2 border-background",
                    isActive && "bg-primary ring-4 ring-primary/30"
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {isCompleted ? <CheckCircle2 size={16} /> : state.icon}
            </motion.div>
            <span
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {state.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  currentState,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  currentState: number;
}) => {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-lg"
        >
          <div className="w-full max-w-md p-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Preparing Your Workspace</h2>
            <LoaderCore currentState={currentState} loadingStates={loadingStates} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
