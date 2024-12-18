export function DurationCard({ duration }: { duration: number }) {
    const formatDuration = (duration: number) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;

        return hours > 0
            ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                  2,
                  "0"
              )}:${String(seconds).padStart(2, "0")}`
            : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0"
              )}`;
    };

    return (
        <div className="border border-zinc-700 rounded-lg p-2">
            <span className="text-base font-medium">Duration</span>
            <div>
                <span className="text-sm">{formatDuration(duration)}</span>
            </div>
        </div>
    );
}
