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
import { PlusIcon } from "@/components/ui/plusIcon";
import { TickIcon } from "@/components/ui/tickIcon";
import { CrossIcon } from "@/components/ui/crossIcon";

interface Set {
  weight: string;
  reps: string;
  completed: boolean;
  selected: boolean;
}

interface ExerciseCardProps {
  exerciseName: string;
  sets: Set[];
  onSetsChange: (sets: Set[]) => void;
  onDelete: () => void;
}

export function ExerciseCard({
  exerciseName,
  sets,
  onSetsChange,
  onDelete,
}: ExerciseCardProps) {
  const handleAddSet = () => {
    onSetsChange([
      ...sets,
      { weight: "", reps: "", completed: false, selected: false },
    ]);
  };

  const handleDeleteSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    onSetsChange(newSets);
  };

  const handleSetCompletion = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = !newSets[index].completed;
    onSetsChange(newSets);
  };

  const selectedStyle = (set: Set) => {
    return set.completed ? "bg-green-900 hover:bg-green-800" : "";
  };
  const selectedInputStyle = (set: Set) => {
    return set.completed ? "w-12 bg-green-950 hover:bg-green-950" : "w-12";
  };

  return (
    <Card className="m-2">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex justify-between">
          <div>{exerciseName}</div>
          <div>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              <CrossIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] flex justify-center items-center"></TableHead>
              <TableHead>SET</TableHead>
              <TableHead>WEIGHT</TableHead>
              <TableHead>REPS</TableHead>
              <TableHead className="flex justify-center items-center">
                <TickIcon className="w-4 h-4 text-center" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sets.map((set, index) => (
              <TableRow key={index} className={selectedStyle(set)}>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteSet(index)}
                  >
                    <CrossIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    className={selectedInputStyle(set)}
                    value={set.weight}
                    onChange={(e) => {
                      const newSets = [...sets];
                      newSets[index].weight = e.target.value;
                      onSetsChange(newSets);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className={selectedInputStyle(set)}
                    value={set.reps}
                    onChange={(e) => {
                      const newSets = [...sets];
                      newSets[index].reps = e.target.value;
                      onSetsChange(newSets);
                    }}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant={set.completed ? "default" : "secondary"}
                    onClick={() => handleSetCompletion(index)}
                  >
                    <TickIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={handleAddSet}
          className="w-full mt-2"
          variant="secondary"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          <span>Add Set</span>
        </Button>
      </CardContent>
    </Card>
  );
}
