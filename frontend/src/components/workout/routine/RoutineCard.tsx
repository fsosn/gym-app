import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface RoutineCardProps {
    title: string;
    description: string;
    onStart: () => void;
    onRoutineCardClick: () => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({
    title,
    description,
    onStart,
    onRoutineCardClick,
}) => {
    return (
        <Card
            onClick={onRoutineCardClick}
            className="hover:bg-zinc-900 cursor-pointer"
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full" onClick={onStart}>
                    <span>Start</span>
                </Button>
            </CardContent>
        </Card>
    );
};

export default RoutineCard;
