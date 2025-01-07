import { TotalWorkouts } from "@/components/statistics/components/TotalWorkouts";
import { TotalVolume } from "./components/TotalVolume";
import { Streak } from "@/components/statistics/components/Streak";
import { TopExercises } from "./components/TopExercises";
import { MuscleDistributionChart } from "./components/MuscleDistributionChart";
import { WorkoutsOverTime } from "./components/WorkoutsOverTime";

export default function Statistics() {
    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">
                Statistics
            </h1>
            <div className="pb-4">
                <WorkoutsOverTime />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pb-4">
                <Streak />
                <TotalWorkouts />
                <TotalVolume />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <MuscleDistributionChart />
                <TopExercises />
            </div>
        </div>
    );
}
