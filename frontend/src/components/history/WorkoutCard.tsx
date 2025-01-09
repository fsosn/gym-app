import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { formatDuration } from "@/utils/time_utils";

interface WorkoutCardProps {
    title: string;
    beginDatetime: string;
    duration: number;
    totalVolume: number;
    totalExercises: number;
    totalSets: number;
    onWorkoutCardClick: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
    title,
    beginDatetime,
    duration,
    totalVolume,
    totalExercises,
    totalSets,
    onWorkoutCardClick,
}) => {
    return (
        <Card
            onClick={onWorkoutCardClick}
            className="hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer"
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{beginDatetime}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Duration</TableHead>
                            <TableHead>Exercises</TableHead>
                            <TableHead>Sets</TableHead>
                            <TableHead>Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{formatDuration(duration)}</TableCell>
                            <TableCell>{totalExercises}</TableCell>
                            <TableCell>{totalSets}</TableCell>
                            <TableCell>{totalVolume} kg</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default WorkoutCard;
