import SignOutButton from "@/components/auth/SignOutButton";
import { ModeToggle } from "@/components/theme/components/ModeToggle";
import { UserCard } from "./UserCard";
import ExerciseSelection from "../exercise/exerciseSelection/ExerciseSelection";

export function Profile() {
    return (
        <div>
            <div>
                <header className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4 text-blue-500">
                        Profile
                    </h1>
                    <div className="flex gap-4">
                        <ModeToggle />
                        <SignOutButton
                            variant={"outline"}
                            className="text-red-700 hover:text-red-700"
                        />
                    </div>
                </header>
                <div className="py-4">
                    <div className="max-w-sm flex flex-col gap-4">
                        <UserCard />
                        <ExerciseSelection
                            buttonLabel="See Exercises"
                            onAddExercises={undefined}
                            isSelectionActive={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
