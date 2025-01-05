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

interface WorkoutCardProps {
    title: string;
    beginDatetime: string;
    duration: string;
    totalVolume: number;
    totalExercises: number;
    totalSets: number;
    onWorkoutCardClick: () => void;
}

const formatDuration = (duration: string): string => {
    const [minutesStr, secondsStr] = duration.split(":");
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.join(" ");
};

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
            className="hover:bg-zinc-900 cursor-pointer"
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
