import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MuscleCategory, Equipment, ExerciseType } from "@/types/types";
import { Search } from "lucide-react";

interface FiltersProps {
    setFilters: React.Dispatch<
        React.SetStateAction<{
            muscle: string;
            equipment: string;
            exercise_type: string;
            search: string;
        }>
    >;
}

const ExerciseFilters: React.FC<FiltersProps> = ({ setFilters }) => {
    return (
        <div>
            <div>
                <h3 className="font-bold mb-2">Filters</h3>
            </div>
            <div className="mb-4">
                <div className="mb-2 relative">
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                    />
                    <Input
                        placeholder="Search by name"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                        className="pl-10"
                    />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <Select
                        onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, muscle: value }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Muscle" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Muscle</SelectLabel>
                                <SelectItem value="Any">Any</SelectItem>
                                {Object.values(MuscleCategory).map((muscle) => (
                                    <SelectItem key={muscle} value={muscle}>
                                        {muscle}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                equipment: value,
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Equipment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Equipment</SelectLabel>
                                <SelectItem value="Any">Any</SelectItem>
                                {Object.values(Equipment).map((equip) => (
                                    <SelectItem key={equip} value={equip}>
                                        {equip}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) =>
                            setFilters((prev) => ({
                                ...prev,
                                exercise_type: value,
                            }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="Any">Any</SelectItem>
                                {Object.values(ExerciseType).map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default ExerciseFilters;
