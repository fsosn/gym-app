import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ExerciseType,
    MuscleCategory,
    Equipment,
    ExercisePostRequest,
} from "@/types/exercise_types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MultiSelect } from "@/components/ui/multi-select";
import { Plus } from "lucide-react";
import {
    EQUIPMENT,
    EXERCISE_TYPES,
    MUSCLE_CATEGORIES,
} from "@/constants/exerciseConstants";
import { ExerciseContext } from "@/contexts/ExerciseContext";

const FormSchema = z.object({
    title: z.string().min(1, "Title is required").max(50, "Max 50 characters"),
    description: z.string().max(500, "Max 500 characters"),
    primaryMuscle: z.string().min(1, "Select a primary muscle"),
    otherMuscles: z.array(z.string()),
    exerciseType: z.string().min(1, "Select an exercise type"),
    equipment: z.string().min(1, "Select equipment"),
});

export function CreateExercise() {
    const exerciseContext = useContext(ExerciseContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            primaryMuscle: "",
            otherMuscles: [],
            exerciseType: "",
            equipment: "",
        },
    });

    const handleCreateExercise = async (data: z.infer<typeof FormSchema>) => {
        const exercise: ExercisePostRequest = {
            title: data.title,
            description: data.description,
            primary_muscle: data.primaryMuscle as MuscleCategory,
            other_muscles: data.otherMuscles as MuscleCategory[],
            exercise_type: data.exerciseType as ExerciseType,
            equipment: data.equipment as Equipment,
        };

        try {
            await exerciseContext?.createExercise(exercise);
            toast({
                title: "Success!",
                description: "Your exercise was successfully created.",
            });
            setIsDialogOpen(false);
            form.reset();
        } catch (error) {
            console.error("Error while creating exercise:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create the exercise. Please try again.",
            });
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <Plus className="w-3 h-3 mr-2" /> Create Exercise
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-lg lg:max-w-xl rounded-md h-[75vh]">
                <DialogHeader>
                    <DialogTitle>Create Your Exercise</DialogTitle>
                    <DialogDescription>
                        Fill out this form to create your new exercise tailored
                        to your goals.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[75vh] rounded-md">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCreateExercise)}
                            className="space-y-4 pb-4 px-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Title"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Description (optional)"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="primaryMuscle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary Muscle</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select primary muscle" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[30vh]">
                                                {MUSCLE_CATEGORIES.map(
                                                    (muscle) => (
                                                        <SelectItem
                                                            key={muscle}
                                                            value={muscle}
                                                        >
                                                            {muscle}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otherMuscles"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Other Muscles</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                values={MUSCLE_CATEGORIES}
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                placeholder="Select other muscles (optional)"
                                                modalPopover={true}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="exerciseType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Exercise Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an exercise type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[25vh]">
                                                {EXERCISE_TYPES.map((type) => (
                                                    <SelectItem
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="equipment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Equipment</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select equipment" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[25vh]">
                                                {EQUIPMENT.map((equip) => (
                                                    <SelectItem
                                                        key={equip}
                                                        value={equip}
                                                    >
                                                        {equip}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
