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

    const selectedInputStyle = (set: Set) => {
        return set.completed ? "bg-green-950 hover:bg-green-950" : "";
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
            <CardContent className="p-2">
                <Table
                    className={`table-fixed w-full grid`}
                    style={{
                        gridTemplateColumns: `
                            ${isFinishedWorkout ? "" : "15% "}
                            10% 
                            ${typeFlags.isWeight ? "1fr " : ""}
                            ${typeFlags.isReps ? "1fr " : ""}
                            ${typeFlags.isDistance ? "1fr " : ""}
                            ${typeFlags.isDuration ? "1fr " : ""}
                            ${isRoutine || isFinishedWorkout ? "" : "15%"}
                        `.trim(),
                    }}
                >
                    <TableHeader className="contents">
                        <TableRow className="contents">
                            {!isFinishedWorkout && (
                                <TableHead className="h-8"></TableHead>
                            )}
                            <TableHead className="h-8">SET</TableHead>
                            {typeFlags.isWeight && (
                                <TableHead className="h-8">WEIGHT</TableHead>
                            )}
                            {typeFlags.isReps && (
                                <TableHead className="h-8">REPS</TableHead>
                            )}
                            {typeFlags.isDistance && (
                                <TableHead className="h-8">DISTANCE</TableHead>
                            )}
                            {typeFlags.isDuration && (
                                <TableHead className="h-8">DURATION</TableHead>
                            )}
                            {!isRoutine && !isFinishedWorkout && (
                                <TableHead className="text-center h-8 flex justify-center items-center w-full h-full">
                                    <Check className="w-4 h-4" />
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="contents">
                        {sets.map((set, index) => (
                            <TableRow key={index} className="contents">
                                {!isFinishedWorkout && (
                                    <TableCell
                                        className={`text-center ${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
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
                                <TableCell
                                    className={`flex items-center h-full w-full ${
                                        set.completed ? "bg-green-900" : ""
                                    }`}
                                >
                                    {index + 1}
                                </TableCell>
                                {typeFlags.isWeight && (
                                    <TableCell
                                        className={`${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
                                        <Input
                                            className={selectedInputStyle(set)}
                                            disabled={isFinishedWorkout}
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
                                    <TableCell
                                        className={`${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
                                        <Input
                                            className={selectedInputStyle(set)}
                                            disabled={isFinishedWorkout}
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
                                    <TableCell
                                        className={`${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
                                        <Input
                                            className={selectedInputStyle(set)}
                                            disabled={isFinishedWorkout}
                                            value={set.distance}
                                            onChange={(e) => {
                                                if (onSetsChange) {
                                                    const newSets = [...sets];
                                                    newSets[index].distance =
                                                        parseFloat(
                                                            e.target.value
                                                        );
                                                    onSetsChange(newSets);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                )}
                                {typeFlags.isDuration && (
                                    <TableCell
                                        className={`${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
                                        <ExerciseSetTimer
                                            timeSet={set.duration || 0}
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
                                            isCompleted={set.completed}
                                        />
                                    </TableCell>
                                )}
                                {!isRoutine && !isFinishedWorkout && (
                                    <TableCell
                                        className={`flex justify-center items-center w-full h-full ${
                                            set.completed ? "bg-green-900" : ""
                                        }`}
                                    >
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
