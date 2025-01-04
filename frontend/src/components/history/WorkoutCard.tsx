import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface WorkoutCardProps {
    title: string;
    beginDatetime: string;
    duration: string;
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
            <CardContent>Duration: {formatDuration(duration)}</CardContent>
        </Card>
    );
};

export default WorkoutCard;
