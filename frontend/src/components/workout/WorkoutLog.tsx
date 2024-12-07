import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/plusIcon";
import { TrashIcon } from "@/components/ui/trashIcon";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import ExerciseSelection from "@/components/workout/exerciseSelection/ExerciseSelection";
import { ExerciseRecord } from "@/types/types.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_ENDPOINTS } from "../../config.tsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Exercise {
    title: string;
    sets: Set[];
    id: number;
}

interface Set {
    weight: string;
    reps: string;
    completed: boolean;
    selected: boolean;
}

export function WorkoutLog() {
    const [duration, setDuration] = useState(0);
    const [exercises, setExercises] = useState<Exercise[] | null>(() =>
        JSON.parse(localStorage.getItem("workoutLog") || "null")
    );
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
        useState(false);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState<number | null>(() =>
        JSON.parse(localStorage.getItem("workoutStartTime") || "null")
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (!startTime) {
            const now = Date.now();
            setStartTime(now);
            localStorage.setItem("workoutStartTime", JSON.stringify(now));
        } else {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            setDuration(elapsed);
        }
    }, [startTime]);

    useEffect(() => {
        const workoutData = {
            title,
            exercises,
        };
        localStorage.setItem(
            "workoutLog",
            JSON.stringify(workoutData.exercises)
        );
    }, [exercises, title]);

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration((prevDuration) => prevDuration + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const totalVolume =
        exercises?.reduce((acc, exercise) => {
            return (
                acc +
                exercise.sets
                    .filter((set) => set.completed)
                    .reduce((setAcc, curr) => {
                        if (
                            !Number.isNaN(parseInt(curr.weight)) &&
                            !Number.isNaN(parseInt(curr.reps))
                        ) {
                            return (
                                setAcc +
                                parseInt(curr.weight) * parseInt(curr.reps)
                            );
                        } else {
                            return setAcc;
                        }
                    }, 0)
            );
        }, 0) || 0;

    const completedSetsCount =
        exercises?.reduce((acc, exercise) => {
            return acc + exercise.sets.filter((set) => set.completed).length;
        }, 0) || 0;

    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        } else {
            return `${String(minutes).padStart(2, "0")}:${String(
                seconds
            ).padStart(2, "0")}`;
        }
    };

    const handleExerciseChange = (index: number, newSets: Set[]) => {
        if (!exercises) return;
        const newExercises = [...exercises];
        newExercises[index].sets = newSets;
        setExercises(newExercises);
    };

    const handleDeleteExercise = (index: number) => {
        if (!exercises) return;
        const newExercises = exercises.filter((_, i) => i !== index);
        setExercises(newExercises);
    };

    const handleAddExercisesToLog = (selectedExercises: ExerciseRecord[]) => {
        const newExercises = [
            ...(exercises || []),
            ...selectedExercises.map((exercise) => ({
                title: exercise.title,
                id: exercise.id,
                sets: [
                    { weight: "", reps: "", completed: false, selected: false },
                ],
            })),
        ];
        setExercises(newExercises);
        setShowExerciseSelectionModal(false);
    };

    const handleSaveWorkout = async () => {
        if (!title || !exercises || exercises.length === 0) {
            alert("Please provide a title and add at least one exercise.");
            return;
        }

        const workoutData = {
            title,
            begin_datetime: new Date().toISOString(),
            time: formatDuration(duration),
            exercises: exercises.map((exercise) => ({
                exercise_id: exercise.id,
                sets: exercise.sets.map((set) => ({
                    reps: parseInt(set.reps) || 0,
                    weight: parseFloat(set.weight) || 0,
                    distance: 0,
                    duration: "00:00",
                })),
            })),
        };

        try {
            axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.WORKOUTS}`,
                workoutData
            );
        } catch (error) {
            console.error("Error saving workout:", error);
            alert("Error saving workout.");
        }
    };

    const deleteCurrentWorkout = () => {
        localStorage.removeItem("workoutLog");
        localStorage.removeItem("workoutStartTime");
    };

    const handleGoBackButtonClick = () => {
        if (!exercises || exercises.length === 0) {
            deleteCurrentWorkout();
        }
        navigate("/");
    };

    const handleDiscardWorkoutButtonClick = () => {
        deleteCurrentWorkout();
        navigate("/");
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
                    Workout Log
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button disabled={completedSetsCount === 0}>
                            Finish
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Finish Workout</DialogTitle>
                            <DialogDescription>
                                Please add a title for your workout. Click save
                                when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    className="col-span-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" onClick={handleSaveWorkout}>
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </nav>
            <div className="p-2">
                <div className="grid grid-cols-3 gap-4">
                    <div className="border border-zinc-700 rounded-lg p-2">
                        <div>
                            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 m-2">
                                Duration
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-zinc-900 dark:text-zinc-100 m-2">
                                {formatDuration(duration)}
                            </span>
                        </div>
                    </div>
                    <div className="border border-zinc-700 rounded-lg p-2">
                        <div>
                            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 m-2">
                                Volume
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-zinc-900 dark:text-zinc-100 m-2">
                                {totalVolume} kg
                            </span>
                        </div>
                    </div>
                    <div className="border border-zinc-700 rounded-lg p-2">
                        <div>
                            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 m-2">
                                Sets
                            </span>
                        </div>
                        <div>
                            <span className="text-sm text-zinc-900 dark:text-zinc-100 m-2">
                                {completedSetsCount}
                            </span>
                        </div>
                    </div>
                </div>
                <div />
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full sm:max-w-md md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto">
                    {exercises &&
                        exercises.length > 0 &&
                        exercises.map((exercise, index) => (
                            <ExerciseCard
                                key={index}
                                exerciseName={exercise.title}
                                sets={exercise.sets}
                                onSetsChange={(newSets) =>
                                    handleExerciseChange(index, newSets)
                                }
                                onDelete={() => handleDeleteExercise(index)}
                            />
                        ))}
                    <div className="m-2 mt-2">
                        <Button
                            onClick={() => setShowExerciseSelectionModal(true)}
                            className="w-full"
                        >
                            <PlusIcon className="w-4 h-4 mr-1" />
                            <span>Add Exercise</span>
                        </Button>
                        {showExerciseSelectionModal && (
                            <ExerciseSelection
                                onAddExercises={handleAddExercisesToLog}
                                onCancel={() =>
                                    setShowExerciseSelectionModal(false)
                                }
                            />
                        )}
                    </div>
                    <div className="m-2 mt-2 pb-6">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive hover:text-destructive border-red-900"
                                >
                                    <TrashIcon className="w-4 h-4 mr-1" />
                                    <span>Discard Workout</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        If you discard this workout, all unsaved
                                        changes will be lost.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Go Back
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-red-800 text-white border-red-900 hover:bg-red-700"
                                        onClick={
                                            handleDiscardWorkoutButtonClick
                                        }
                                    >
                                        Discard Workout
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
