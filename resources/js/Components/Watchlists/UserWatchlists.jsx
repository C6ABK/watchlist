import { Link } from "@inertiajs/react";

export default function UserWatchlists({ watchlists }) {
    return (
        <div className="flex flex-col gap-y-4 mt-4">
            {watchlists && watchlists.length > 0 ? (
                watchlists.map((watchlist) => (
                    <div key={watchlist.id} className="bg-neutral p-4 rounded-lg">
                        <h3 className="font-bold text-xl">{watchlist.name}</h3>
                        <p>{watchlist.description}</p>
                    </div>
                ))
            ) : (
                <>
                    <div className="text-center py-8">
                        <p>You haven't created any watchlists yet.</p>
                        <Link href="/watchlists/create">
                            Create your first watchlist
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
