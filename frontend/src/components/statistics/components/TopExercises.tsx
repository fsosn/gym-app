import { useEffect, useState } from "react";
import { fetchTopExercises } from "@/services/statistics";
import { TopExerciseType } from "@/types/statistics_types";
import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopExercises() {
    const [topExercises, setTopExercises] = useState<TopExerciseType[]>();

    useEffect(() => {
        const getTotalWorkouts = async () => {
            try {
                const data = await fetchTopExercises();
                setTopExercises(data);
            } catch (error) {
                console.error(error);
            }
        };

        getTotalWorkouts();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-bold">
                    Top Exercises
                </CardTitle>
            </CardHeader>
            <CardContent>
                {topExercises ? (
                    <Table className="text-base">
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Exercise</TableHead>
                                <TableHead>Times</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topExercises.map((exercise, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{exercise.exercise}</TableCell>
                                    <TableCell>{exercise.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <span className="sm: text-lg lg:text-xl font-semibold">
                        No exercise ranking available right now.
                    </span>
                )}
            </CardContent>
        </Card>
    );
}
