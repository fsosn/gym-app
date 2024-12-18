import { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config.tsx";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/plusIcon";
import ExerciseSelection from "@/components/workout/exerciseSelection/ExerciseSelection";
import { ExerciseRecord } from "@/types/exercise_types.tsx";
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
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExerciseList } from "@/components/workout/ExerciseList";

interface Exercise {
    id: number;
    title: string;
    sets: Set[];
}

interface Set {
    weight: string;
    reps: string;
    completed: boolean;
    selected: boolean;
}

export function RoutineCreateForm() {
    const [exercises, setExercises] = useState<Exercise[] | null>(null);
    const [showExerciseSelectionModal, setShowExerciseSelectionModal] =
        useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

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

    const handleCreateButtonClick = async () => {
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
            axios.post(
                `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.ROUTINES}`,
                routineData
            );
        } catch (error) {
            console.error("Error saving workout:", error);
            alert("Error saving workout.");
        }

        navigate("/");
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
                    Routine
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button disabled={exercises?.length === 0}>
                            Create
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Routine</DialogTitle>
                            <DialogDescription>
                                Please add a title and/or description for your
                                routine. Click save when you're done.
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
                                onClick={handleCreateButtonClick}
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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
                </div>
            </div>
        </div>
    );
}
