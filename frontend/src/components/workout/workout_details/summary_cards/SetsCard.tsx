export function SetsCard({ sets }: { sets: number }) {
    return (
        <div className="border border-zinc-700 rounded-lg p-2">
            <div>
                <span className="text-base font-medium">Sets</span>
            </div>
            <div>
                <span className="text-sm">{sets}</span>
            </div>
        </div>
    );
}
