import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";
import { Button } from "@/components/ui/button";
import ExerciseFilters from "./ExerciseFilters";
import ExerciseTable from "./ExerciseTable";
import { ExerciseRecord, ExerciseApiResponse } from "@/types/exercise_types";

interface ExerciseSelectionProps {
    onAddExercises: (exercises: ExerciseRecord[]) => void;
    onCancel: () => void;
}

const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({
    onAddExercises,
    onCancel,
}) => {
    const [selectedExercises, setSelectedExercises] = useState<
        ExerciseRecord[]
    >([]);
    const [exerciseList, setExerciseList] = useState<ExerciseRecord[]>([]);
    const [filteredExercises, setFilteredExercises] = useState<
        ExerciseApiResponse[]
    >([]);
    const [filters, setFilters] = useState({
        muscle: "Any",
        equipment: "Any",
        exercise_type: "Any",
        search: "",
    });

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get<ExerciseApiResponse[]>(
                    `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.EXERCISES}`
                );
                setExerciseList(response.data);
                setFilteredExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchExercises();
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
            if (filters.muscle !== "Any") {
                filtered = filtered.filter(
                    (exercise) => exercise.primary_muscle === filters.muscle
                );
            }
            if (filters.equipment !== "Any") {
                filtered = filtered.filter(
                    (exercise) => exercise.equipment === filters.equipment
                );
            }
            if (filters.exercise_type !== "Any") {
                filtered = filtered.filter(
                    (exercise) =>
                        exercise.exercise_type === filters.exercise_type
                );
            }
        }
        setFilteredExercises(filtered);
    }, [filters, exerciseList]);

    const toggleExerciseSelection = (exercise: ExerciseRecord) => {
        setSelectedExercises((prev) =>
            prev.some((e) => e.id === exercise.id)
                ? prev.filter((e) => e.id !== exercise.id)
                : [...prev, exercise]
        );
    };

    const handleAddExercises = () => {
        onAddExercises(selectedExercises);
        setSelectedExercises([]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-zinc-900 p-4 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Select Exercises</h2>
                <ExerciseFilters setFilters={setFilters} />
                <ExerciseTable
                    exercises={filteredExercises}
                    selectedExercises={selectedExercises}
                    toggleSelection={toggleExerciseSelection}
                />
                <div className="flex justify-end mt-4">
                    <Button onClick={handleAddExercises} className="mr-2">
                        Add Selected Exercises
                    </Button>
                    <Button onClick={onCancel} variant="outline">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExerciseSelection;
