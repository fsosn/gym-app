import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RoutineCard from "./RoutineCard";
import { Routine } from "@/types/routine_types";
import { fetchRoutine, fetchRoutinesPage } from "@/services/routines";
import { PaginationComponent } from "@/components/shared/PaginationComponent";

export default function RoutineList() {
    const [routineList, setRoutineList] = useState<Routine[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const navigate = useNavigate();

    const getRoutinesPage = async (page: number) => {
        try {
            setIsLoading(true);
            const fetchedPage = await fetchRoutinesPage((page = page));
            setRoutineList(fetchedPage.routines);
            setCurrentPage(fetchedPage.pagination.current);
            setTotalPages(fetchedPage.pagination.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRoutinesPage(currentPage);
    }, [currentPage]);

    const handleRoutineCardClick = (routineId: number) => {
        navigate(`/routine/${routineId}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleStartRoutineButtonClick = async (routineId: number) => {
        try {
            const routine = await fetchRoutine(routineId.toString());
            localStorage.removeItem("workoutStartTime");
            localStorage.setItem(
                "workoutLog",
                JSON.stringify(routine.exercises)
            );
            navigate("/workout-log");
        } catch (error) {
            console.error(
                `Failed to start routine with id ${routineId}:`,
                error
            );
        }
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center w-full min-h-64">
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
                        {routineList.map((routine) => (
                            <RoutineCard
                                key={routine.id}
                                title={routine.title}
                                description={routine.description}
                                onStart={() =>
                                    handleStartRoutineButtonClick(routine.id)
                                }
                                onRoutineCardClick={() =>
                                    handleRoutineCardClick(routine.id)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
