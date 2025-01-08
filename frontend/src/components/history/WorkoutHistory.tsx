import WorkoutList from "./WorkoutsList";

export default function WorkoutHistory() {
    return (
        <div className="px-4 py-6 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">History</h1>
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Your workout history
                    </h2>
                    <WorkoutList />
                </div>
            </div>
        </div>
    );
}
