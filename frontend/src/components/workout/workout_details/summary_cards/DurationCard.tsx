export function DurationCard({ duration }: { duration: number }) {
    return (
        <div className="border border-zinc-700 rounded-lg p-2">
            <span className="text-base font-medium">Duration</span>
            <div>
                <span className="text-sm">{duration}</span>
            </div>
        </div>
    );
}
