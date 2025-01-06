import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExerciseSelection from "@/components/exercise/exerciseSelection/ExerciseSelection";
import { WorkoutSummaryCards } from "@/components/workout/workout_details/WorkoutSummaryCards";
import { ExerciseList } from "@/components/exercise/ExerciseList";
import { AlertDialogDiscard } from "@/components/workout/AlertDialogDiscard.tsx";
import DialogSave from "@/components/workout/DialogSave.tsx";
import { useExerciseList } from "@/hooks/useExerciseList";
import { useToast } from "@/hooks/use-toast";
import { useWorkoutLogUtils } from "@/hooks/useWorkoutLogUtils";
import { ExerciseRecord, Set } from "@/types/exercise_types";
import { Workout } from "@/types/workout_types";
import { patchWorkout, postWorkout } from "@/services/workouts";
import { formatDuration } from "@/utils/time_utils";

export function WorkoutLog() {
    const [isEditMode, setIsEditMode] = useState<boolean | null>(null);
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
        useState(false);
    const [title, setTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [finishedWorkout, setFinishedWorkout] = useState<Workout>();
    const {
        exercises,
        updateExercise,
        deleteExercise,
        addExercises,
        initExerciseList,
        moveExerciseUp,
        moveExerciseDown,
    } = useExerciseList([]);
    const { duration, totalVolume, completedSetsCount } = useWorkoutLogUtils(
        startTime,
        exercises
    );
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.edit && location.state?.workout) {
            setIsEditMode(true);
            const workout = location.state?.workout;
            setFinishedWorkout(workout);
            setTitle(workout.title);
            setStartTime(Date.now() - workout.time * 1000);
            initExerciseList(
                workout.exercises.map((exercise: ExerciseRecord) => ({
                    ...exercise,
                    sets: exercise.sets.map((set) => ({
                        ...set,
                        completed: true,
                    })),
                }))
            );
        } else {
            setIsEditMode(false);
            const storedStartTime =
                JSON.parse(
                    localStorage.getItem("workoutStartTime") || "null"
                ) || Date.now();
            const storedExercises = JSON.parse(
                localStorage.getItem("workoutLog") || "[]"
            );
            setStartTime(storedStartTime);
            initExerciseList(storedExercises);
        }
    }, []);

    useEffect(() => {
        if (!isEditMode && startTime !== null) {
            localStorage.setItem("workoutStartTime", JSON.stringify(startTime));
        }
    }, [startTime]);

    useEffect(() => {
        if (!isEditMode && exercises.length > 0) {
            const workoutData = { title, exercises };

            localStorage.setItem(
                "workoutLog",
                JSON.stringify(workoutData.exercises)
            );
        }
    }, [exercises, title]);

    const handleSaveWorkout = async () => {
        if (!title || !exercises || exercises.length === 0) {
            toast({
                title: "Incomplete Form",
                description:
                    "Please provide a title and add at least one exercise.",
            });
            return;
        }

        if (
            exercises.some((exercise) =>
                exercise.sets.some((set: Set) => !set.completed)
            )
        ) {
            toast({
                title: "You still have some incomplete sets in your workout",
                description:
                    "Please check your logged exercises and make sure all sets are completed.",
            });
            return;
        }

        try {
            if (isEditMode && finishedWorkout) {
                await patchWorkout(finishedWorkout.id, {
                    title: title,
                    begin_datetime: finishedWorkout?.begin_datetime,
                    time: duration,
                    exercises: exercises,
                });
            } else {
                await postWorkout({
                    title: title,
                    begin_datetime: new Date(startTime!).toISOString(),
                    time: duration,
                    exercises: exercises,
                });
            }
        } catch (error) {
            console.error("Error saving workout:", error);
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "There was a problem while saving your workout.",
            });
            return;
        }

        if (!isEditMode) {
            deleteCurrentWorkout();
        }

        navigate("/history");
    };

    const deleteCurrentWorkout = () => {
        localStorage.removeItem("workoutLog");
        localStorage.removeItem("workoutStartTime");
    };

    const handleGoBackButtonClick = () => {
        if (!isEditMode && (!exercises || exercises.length === 0)) {
            deleteCurrentWorkout();
        }
        if (isEditMode) {
            navigate("/history");
        } else {
            navigate("/workout");
        }
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
                    {isEditMode ? title : "Workout Log"}
                </h1>
                <DialogSave
                    title={title}
                    setTitle={setTitle}
                    handleSave={handleSaveWorkout}
                    buttonLabel={isEditMode ? "Update" : "Finish"}
                    dialogTitle={
                        isEditMode ? "Update Workout" : "Finish Workout"
                    }
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
                    duration={formatDuration(duration)}
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
                        onMoveExerciseUp={moveExerciseUp}
                        onMoveExerciseDown={moveExerciseDown}
                        isRoutine={false}
                        isFinishedWorkout={false}
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
                    {!isEditMode && (
                        <div className="m-2 mt-2 pb-6">
                            <AlertDialogDiscard
                                label="Discard Workout"
                                description="If you discard this workout, all unsaved
                                        changes will be lost."
                                onDiscard={handleDiscardWorkoutButtonClick}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
