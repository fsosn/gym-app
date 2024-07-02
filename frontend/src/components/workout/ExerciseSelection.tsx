import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PlusIcon } from "@/components/ui/plusIcon";
import { API_ENDPOINTS } from "../../config.tsx";

export interface ExerciseRecord {
  id: number;
  title: string;
}

interface ExerciseSelectionProps {
  onAddExercises: (exercises: ExerciseRecord[]) => void;
  onCancel: () => void;
}

interface ExerciseApiResponse {
  id: number;
  title: string;
  primary_muscle: string;
  other_muscles: string[];
  equipment: string;
  exercise_type: string;
}

const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({
  onAddExercises,
  onCancel,
}) => {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseRecord[]>(
    []
  );
  const [exerciseList, setExerciseList] = useState<ExerciseRecord[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get<ExerciseApiResponse[]>(
          `${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.EXERCISES}`
        );
        const formattedData = response.data.map((exercise) => ({
          id: exercise.id,
          title: exercise.title,
        }));
        setExerciseList(formattedData);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const toggleExerciseSelection = (exercise: ExerciseRecord) => {
    setSelectedExercises((prevSelectedExercises) => {
      const isSelected = prevSelectedExercises.some(
        (selected) => selected.id === exercise.id
      );
      if (isSelected) {
        return prevSelectedExercises.filter(
          (selected) => selected.id !== exercise.id
        );
      } else {
        return [...prevSelectedExercises, exercise];
      }
    });
  };

  const isExerciseSelected = (exercise: ExerciseRecord) => {
    return selectedExercises.some((selected) => selected.id === exercise.id);
  };

  const rowStyle = (exercise: ExerciseRecord) => {
    return isExerciseSelected(exercise)
      ? "bg-zinc-800 hover:bg-zinc-800 cursor-pointer"
      : "hover:bg-zinc-800 cursor-pointer";
  };

  const handleAddExercises = () => {
    onAddExercises(selectedExercises);
    setSelectedExercises([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-zinc-900 p-4 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Select Exercises</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exerciseList.map((exercise) => (
              <TableRow
                key={exercise.id}
                className={rowStyle(exercise)}
                onClick={() => toggleExerciseSelection(exercise)}
              >
                <TableCell className="flex align items-center">
                  {isExerciseSelected(exercise) && "+ "}
                  {exercise.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Button onClick={handleAddExercises} className="mr-2">
            <PlusIcon className="w-4 h-4 mr-1" />
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
