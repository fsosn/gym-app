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
import { ExerciseInfo } from "../exercise_info/ExerciseInfo";

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
                            <TableHead className="w-[4%]"></TableHead>
                            <TableHead className="w-[32%]">Name</TableHead>
                            <TableHead className="w-[32%]">Equipment</TableHead>
                            <TableHead className="w-[32%]">Type</TableHead>
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
                                <TableCell className="flex items-center justify-center">
                                    <ExerciseInfo exercise={exercise} />
                                </TableCell>
                                <TableCell>
                                    {isExerciseSelected(exercise) && "+ "}
                                    {exercise.title}
                                </TableCell>
                                <TableCell>{exercise.equipment}</TableCell>
                                <TableCell>{exercise.exercise_type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    );
};

export default ExerciseTable;
