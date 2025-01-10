import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Routines from "../routine/Routines";

export default function Workout() {
    const [hasOngoingWorkout, setHasOngoingWorkout] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const workoutData = localStorage.getItem("workoutLog");
        setHasOngoingWorkout(!!workoutData);
    });

    const handleStartOrResumeWorkoutButtonClick = () => {
        navigate("/workout-log");
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
            <Button
                className={`inline-flex items-center space-x-2 ${
                    hasOngoingWorkout ? "bg-blue-700 text-white" : ""
                }`}
                onClick={handleStartOrResumeWorkoutButtonClick}
            >
                {hasOngoingWorkout ? (
                    <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Resume Workout Session</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Start Empty Workout</span>
                    </div>
                )}
            </Button>
            <div className="my-4">
                <Routines />
            </div>
        </div>
    );
}
