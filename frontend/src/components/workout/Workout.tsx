import { Button } from "@/components/ui/button";
import RoutineCard from "./routine/RoutineCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Play, Plus } from "lucide-react";
import { fetchRoutine, fetchRoutines } from "@/services/routines.tsx";
import { Routine } from "@/types/routine_types.tsx";

export default function Workout() {
    const [hasOngoingWorkout, setHasOngoingWorkout] = useState(false);
    const [routineList, setRoutineList] = useState<Routine[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const workoutData = localStorage.getItem("workoutLog");
        setHasOngoingWorkout(!!workoutData);
    });

    useEffect(() => {
        const getRoutines = async () => {
            try {
                const routines = await fetchRoutines();
                setRoutineList(routines);
            } catch (error) {
                console.error(error);
            }
        };

        getRoutines();
    }, []);

    const handleStartOrResumeWorkoutButtonClick = () => {
        navigate("/workout-log");
    };

    const handleCreateRoutineButtonClick = () => {
        navigate("/create-routine");
    };

    const handleStartRoutineButtonClick = async (routineId: number) => {
        try {
            const routine = await fetchRoutine(routineId);
            localStorage.removeItem("workoutStartTime");
            localStorage.setItem(
                "workoutLog",
                JSON.stringify(routine.exercises)
            );
            navigate("/workout-log");
        } catch (error) {
            console.error(
                `Failed to start routine with id ${routineId}:`,
                error
            );
        }
    };

    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">Workout</h1>
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
                    <Button
                        className={`inline-flex items-center space-x-2 ${
                            hasOngoingWorkout ? "bg-blue-700 text-white" : ""
                        }`}
                        onClick={handleStartOrResumeWorkoutButtonClick}
                    >
                        {hasOngoingWorkout ? (
                            <div className="flex items-center space-x-2">
                                <Play className="w-4 h-4" />
                                <span>Resume Workout Session</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Plus className="w-4 h-4" />
                                <span>Start Empty Workout</span>
                            </div>
                        )}
                    </Button>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Routines</h2>
                    <Button
                        className="mb-4"
                        onClick={handleCreateRoutineButtonClick}
                    >
                        <div className="flex items-center space-x-2">
                            <Plus className="w-4 h-4" />
                            <span>Create routine</span>
                        </div>
                    </Button>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {routineList.map((routine) => (
                            <RoutineCard
                                key={routine.id}
                                title={routine.title}
                                description={routine.description}
                                onStart={() =>
                                    handleStartRoutineButtonClick(routine.id)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
