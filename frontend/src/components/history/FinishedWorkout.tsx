import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Ellipsis, Pencil, Repeat2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutSummaryCards } from "@/components/workout/workout_details/WorkoutSummaryCards";
import { ExerciseList } from "@/components/exercise/ExerciseList";
import { deleteWorkout, fetchWorkout } from "@/services/workouts";
import { ExerciseRecord } from "@/types/exercise_types";
import { Workout } from "@/types/workout_types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { formatDuration } from "@/utils/time_utils";

export function FinishedWorkout() {
    const { workoutId } = useParams();
    const navigate = useNavigate();
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<ExerciseRecord[] | null>(null);
    const [title, setTitle] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [totalSets, setTotalSets] = useState<number>(0);
    const [totalVolume, setTotalVolume] = useState<number>(0);
    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const workoutData: Workout = await fetchWorkout(workoutId!);
                setWorkout(workoutData);
                setExercises(workoutData.exercises);
                setTitle(workoutData.title);
                setDuration(workoutData.time);
                setTotalVolume(workoutData.volume);
                setTotalSets(workoutData.total_sets);
            } catch (error) {
                console.error("Error fetching workout:", error);
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description:
                        "There was a problem while fetching your workout.",
                });
                navigate("/history");
            }
        };

        fetchData();
    }, [workoutId]);

    const handleRepeatWorkoutButtonClick = async () => {
        if (!!localStorage.getItem("workoutLog")) {
            toast({
                title: "Workout In Progress",
                description:
                    "You already have an ongoing workout. Please complete it before starting a new one.",
            });
            return;
        }

        localStorage.setItem("workoutLog", JSON.stringify(exercises));
        navigate("/workout-log");
        toast({
            description: "Workout repeated succesfully.",
        });
    };

    const handleEditWorkoutButtonClick = async () => {
        navigate("/workout-log", { state: { edit: true, workout: workout } });
    };

    const handleDeleteWorkoutButtonClick = async () => {
        try {
            await deleteWorkout(workoutId!);
            navigate("/history");
        } catch (error) {
            console.error(
                `Error while deleting workout with id ${workoutId}:`,
                error
            );
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description:
                    "There was a problem while deleting your workout. Please try again.",
            });
        }
    };

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
                        <DropdownMenuItem
                            onClick={handleRepeatWorkoutButtonClick}
                        >
                            <Repeat2 />
                            Repeat
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleEditWorkoutButtonClick}
                        >
                            <Pencil />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={handleDeleteWorkoutButtonClick}
                        >
                            <X />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
            <div className="p-2">
                <WorkoutSummaryCards
                    duration={formatDuration(duration)}
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
