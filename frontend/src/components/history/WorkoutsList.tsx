import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWorkoutsPage } from "@/services/workouts";
import { Workout } from "@/types/workout_types";
import { LoadingSpinner } from "../ui/loading-spinner";
import WorkoutCard from "./WorkoutCard";
import { PaginationComponent } from "../shared/PaginationComponent";

export default function WorkoutList() {
    const [workoutList, setWorkoutList] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const navigate = useNavigate();

    const getWorkoutsPage = async (page: number) => {
        try {
            setIsLoading(true);
            const fetchedPage = await fetchWorkoutsPage((page = page));
            setWorkoutList(fetchedPage.workouts);
            setCurrentPage(fetchedPage.pagination.current);
            setTotalPages(fetchedPage.pagination.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getWorkoutsPage(currentPage);
    }, [currentPage]);

    const handleWorkoutCardClick = (workoutId: number) => {
        navigate(`/workout/${workoutId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center w-full h-full min-h-64">
                    <LoadingSpinner size={64} />
                </div>
            ) : (
                <div>
                    <div className="mt-2 mb-2">
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {workoutList.map((workout) => (
                            <WorkoutCard
                                key={workout.id}
                                title={workout.title}
                                beginDatetime={workout.begin_datetime}
                                duration={workout.time}
                                totalVolume={workout.volume}
                                totalExercises={workout.exercises.length}
                                totalSets={workout.total_sets}
                                onWorkoutCardClick={() =>
                                    handleWorkoutCardClick(workout.id)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
