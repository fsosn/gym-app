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
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export enum Period {
    Week = "week",
    Month = "month",
    Year = "year",
}

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
    const [activePeriod, setActivePeriod] = useState<Period>(Period.Week);
    const [chartData, setChartData] = useState<WorkoutOverTimeType[] | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async (period: Period) => {
        try {
            const data = await fetchWorkoutsOverTime(period);
            switch (period) {
                case Period.Week:
                    setWeeklyData(data);
                    break;
                case Period.Month:
                    setMonthlyData(data);
                    break;
                case Period.Year:
                    setYearlyData(data);
                    break;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(Period.Week);
    }, []);

    useEffect(() => {
        fetchData(activePeriod);
    }, [activePeriod]);

    useEffect(() => {
        if (activePeriod === Period.Week) {
            setChartData(weeklyData);
        } else if (activePeriod === Period.Month) {
            setChartData(monthlyData);
        } else if (activePeriod === Period.Year) {
            setChartData(yearlyData);
        }
    }, [activePeriod, weeklyData, monthlyData, yearlyData]);

    const getButtonClass = (period: Period) => {
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
                {isLoading ? (
                    <div className="flex justify-center items-center w-full min-h-64">
                        <LoadingSpinner size={48} />
                    </div>
                ) : (
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
                                        case Period.Week:
                                            return date.toLocaleDateString(
                                                locale,
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            );
                                        case Period.Month:
                                            return date.toLocaleDateString(
                                                locale,
                                                {
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            );
                                        case Period.Year:
                                            return date.toLocaleDateString(
                                                locale,
                                                {
                                                    year: "numeric",
                                                }
                                            );
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
                )}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="grid grid-cols-3 gap-2 w-full">
                    <Button
                        className={getButtonClass(Period.Week)}
                        onClick={() => setActivePeriod(Period.Week)}
                    >
                        Weekly
                    </Button>
                    <Button
                        className={getButtonClass(Period.Month)}
                        onClick={() => setActivePeriod(Period.Month)}
                    >
                        Monthly
                    </Button>
                    <Button
                        className={getButtonClass(Period.Year)}
                        onClick={() => setActivePeriod(Period.Year)}
                    >
                        Yearly
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
