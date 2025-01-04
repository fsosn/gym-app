import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Ellipsis, Pencil, Play, SquareX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutSummaryCards } from "@/components/workout/workout_details/WorkoutSummaryCards";
import { ExerciseList } from "@/components/exercise/ExerciseList";
import { fetchWorkout } from "@/services/workouts";
import { ExerciseRecord } from "@/types/exercise_types";
import { Workout } from "@/types/workout_types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FinishedWorkout() {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const [exercises, setExercises] = useState<ExerciseRecord[] | null>(null);
    const [title, setTitle] = useState<string>("");
    const [duration, setDuration] = useState<string>();
    const [totalSets, setTotalSets] = useState<number>(0);
    const [totalVolume, setTotalVolume] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workoutData: Workout = await fetchWorkout(workoutId!);
                setExercises(workoutData.exercises);
                setTitle(workoutData.title);
                setDuration(workoutData.time);
                setTotalVolume(workoutData.volume);
                setTotalSets(workoutData.total_sets);
            } catch (error) {
                console.error("Error fetching workout:", error);
            }
        };

        fetchData();
    }, [workoutId]);

    const handleGoBackButtonClick = () => {
        navigate("/history");
    };

    return (
        <div>
            <nav className="w-full flex items-center justify-between bg-white dark:bg-zinc-950 p-4 border-b border-zinc-700">
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleGoBackButtonClick}
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">
                    {title}
                </h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="text-blue-500">
                            <Play />
                            Resume
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Pencil />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                            <SquareX />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
            <div className="p-2">
                <WorkoutSummaryCards
                    duration={duration}
                    totalVolume={totalVolume}
                    completedSets={totalSets}
                />
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full sm:max-w-md md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto">
                    <ExerciseList
                        exercises={exercises}
                        isRoutine={false}
                        isFinishedWorkout={true}
                    />
                </div>
            </div>
        </div>
    );
}
