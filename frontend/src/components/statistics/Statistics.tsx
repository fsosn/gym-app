import { TotalWorkouts } from "@/components/statistics/components/TotalWorkouts";
import { TotalVolume } from "./components/TotalVolume";
import { Streak } from "@/components/statistics/components/Streak";
import { TopExercises } from "./components/TopExercises";
import { MuscleDistributionChart } from "./components/MuscleDistributionChart";
import { WorkoutsOverTime } from "./components/WorkoutsOverTime";

export default function Statistics() {
    return (
        <div>
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
