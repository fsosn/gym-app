import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExerciseSelection from "@/components/workout/exerciseSelection/ExerciseSelection";
import { WorkoutSummaryCards } from "@/components/workout/WorkoutSummaryCards.tsx";
import { ExerciseList } from "@/components/workout/ExerciseList.tsx";
import { AlertDialogDiscard } from "@/components/workout/AlertDialogDiscard.tsx";
import DialogSave from "@/components/workout/DialogSave.tsx";
import { useExerciseList } from "@/hooks/useExerciseList.tsx";
import { postWorkout } from "@/services/workouts";

export function WorkoutLog() {
    const [duration, setDuration] = useState(0);
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
        useState(false);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState<number | null>(() =>
        JSON.parse(localStorage.getItem("workoutStartTime") || "null")
    );
    const { exercises, updateExercise, deleteExercise, addExercises } =
        useExerciseList(JSON.parse(localStorage.getItem("workoutLog") || "[]"));
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
            await postWorkout(workoutData);
        } catch (error) {
            console.error("Error saving workout:", error);
            alert("Error saving workout.");
        }

        deleteCurrentWorkout();
        navigate("/");
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

    const toggleExerciseModal = () =>
        setShowExerciseSelectionModal((prev) => !prev);

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
                <DialogSave
                    title={title}
                    setTitle={setTitle}
                    handleSave={handleSaveWorkout}
                    buttonLabel="Finish"
                    dialogTitle="Finish Workout"
                    dialogDescription="Please add a title for your workout. Click save when
                        you're done."
                    isActive={completedSetsCount != 0}
                    isRoutine={false}
                    description={undefined}
                    setDescription={() => {}}
                />
            </nav>
            <div className="p-2">
                <WorkoutSummaryCards
                    duration={duration}
                    totalVolume={totalVolume}
                    completedSets={completedSetsCount}
                />
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full sm:max-w-md md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto">
                    <ExerciseList
                        exercises={exercises}
                        onExerciseChange={updateExercise}
                        onDelete={deleteExercise}
                        isWorkoutActive={true}
                    />
                    <div className="m-2 mt-2">
                        <Button
                            onClick={() => setShowExerciseSelectionModal(true)}
                            className="w-full"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            <span>Add Exercise</span>
                        </Button>
                        {showExerciseSelectionModal && (
                            <ExerciseSelection
                                onAddExercises={(newExercises) => {
                                    addExercises(newExercises);
                                    toggleExerciseModal();
                                }}
                                onCancel={toggleExerciseModal}
                            />
                        )}
                    </div>
                    <div className="m-2 mt-2 pb-6">
                        <AlertDialogDiscard
                            label="Discard Workout"
                            description="If you discard this workout, all unsaved
                                        changes will be lost."
                            onDiscard={handleDiscardWorkoutButtonClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
