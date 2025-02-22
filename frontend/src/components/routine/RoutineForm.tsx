import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createRoutine,
    deleteRoutine,
    fetchRoutine,
    updateRoutine,
} from "@/services/routines";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExerciseList } from "@/components/exercise/ExerciseList";
import ExerciseSelection from "@/components/exercise/exerciseSelection/ExerciseSelection";
import { AlertDialogDiscard } from "@/components/workout/AlertDialogDiscard";
import DialogSave from "@/components/workout/DialogSave";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useExerciseList } from "@/hooks/useExerciseList";
import { useToast } from "@/hooks/use-toast";

export function RoutineForm() {
    const { routineId } = useParams();
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [displayedTitle, setDisplayedTitle] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const {
        exercises,
        updateExercise,
        deleteExercise,
        addExercises,
        initExerciseList,
        moveExerciseUp,
        moveExerciseDown,
    } = useExerciseList();
    const { toast } = useToast();

    useEffect(() => {
        if (routineId) {
            setIsUpdateMode(true);
            fetchRoutine(routineId).then((routine) => {
                setDisplayedTitle(routine.title);
                setTitle(routine.title);
                setDescription(routine.description);
                initExerciseList(routine.exercises);
            });
        }
        setIsLoading(false);
    }, [routineId]);

    const handleCreateOrUpdateButtonClick = async () => {
        if (!title || !exercises || exercises.length === 0) {
            toast({
                title: "Incomplete Form",
                description:
                    "Please provide a title and add at least one exercise.",
            });
            return;
        }

        if (title.length > 50) {
            toast({
                title: "Title is too long",
                description: "Title should contain maximum 50 characters.",
            });
            return;
        }

        if (description.length > 255) {
            toast({
                title: "Description is too long",
                description:
                    "Description should contain maximum 255 characters.",
            });
            return;
        }

        const routineData = {
            title,
            description,
            exercises,
        };

        try {
            if (isUpdateMode) {
                await updateRoutine(routineId!, routineData);
            } else {
                await createRoutine(routineData);
            }
            navigate("/");
        } catch (error) {
            console.error("Error while modifying routine:", error);
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "There was a problem while updating your routine.",
            });
        }
    };

    const handleDeleteRoutineButtonClick = async () => {
        try {
            await deleteRoutine(routineId!);
            navigate("/");
        } catch (error) {
            console.error("Error while deleting routine:", error);
            toast({
                variant: "destructive",
                title: "Something went wrong.",
                description: "There was a problem while deleting your routine.",
            });
        }
    };

    const handleGoBackButtonClick = () => {
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
                    {isUpdateMode ? displayedTitle : "Routine"}
                </h1>
                <div>
                    <DialogSave
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        handleSave={handleCreateOrUpdateButtonClick}
                        buttonLabel={isUpdateMode ? "Update" : "Create"}
                        dialogTitle={
                            isUpdateMode ? "Update Routine" : "Create Routine"
                        }
                        dialogDescription="Please add a title and/or description for
                                    your routine. Click save when you're done."
                        isActive={exercises.length != 0}
                        isRoutine={true}
                    />
                </div>
            </nav>
            <div className="flex flex-col items-center">
                {isLoading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <LoadingSpinner size={64} />
                    </div>
                ) : (
                    <div className="w-full sm:max-w-md md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto">
                        <ExerciseList
                            exercises={exercises}
                            onExerciseChange={updateExercise}
                            onDelete={deleteExercise}
                            isRoutine={true}
                            isFinishedWorkout={false}
                            onMoveExerciseUp={moveExerciseUp}
                            onMoveExerciseDown={moveExerciseDown}
                        />
                        <div className="m-2 mt-2">
                            <ExerciseSelection
                                buttonLabel="Add Exercises"
                                onAddExercises={(newExercises) => {
                                    addExercises(newExercises);
                                }}
                                isSelectionActive={true}
                            />
                        </div>
                        {isUpdateMode && (
                            <div className="m-2 mt-2 pb-6">
                                <AlertDialogDiscard
                                    label="Discard Routine"
                                    description="Please remember, this action cannot be undone."
                                    onDiscard={handleDeleteRoutineButtonClick}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
