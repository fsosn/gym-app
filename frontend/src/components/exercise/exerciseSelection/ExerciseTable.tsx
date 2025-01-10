import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Exercise } from "@/types/exercise_types";

interface ExerciseTableProps {
    exercises: Exercise[];
    selectedExercises?: Exercise[];
    toggleSelection?: (exercise: Exercise) => void;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({
    exercises,
    selectedExercises,
    toggleSelection,
}) => {
    const isExerciseSelected = (exercise: Exercise) =>
        selectedExercises?.some((selected) => selected.id === exercise.id) ??
        false;

    return (
        <div>
            <div>
                <h3 className="font-bold mb-2">Exercises</h3>
            </div>
            <ScrollArea className="h-[300px] rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-secondary hover:bg-muted">
                            <TableHead className="w-[60%]">Name</TableHead>
                            <TableHead className="w-[40%]">Equipment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exercises.map((exercise) => (
                            <TableRow
                                key={exercise.id}
                                className={`
                                ${
                                    isExerciseSelected(exercise) &&
                                    "bg-zinc-300 dark:bg-muted"
                                } " hover:bg-zinc-300 dark:hover:bg-muted cursor-pointer"`}
                                onClick={() =>
                                    toggleSelection && toggleSelection(exercise)
                                }
                            >
                                <TableCell>
                                    {isExerciseSelected(exercise) && "+ "}
                                    {exercise.title}
                                </TableCell>
                                <TableCell>{exercise.equipment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
};

export default ExerciseTable;
