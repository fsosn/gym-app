import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SetsTable from "./sets_table/SetsTable";
import ExerciseOptions from "./exercise_options/ExerciseOptions";
import { ExerciseType, Set } from "@/types/exercise_types";

interface ExerciseCardProps {
    exerciseName: string;
    exerciseType: ExerciseType;
    sets: Set[];
    onSetsChange?: ((sets: Set[]) => void) | undefined;
    onDelete?: (() => void) | undefined;
    onMoveUp?: (() => void) | undefined;
    onMoveDown?: (() => void) | undefined;
    isRoutine: boolean;
    isFinishedWorkout: boolean;
}

export function ExerciseCard({
    exerciseName,
    exerciseType,
    sets,
    onSetsChange,
    onDelete,
    onMoveUp,
    onMoveDown,
    isRoutine,
    isFinishedWorkout,
}: ExerciseCardProps) {
    const [typeFlags, setTypeFlags] = useState({
        isWeight: false,
        isReps: false,
        isDistance: false,
        isDuration: false,
    });
    const checkExerciseType = () => {
        setTypeFlags({
            isWeight: [
                ExerciseType.WEIGHT_REPS,
                ExerciseType.WEIGHTED_BODYWEIGHT,
                ExerciseType.ASSISTED_BODYWEIGHT,
                ExerciseType.WEIGHT_DISTANCE,
                ExerciseType.DURATION_WEIGHT,
            ].includes(exerciseType),

            isReps: [
                ExerciseType.WEIGHT_REPS,
                ExerciseType.BODYWEIGHT_REPS,
                ExerciseType.WEIGHTED_BODYWEIGHT,
                ExerciseType.ASSISTED_BODYWEIGHT,
            ].includes(exerciseType),

            isDistance: [
                ExerciseType.DISTANCE_DURATION,
                ExerciseType.WEIGHT_DISTANCE,
            ].includes(exerciseType),

            isDuration: [
                ExerciseType.DURATION,
                ExerciseType.DURATION_WEIGHT,
                ExerciseType.DISTANCE_DURATION,
            ].includes(exerciseType),
        });
    };

    useEffect(() => {
        checkExerciseType();
    }, [exerciseType]);

    return (
        <Card className="m-2">
            <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-between">
                    <div>{exerciseName}</div>
                    {isFinishedWorkout ? null : (
                        <ExerciseOptions
                            onDelete={onDelete}
                            onMoveUp={onMoveUp}
                            onMoveDown={onMoveDown}
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <SetsTable
                    sets={sets}
                    onSetsChange={onSetsChange}
                    isRoutine={isRoutine}
                    isFinishedWorkout={isFinishedWorkout}
                    typeFlags={typeFlags}
                />
            </CardContent>
        </Card>
    );
}
