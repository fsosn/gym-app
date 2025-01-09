import SignOutButton from "@/components/auth/SignOutButton";
import { ModeToggle } from "@/components/theme/components/ModeToggle";

export function Profile() {
    return (
        <div>
            <div>
                <header className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4 text-blue-500">
                        Profile
                    </h1>
                    <div className="space-x-8">
                        <ModeToggle />
                        <SignOutButton
                            variant={"outline"}
                            className="text-red-700"
                        />
                    </div>
                </header>
                <div></div>
            </div>
        </div>
    );
}

export default Profile;
