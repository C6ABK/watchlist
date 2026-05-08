import AppLayout from "../../Layouts/AppLayout";
import { Link } from "@inertiajs/react";

export default function ViewWatchlist({ watchlists }) {
    return (
        <AppLayout title="Your Watchlists">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Watchlists</h1>
                <Link href="/watchlists/create">New List</Link>
            </div>

            {watchlists.length === 0 ? (
                <div className="text-center py-16">
                    <p className="mb-4">No watchlists yet.</p>
                    <Link
                        href="/watchlists.create"
                        className="btn btn-secondary"
                    >
                        Create your first list
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-y-3">
                    {watchlists.map((w) => (
                        <Link
                            key={w.id}
                            href={`/watchlists/${w.id}`}
                            className="block bg-neutral p-4 rounded-lg border border-neutral hover:border-secondary transition-colors"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {w.name}
                                    </h3>
                                    {w.description && (
                                        <p className="text-sm text-neutral-content mt-1">
                                            {w.description}
                                        </p>
                                    )}
                                </div>
                                <span className="text-sm text-neutral-content">
                                    {w.movies_count} films/shows
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
