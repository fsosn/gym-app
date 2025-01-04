export function VolumeCard({ volume }: { volume: number }) {
    return (
        <div className="border border-zinc-700 rounded-lg p-2">
            <div>
                <span className="text-base font-medium">Volume</span>
            </div>
            <div>
                <span className="text-sm">{volume} kg</span>
            </div>
        </div>
    );
}
