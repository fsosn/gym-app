import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface DialogSaveProps {
    title: string;
    setTitle: (title: string) => void;
    description: string | undefined;
    setDescription: (description: string) => void;
    buttonLabel: string;
    dialogTitle: string;
    dialogDescription: string;
    handleSave: () => void;
    isActive: boolean;
    isRoutine: boolean;
}

export default function DialogSave({
    title,
    setTitle,
    description,
    setDescription,
    buttonLabel,
    dialogTitle,
    dialogDescription,
    handleSave,
    isActive,
    isRoutine,
}: DialogSaveProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!isActive}>{buttonLabel}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            className="col-span-3"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {isRoutine && (
                            <>
                                <Label
                                    htmlFor="description"
                                    className="text-right"
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    className="col-span-3"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
