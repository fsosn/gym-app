import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WorkoutCardProps {
  title: string;
  description: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">
          <span>Start</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
