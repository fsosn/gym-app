import { SVGProps } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

export default function Navigation() {
    return (
        <nav className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-600 p-2 flex justify-around fixed bottom-0 w-full">
            <Link
                to="/home"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
            </Link>
            <Link
                to="/workouts"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <DumbbellIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Workout</span>
            </Link>
            <Link
                to="/profile"
                className="text-primary flex flex-col items-center justify-center p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
                <UserIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Profile</span>
            </Link>
        </nav>
    );
}

function DumbbellIcon(
    props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.4 14.4 9.6 9.6" />
            <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
            <path d="m21.5 21.5-1.4-1.4" />
            <path d="M3.9 3.9 2.5 2.5" />
            <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
        </svg>
    );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
