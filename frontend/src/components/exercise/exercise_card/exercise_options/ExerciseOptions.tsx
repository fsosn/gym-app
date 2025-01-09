import { Ellipsis, ArrowUp, ArrowDown, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExerciseCardOptionsProps {
    onDelete?: () => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
}

export const ExerciseOptions: React.FC<ExerciseCardOptionsProps> = ({
    onDelete,
    onMoveUp,
    onMoveDown,
}: ExerciseCardOptionsProps) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {onMoveUp && (
                        <DropdownMenuItem onClick={onMoveUp}>
                            <ArrowUp />
                            Move Up
                        </DropdownMenuItem>
                    )}
                    {onMoveDown && (
                        <DropdownMenuItem onClick={onMoveDown}>
                            <ArrowDown />
                            Move Down
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={onDelete}
                    >
                        <X />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
export default ExerciseOptions;
