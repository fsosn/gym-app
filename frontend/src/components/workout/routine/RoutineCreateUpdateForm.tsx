import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Plus, TrashIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExerciseList } from "@/components/workout/ExerciseList";
import ExerciseSelection from "@/components/workout/exerciseSelection/ExerciseSelection";
import { ExerciseRecord, Set, Exercise } from "@/types/exercise_types.tsx";
import { API_ENDPOINTS } from "@/config.tsx";

export function RoutineCreateUpdateForm() {
    const { routineId } = useParams();
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [exercises, setExercises] = useState<ExerciseRecord[] | null>(null);
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
        useState(false);
    const [displayedTitle, setDisplayedTitle] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (routineId) {
            setIsUpdateMode(true);
            const fetchRoutineDetails = async () => {
                try {
                    const routine = await axios.get(
                        `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${routineId}`
                    );
                    setDisplayedTitle(routine.data.title);
                    setTitle(routine.data.title);
                    setDescription(routine.data.description);
                    setExercises(
                        routine.data.exercises.map((exercise: any) => ({
                            id: exercise.id,
                            title: exercise.title,
                            sets: exercise.sets.map((set: any) => ({
                                weight: set.weight.toString(),
                                reps: set.reps.toString(),
                                completed: false,
                            })),
                        }))
                    );
                } catch (error) {
                    console.error("Failed to fetch routine:", error);
                }
            };
            fetchRoutineDetails();
        }
    }, [routineId]);

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

    const handleAddExercisesToLog = (selectedExercises: Exercise[]) => {
        const newExercises: ExerciseRecord[] = [
            ...(exercises || []),
            ...selectedExercises.map((exercise) => ({
                title: exercise.title,
                id: exercise.id,
                sets: [{ weight: "", reps: "", completed: false }],
            })),
        ];
        setExercises(newExercises);
        setShowExerciseSelectionModal(false);
    };

    const handleCreateOrUpdateButtonClick = async () => {
        if (!title || !exercises || exercises.length === 0) {
            alert("Please provide a title and add at least one exercise.");
            return;
        }

        const routineData = {
            title,
            description,
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
            if (isUpdateMode) {
                await axios.put(
                    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${routineId}`,
                    routineData
                );
            } else {
                await axios.post(
                    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}`,
                    routineData
                );
            }
            navigate("/");
        } catch (error) {
            console.error("Error while modifying routine:", error);
            alert("Error while modifying routine.");
        }
    };

    const handleDeleteRoutineButtonClick = async () => {
        try {
            await axios.delete(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}/${routineId}`
            );

            navigate("/");
        } catch (error) {
            console.error("Error while deleting routine:", error);
            alert("Error while deleting routine.");
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button disabled={exercises?.length === 0}>
                                {isUpdateMode ? "Update" : "Create"}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {isUpdateMode ? "Update" : "Create"} Routine
                                </DialogTitle>
                                <DialogDescription>
                                    Please add a title and/or description for
                                    your routine. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="title"
                                        className="text-right"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        className="col-span-3"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        className="col-span-3"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    onClick={handleCreateOrUpdateButtonClick}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </nav>
            <div className="flex flex-col items-center">
                <div className="w-full sm:max-w-md md:max-w-md lg:max-w-xl xl:max-w-xl mx-auto">
                    <ExerciseList
                        exercises={exercises}
                        onExerciseChange={handleExerciseChange}
                        onDelete={handleDeleteExercise}
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
                                onAddExercises={handleAddExercisesToLog}
                                onCancel={() =>
                                    setShowExerciseSelectionModal(false)
                                }
                            />
                        )}
                    </div>
                    {isUpdateMode ? (
                        <div className="m-2 mt-2 pb-6">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full text-destructive hover:text-destructive border-red-900"
                                    >
                                        <TrashIcon className="w-4 h-4 mr-1" />
                                        <span>Discard Routine</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Please remember that this action
                                            cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Go Back
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bg-red-800 text-white border-red-900 hover:bg-red-700"
                                            onClick={
                                                handleDeleteRoutineButtonClick
                                            }
                                        >
                                            Discard Routine
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
