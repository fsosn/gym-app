import { Dumbbell, BarChart2, CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-600 p-2 flex justify-around fixed bottom-0 w-full">
            <Link
                to="/statistics"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <BarChart2 className="w-6 h-6" />
                <span className="text-xs mt-1">Statistics</span>
            </Link>
            <Link
                to="/history"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <CalendarDays className="w-6 h-6" />
                <span className="text-xs mt-1">History</span>
            </Link>
            <Link
                to="/workout"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <Dumbbell className="w-6 h-6" />
                <span className="text-xs mt-1">Workout</span>
            </Link>

            <Link
                to="/profile"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
            </Link>
        </nav>
    );
}
