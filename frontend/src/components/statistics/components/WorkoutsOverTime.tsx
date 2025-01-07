import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { fetchWorkoutsOverTime } from "@/services/statistics";
import { WorkoutOverTimeType } from "@/types/statistics_types";
import { Button } from "@/components/ui/button";

const chartConfig = {
    workouts: {
        label: "Workouts",
        color: "#8b5cf6",
    },
} satisfies ChartConfig;

export function WorkoutsOverTime() {
    const [weeklyData, setWeeklyData] = useState<WorkoutOverTimeType[] | null>(
        null
    );
    const [monthlyData, setMonthlyData] = useState<
        WorkoutOverTimeType[] | null
    >(null);
    const [yearlyData, setYearlyData] = useState<WorkoutOverTimeType[] | null>(
        null
    );
    const [activePeriod, setActivePeriod] = useState<"week" | "month" | "year">(
        "week"
    );
    const [chartData, setChartData] = useState<WorkoutOverTimeType[] | null>(
        null
    );

    const fetchData = async (period: "week" | "month" | "year") => {
        try {
            const data = await fetchWorkoutsOverTime(period);
            switch (period) {
                case "week":
                    setWeeklyData(data);
                    break;
                case "month":
                    setMonthlyData(data);
                    break;
                case "year":
                    setYearlyData(data);
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData("week");
    }, []);

    useEffect(() => {
        fetchData(activePeriod);
    }, [activePeriod]);

    useEffect(() => {
        if (activePeriod === "week") {
            setChartData(weeklyData);
        } else if (activePeriod === "month") {
            setChartData(monthlyData);
        } else if (activePeriod === "year") {
            setChartData(yearlyData);
        }
    }, [activePeriod, weeklyData, monthlyData, yearlyData]);

    const getButtonClass = (period: "week" | "month" | "year") => {
        return activePeriod === period
            ? "bg-violet-700 text-white hover:bg-violet-800"
            : "";
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-bold">
                    Workouts Over Time
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="max-h-64 w-full"
                    config={chartConfig}
                >
                    <BarChart accessibilityLayer data={chartData || []}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={7}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                const locale = "en-US";
                                switch (activePeriod) {
                                    case "week":
                                        return date.toLocaleDateString(locale, {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    case "month":
                                        return date.toLocaleDateString(locale, {
                                            month: "short",
                                            year: "numeric",
                                        });
                                    case "year":
                                        return date.toLocaleDateString(locale, {
                                            year: "numeric",
                                        });
                                }
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="workouts" fill="#8b5cf6" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                        className={getButtonClass("week")}
                        onClick={() => setActivePeriod("week")}
                    >
                        Weekly
                    </Button>
                    <Button
                        className={getButtonClass("month")}
                        onClick={() => setActivePeriod("month")}
                    >
                        Monthly
                    </Button>
                    <Button
                        className={getButtonClass("year")}
                        onClick={() => setActivePeriod("year")}
                    >
                        Yearly
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
