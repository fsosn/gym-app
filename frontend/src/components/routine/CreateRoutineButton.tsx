import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateRoutineButton() {
    const navigate = useNavigate();

    const handleCreateRoutineButtonClick = () => {
        navigate("/routine");
    };

    return (
        <Button className="mb-4" onClick={handleCreateRoutineButtonClick}>
            <div className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create routine</span>
            </div>
        </Button>
    );
}
