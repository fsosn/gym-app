import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExerciseSetTimer from "./ExerciseSetTimer";
import { Check, X } from "lucide-react";
import { Set } from "@/types/exercise_types";

interface SetsTableProps {
    sets: Set[];
    typeFlags: {
        isWeight: boolean;
        isReps: boolean;
        isDistance: boolean;
        isDuration: boolean;
    };
    onSetsChange?: (sets: Set[]) => void;
    isRoutine: boolean;
    isFinishedWorkout: boolean;
}

export const SetsTable: React.FC<SetsTableProps> = ({
    sets,
    typeFlags,
    onSetsChange,
    isRoutine,
    isFinishedWorkout,
}) => {
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
            const updatedSets = sets.filter((_, i) => i !== index);
            onSetsChange(updatedSets);
        }
    };

    const handleSetCompletion = (index: number) => {
        if (onSetsChange) {
            const updatedSets = [...sets];
            updatedSets[index].completed = !updatedSets[index].completed;
            onSetsChange(updatedSets);
        }
    };

    const completedSetRowStyle = (set: Set) =>
        set.completed ? "bg-green-500  dark:bg-green-900 " : "";

    const completedSetInputStyle = (set: Set) =>
        set.completed
            ? "bg-green-400 hover:bg-green-300 dark:bg-green-950 dark:hover:bg-green-950"
            : "";

    return (
        <div>
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
                                    className={completedSetRowStyle(set)}
                                >
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteSet(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            )}
                            <TableCell
                                className={`flex items-center h-full w-full ${completedSetRowStyle(
                                    set
                                )}`}
                            >
                                {index + 1}
                            </TableCell>
                            {typeFlags.isWeight && (
                                <TableCell
                                    className={completedSetRowStyle(set)}
                                >
                                    <Input
                                        className={completedSetInputStyle(set)}
                                        disabled={isFinishedWorkout}
                                        value={set.weight}
                                        onChange={(e) => {
                                            if (onSetsChange) {
                                                const updatedSets = [...sets];
                                                updatedSets[index].weight =
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0;
                                                onSetsChange(updatedSets);
                                            }
                                        }}
                                    />
                                </TableCell>
                            )}
                            {typeFlags.isReps && (
                                <TableCell
                                    className={completedSetRowStyle(set)}
                                >
                                    <Input
                                        className={completedSetInputStyle(set)}
                                        disabled={isFinishedWorkout}
                                        value={set.reps}
                                        onChange={(e) => {
                                            if (onSetsChange) {
                                                const updatedSets = [...sets];
                                                updatedSets[index].reps =
                                                    parseInt(e.target.value) ||
                                                    0;
                                                onSetsChange(updatedSets);
                                            }
                                        }}
                                    />
                                </TableCell>
                            )}
                            {typeFlags.isDistance && (
                                <TableCell
                                    className={completedSetRowStyle(set)}
                                >
                                    <Input
                                        className={completedSetInputStyle(set)}
                                        disabled={isFinishedWorkout}
                                        value={set.distance}
                                        onChange={(e) => {
                                            if (onSetsChange) {
                                                const updatedSets = [...sets];
                                                updatedSets[index].distance =
                                                    parseFloat(
                                                        e.target.value
                                                    ) || 0;
                                                onSetsChange(updatedSets);
                                            }
                                        }}
                                    />
                                </TableCell>
                            )}
                            {typeFlags.isDuration && (
                                <TableCell
                                    className={completedSetRowStyle(set)}
                                >
                                    <ExerciseSetTimer
                                        timeSet={set.duration || 0}
                                        onDurationChange={(duration) => {
                                            if (onSetsChange) {
                                                const updatedSets = [...sets];
                                                updatedSets[index].duration =
                                                    duration;
                                                onSetsChange(updatedSets);
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
                                    className={`flex justify-center items-center w-full h-full ${completedSetRowStyle(
                                        set
                                    )}`}
                                >
                                    <Button
                                        size="sm"
                                        className={
                                            set.completed
                                                ? "bg-green-600 hover:bg-green-400"
                                                : ""
                                        }
                                        variant={"secondary"}
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
        </div>
    );
};

export default SetsTable;
