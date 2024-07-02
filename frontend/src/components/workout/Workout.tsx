import { PlusIcon } from "@/components/ui/plusIcon";
import { Button } from "@/components/ui/button";
import WorkoutCard from "./WorkoutCard";

export default function Workout() {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Workout</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
          <Button className="inline-flex items-center space-x-2">
            <PlusIcon className="w-4 h-4" />
            <span>Start Empty Workout</span>
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Saved Workouts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <WorkoutCard
              title="Full Body Workout"
              description="A comprehensive workout targeting all major muscle groups."
            />
            <WorkoutCard
              title="Cardio Blast"
              description="High-intensity cardio workout to get your heart pumping."
            />
            <WorkoutCard
              title="Strength Training"
              description="Build muscle and increase your overall strength."
            />
            <WorkoutCard
              title="Yoga Flow"
              description="Improve flexibility and mindfulness with this yoga routine."
            />
            <WorkoutCard
              title="HIIT Workout"
              description="High-intensity interval training to burn calories fast."
            />
            <WorkoutCard
              title="Pilates Core"
              description="Strengthen your core and improve your posture."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
