import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { MuscleCountType } from "@/types/statistics_types";
import { useEffect, useState } from "react";
import { fetchMuscleDistribution } from "@/services/statistics";

const chartConfig = {
    count: {
        label: "Times trained",
        color: "#8b5cf6",
    },
} satisfies ChartConfig;

export function MuscleDistributionChart() {
    const [muscleDistribution, setMuscleDistribution] =
        useState<MuscleCountType[]>();

    useEffect(() => {
        const getMuscleDistribution = async () => {
            try {
                const data = await fetchMuscleDistribution();
                setMuscleDistribution(data);
            } catch (error) {
                console.error(error);
            }
        };

        getMuscleDistribution();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-bold">
                    Muscles Trained
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="max-h-64" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={muscleDistribution}
                        height={100}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="muscle"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="count" fill="#8b5cf6" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
