import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExerciseType, Set } from "@/types/exercise_types";
import { ArrowDown, ArrowUp, Check, Ellipsis, X } from "lucide-react";
import { useEffect, useState } from "react";
import ExerciseSetTimer from "./ExerciseSetTimer";

interface ExerciseCardProps {
    exerciseName: string;
    exerciseType: ExerciseType;
    sets: Set[];
    onSetsChange?: (sets: Set[]) => void;
    onDelete?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
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

    const handleAddSet = () => {
        if (onSetsChange) {
            onSetsChange([
                ...sets,
                {
                    weight: 0,
                    reps: 0,
                    distance: 0,
                    duration: 0,
                    completed: false,
                },
            ]);
        }
    };

    const handleDeleteSet = (index: number) => {
        if (onSetsChange) {
            const newSets = sets.filter((_, i) => i !== index);
            onSetsChange(newSets);
        }
    };

    const handleSetCompletion = (index: number) => {
        if (onSetsChange) {
            const newSets = [...sets];
            newSets[index].completed = !newSets[index].completed;
            onSetsChange(newSets);
        }
    };

    const selectedStyle = (set: Set) => {
        return set.completed ? "bg-green-900 hover:bg-green-800" : "";
    };
    const selectedInputStyle = (set: Set) => {
        return set.completed ? "w-12 bg-green-950 hover:bg-green-950" : "w-12";
    };

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
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Ellipsis />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {onMoveUp && (
                                        <DropdownMenuItem onClick={onMoveUp}>
                                            <ArrowUp />
                                            Move Up
                                        </DropdownMenuItem>
                                    )}
                                    {onMoveDown && (
                                        <DropdownMenuItem onClick={onMoveDown}>
                                            <ArrowDown />
                                            Move Down
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-500"
                                        onClick={onDelete}
                                    >
                                        <X />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {isFinishedWorkout ? null : (
                                <TableHead className="flex justify-center items-center"></TableHead>
                            )}
                            <TableHead>SET</TableHead>
                            {typeFlags.isWeight && (
                                <TableHead>WEIGHT</TableHead>
                            )}
                            {typeFlags.isReps && <TableHead>REPS</TableHead>}
                            {typeFlags.isDistance && (
                                <TableHead>DISTANCE</TableHead>
                            )}
                            {typeFlags.isDuration && (
                                <TableHead>DURATION</TableHead>
                            )}
                            {isRoutine || isFinishedWorkout ? null : (
                                <TableHead className="flex justify-center items-center">
                                    <Check className="w-4 h-4 text-center" />
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sets.map((set, index) => (
                            <TableRow
                                key={index}
                                className={selectedStyle(set)}
                            >
                                {isFinishedWorkout ? null : (
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                handleDeleteSet(index)
                                            }
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                )}
                                <TableCell>{index + 1}</TableCell>
                                {typeFlags.isWeight && (
                                    <TableCell>
                                        <Input
                                            disabled={isFinishedWorkout}
                                            className={
                                                selectedInputStyle(set) +
                                                "w-full max-w-16"
                                            }
                                            value={set.weight}
                                            onChange={(e) => {
                                                if (onSetsChange) {
                                                    const newSets = [...sets];
                                                    newSets[index].weight =
                                                        parseFloat(
                                                            e.target.value
                                                        );
                                                    onSetsChange(newSets);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {typeFlags.isReps && (
                                    <TableCell>
                                        <Input
                                            disabled={isFinishedWorkout}
                                            className={
                                                selectedInputStyle(set) +
                                                "w-full max-w-16"
                                            }
                                            value={set.reps}
                                            onChange={(e) => {
                                                if (onSetsChange) {
                                                    const newSets = [...sets];
                                                    newSets[index].reps =
                                                        parseInt(
                                                            e.target.value
                                                        );
                                                    onSetsChange(newSets);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {typeFlags.isDistance && (
                                    <TableCell>
                                        <Input
                                            disabled={isFinishedWorkout}
                                            className={
                                                selectedInputStyle(set) +
                                                (!typeFlags.isDuration
                                                    ? "w-full"
                                                    : "w-full max-w-16")
                                            }
                                            value={set.distance}
                                            onChange={(e) => {
                                                if (onSetsChange) {
                                                    const newSets = [...sets];
                                                    newSets[index].distance =
                                                        parseInt(
                                                            e.target.value
                                                        );
                                                    onSetsChange(newSets);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {typeFlags.isDuration && (
                                    <TableCell>
                                        <ExerciseSetTimer
                                            timeSet={set.duration!}
                                            onDurationChange={(duration) => {
                                                if (onSetsChange) {
                                                    const newSets = [...sets];
                                                    newSets[index].duration =
                                                        duration;
                                                    onSetsChange(newSets);
                                                }
                                            }}
                                            isActive={
                                                !isFinishedWorkout && !isRoutine
                                            }
                                        />
                                    </TableCell>
                                )}
                                {isRoutine || isFinishedWorkout ? null : (
                                    <TableCell className="text-center">
                                        <Button
                                            size="sm"
                                            variant={
                                                set.completed
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            onClick={() =>
                                                handleSetCompletion(index)
                                            }
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {isFinishedWorkout ? null : (
                    <Button
                        onClick={handleAddSet}
                        className="w-full mt-2"
                        variant="secondary"
                    >
                        <Check className="w-4 h-4 mr-1" />
                        <span>Add Set</span>
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
