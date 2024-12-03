import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { ExerciseRecord } from "@/types/types";

interface ExerciseTableProps {
    exercises: ExerciseRecord[];
    selectedExercises: ExerciseRecord[];
    toggleSelection: (exercise: ExerciseRecord) => void;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({
    exercises,
    selectedExercises,
    toggleSelection,
}) => {
    const isExerciseSelected = (exercise: ExerciseRecord) =>
        selectedExercises.some((selected) => selected.id === exercise.id);

    return (
        <div>
            <div>
                <h3 className="font-bold mb-2">Exercises</h3>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Equipment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exercises.map((exercise) => (
                        <TableRow
                            key={exercise.id}
                            className={
                                isExerciseSelected(exercise)
                                    ? "bg-zinc-800 cursor-pointer"
                                    : "hover:bg-zinc-800 cursor-pointer"
                            }
                            onClick={() => toggleSelection(exercise)}
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
        </div>
    );
};

export default ExerciseTable;
