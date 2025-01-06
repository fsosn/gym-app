import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Workout } from "@/types/workout_types";
import { fetchWorkouts } from "@/services/workouts";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutHistory() {
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const workouts = await fetchWorkouts();
                setWorkoutList(workouts);
            } catch (error) {
                console.error(error);
            }
        };

        getWorkouts();
    }, []);

    const handleWorkoutCardClick = (workoutId: number) => {
        navigate(`/workout/${workoutId}`);
    };

    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">History</h1>
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Your workout history
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {workoutList.map((workout) => (
                            <WorkoutCard
                                key={workout.id}
                                title={workout.title}
                                beginDatetime={workout.begin_datetime}
                                duration={workout.time}
                                totalVolume={workout.volume}
                                totalExercises={workout.exercises.length}
                                totalSets={workout.total_sets}
                                onWorkoutCardClick={() =>
                                    handleWorkoutCardClick(workout.id)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
