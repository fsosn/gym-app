import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExerciseFilters from "./ExerciseFilters";
import ExerciseTable from "./ExerciseTable";
import { Exercise } from "@/types/exercise_types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { fetchExercises } from "@/services/exercises";
import { CreateExercise } from "../create_exercise/CreateExercise";

interface ExerciseSelectionProps {
    buttonLabel: string;
    onAddExercises?: (exercises: Exercise[]) => void;
    isSelectionActive: boolean;
}

const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({
    buttonLabel,
    onAddExercises,
    isSelectionActive,
}) => {
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const DEFAULT = "Any";
    const [filters, setFilters] = useState({
        muscle: DEFAULT,
        equipment: DEFAULT,
        exercise_type: DEFAULT,
        search: "",
    });

    useEffect(() => {
        const getExercises = async () => {
            try {
                const exercises = await fetchExercises();
                setExerciseList(exercises);
                setFilteredExercises(exercises);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        getExercises();
    }, []);

    useEffect(() => {
        let filtered = exerciseList;
        if (filters.search.trim()) {
            filtered = exerciseList.filter((exercise) =>
                exercise.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase())
            );
        } else {
            if (filters.muscle !== DEFAULT) {
                filtered = filtered.filter(
                    (exercise) => exercise.primary_muscle === filters.muscle
                );
            }
            if (filters.equipment !== DEFAULT) {
                filtered = filtered.filter(
                    (exercise) => exercise.equipment === filters.equipment
                );
            }
            if (filters.exercise_type !== DEFAULT) {
                filtered = filtered.filter(
                    (exercise) =>
                        exercise.exercise_type === filters.exercise_type
                );
            }
        }
        setFilteredExercises(filtered);
    }, [filters, exerciseList]);

    const toggleExerciseSelection = (exercise: Exercise) => {
        setSelectedExercises((prev) =>
            prev.some((e) => e.id === exercise.id)
                ? prev.filter((e) => e.id !== exercise.id)
                : [...prev, exercise]
        );
    };

    const handleAddExercises = () => {
        if (onAddExercises) onAddExercises(selectedExercises);
        setSelectedExercises([]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-lg lg:max-w-xl min-h-[500px]">
                <DialogHeader>
                    <DialogTitle>Exercises</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <CreateExercise />
                <ExerciseFilters setFilters={setFilters} />
                <ExerciseTable
                    exercises={filteredExercises}
                    selectedExercises={selectedExercises}
                    toggleSelection={
                        isSelectionActive ? toggleExerciseSelection : undefined
                    }
                />
                {isSelectionActive && (
                    <DialogFooter>
                        <DialogClose>
                            <Button
                                onClick={handleAddExercises}
                                className="mr-2"
                            >
                                Add Selected Exercises
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ExerciseSelection;
