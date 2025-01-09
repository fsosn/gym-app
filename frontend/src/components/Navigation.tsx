import { Dumbbell, BarChart2, CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-300 dark:border-zinc-700 flex justify-around fixed bottom-0 w-full">
            <Link
                to="/statistics"
                className="text-primary flex flex-col items-center justify-center p-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 w-[25%]"
            >
                <BarChart2 className="w-6 h-6" />
                <span className="text-xs mt-1">Statistics</span>
            </Link>
            <Link
                to="/history"
                className="text-primary flex flex-col items-center justify-center p-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 w-[25%]"
            >
                <CalendarDays className="w-6 h-6" />
                <span className="text-xs mt-1">History</span>
            </Link>
            <Link
                to="/workout"
                className="text-primary flex flex-col items-center justify-center p-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 w-[25%]"
            >
                <Dumbbell className="w-6 h-6" />
                <span className="text-xs mt-1">Workout</span>
            </Link>

            <Link
                to="/profile"
                className="text-primary flex flex-col items-center justify-center p-4 hover:bg-zinc-200 dark:hover:bg-zinc-900 w-[25%]"
            >
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
            </Link>
        </nav>
    );
}
