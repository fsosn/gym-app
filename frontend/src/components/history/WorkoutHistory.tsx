import WorkoutList from "./WorkoutsList";

export default function WorkoutHistory() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Your workout history</h2>
            <WorkoutList />
        </div>
    );
}
