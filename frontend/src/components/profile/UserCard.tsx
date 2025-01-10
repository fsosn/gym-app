import { AuthContext } from "@/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleUserRound } from "lucide-react";
import { useContext } from "react";

export function UserCard() {
    const auth = useContext(AuthContext);

    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Your profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-3">
                    <CircleUserRound className="h-14 w-14 mr-2" />
                    <div className="flex-1">
                        <p className="truncate text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {auth?.email || ""}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
