import { useContext, useState } from "react";
import { Label } from "@/components/ui/label";
import { Exercise } from "@/types/exercise_types";
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExerciseContext } from "@/contexts/ExerciseContext";
import { useToast } from "@/hooks/use-toast";

interface ExerciseInfoProps {
    exercise: Exercise;
}

export function ExerciseInfo({ exercise }: ExerciseInfoProps) {
    const exerciseContext = useContext(ExerciseContext);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteExercise = async (id: number) => {
        try {
            await exerciseContext?.deleteExercise(id);
            setIsDialogOpen(false);
            toast({
                description: "Your exercise was successfully deleted.",
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete the exercise. Please try again.",
            });
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Info className="w-4 h-4 text-blue-500 hover:text-blue-400 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-lg lg:max-w-xl rounded-md max-h-sm">
                <DialogHeader>
                    <DialogTitle>{exercise.title}</DialogTitle>
                    <DialogDescription>
                        {exercise.description}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="rounded-md px-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-zinc-500">
                                Primary Muscle
                            </Label>
                            <p>{exercise.primary_muscle}</p>
                        </div>
                        <div>
                            <Label className="text-zinc-500">
                                Other Muscles
                            </Label>
                            <p>
                                {exercise.other_muscles.length > 0
                                    ? exercise.other_muscles.join(", ")
                                    : ""}
                            </p>
                        </div>
                        <div>
                            <Label className="text-zinc-500">
                                Exercise Type
                            </Label>
                            <p>{exercise.exercise_type}</p>
                        </div>
                        <div>
                            <Label className="text-gray-500">Equipment</Label>
                            <p>{exercise.equipment}</p>
                        </div>
                    </div>
                </ScrollArea>
                {exercise.user_id && (
                    <DialogFooter className="py-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    Delete Exercise
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will permanently delete your
                                        exercise: {exercise.title}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Go Back
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() =>
                                            handleDeleteExercise(exercise.id)
                                        }
                                        className="bg-destructive text-white"
                                    >
                                        Delete Exercise
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
