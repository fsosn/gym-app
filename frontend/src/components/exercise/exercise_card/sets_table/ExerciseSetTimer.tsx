import React, { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "../../../ui/button";

interface ExerciseSetTimerProps {
    timeSet: number;
    onDurationChange?: (duration: number) => void;
    isActive: boolean;
    isCompleted: boolean;
}

export const ExerciseSetTimer: React.FC<ExerciseSetTimerProps> = ({
    timeSet,
    onDurationChange,
    isActive,
    isCompleted,
}: ExerciseSetTimerProps) => {
    const [time, setTime] = useState(timeSet);
    const [timeInterval, setTimeInterval] = useState<NodeJS.Timeout | null>(
        null
    );
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const DEFAULT_VALUE = "00:00:00";

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(secs).padStart(2, "0")}`;
    };

    const [input, setInput] = useState<string>(
        timeSet ? formatTime(timeSet) : DEFAULT_VALUE
    );

    const start = () => {
        if (timeInterval) {
            clearInterval(timeInterval);
        }
        const newInterval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        setTimeInterval(newInterval);
        setIsRunning(true);
    };

    const pause = () => {
        if (timeInterval) {
            clearInterval(timeInterval);
        }
        setIsRunning(false);
    };

    useEffect(() => {
        if (isRunning) {
            setInput(formatTime(time));
            if (onDurationChange) {
                onDurationChange(time);
            }
        }
    }, [time, isRunning]);

    useEffect(() => {
        setTime(timeSet);
        setInput(formatTime(timeSet));
    }, [timeSet]);

    const handleStartPause = () => {
        if (isRunning) {
            pause();
        } else {
            start();
        }
    };

    const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newTime = event.target.value;

        newTime = newTime.replace(/[^0-9:]/g, "");

        if (newTime.length >= 3 && newTime[2] !== ":") {
            newTime = newTime.slice(0, 2) + ":" + newTime.slice(2);
        }
        if (newTime.length >= 6 && newTime[5] !== ":") {
            newTime = newTime.slice(0, 5) + ":" + newTime.slice(5);
        }

        setInput(newTime);

        const [hours, minutes, seconds] = newTime.split(":").map(Number);
        setTime(hours * 3600 + minutes * 60 + seconds);
    };

    const handleBlur = () => {
        const timeRegex = /^([0-9]{2}):([0-5][0-9]):([0-5][0-9])$/;
        if (!input || !timeRegex.test(input)) {
            setInput(DEFAULT_VALUE);
            setTime(0);
        }
    };

    return (
        <div className="flex items-center">
            <Input
                className={`h-9 flex-grow ${isCompleted ? "bg-green-950" : ""}`}
                value={input}
                onChange={handleManualChange}
                onBlur={handleBlur}
                maxLength={8}
                disabled={isRunning || !isActive}
            />
            {isActive && (
                <Button
                    onClick={handleStartPause}
                    size="sm"
                    variant="secondary"
                >
                    {isRunning ? (
                        <Pause className="w-4 h-4" />
                    ) : (
                        <Play className="w-4 h-4" />
                    )}
                </Button>
            )}
        </div>
    );
};

export default ExerciseSetTimer;
