import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SingleValueStatTemplate({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl lg:text-2xl font-bold">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-lg lg:text-xl font-semibold">
                {value}
            </CardContent>
        </Card>
    );
}
