import RoutineList from "./RoutineList";
import { CreateRoutineButton } from "./CreateRoutineButton";

export default function Routines() {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Routines</h2>
            <CreateRoutineButton />
            <RoutineList />
        </div>
    );
}
