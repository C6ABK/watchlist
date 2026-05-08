import AppLayout from "../../Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";

export default function ShowWatchlist({ watchlist }) {
    const remove = (movieId) =>
        router.delete(`/watchlists/$watchlist.id}/movies/${movieId}`);
    const toggleWatched = (movieId) =>
        router.patch(`/watchlists/${watchlist.id}/movies/${movieId}/watched`);

    return (
        <AppLayout title={watchlist.name}>
            <Link
                href="/watchlists"
                className="text-sm text-secondary hover:text-secondary/80 mb-4 block"
            >
                ← Watchlists
            </Link>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{watchlist.name}</h1>
                    {watchlist.description && (
                        <p className="text-neutral-content text-sm mt-1">
                            {watchlist.description}
                        </p>
                    )}
                </div>
                <span className="text-sm text-neutral-content">
                    {watchlist.movies.length} films/shows
                </span>
            </div>

            {watchlist.movies.length === 0 ? (
                <div className="text-center py-16">
                    <p className="mb-4">Nothing here yet.</p>
                    <Link href="/movies/index" className="btn btn-secondary">
                        Search for films and shows
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-y-3">
                    {watchlist.movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex items-center gap-x-4 bg-neutral p-3 rounded-lg"
                        >
                            {movie.image_url ? (
                                <img
                                    src={movie.image_url}
                                    alt={movie.primary_title}
                                    className="h-16 w-11 object-cover rounded flex-shrink-0"
                                />
                            ) : (
                                <div className="h-16 w-11 bg-neutral-900 rounded flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                                <Link
                                    href={`/movies/show/${movie.movie_id}`}
                                    className="font-bold hover:text-secondary transition-colors truncate block"
                                >
                                    {movie.primary_title}
                                </Link>
                                <div className="text-xs text-neutral-content">
                                    {movie.start_year}
                                </div>
                            </div>
                            <div className="flex gap-x-2 flex-shrink-0">
                                <button
                                    onClick={() => toggleWatched(movie.id)}
                                    className={`btn btn-sm ${movie.pivot.is_watched ? "btn-success" : "btn-ghost"}`}
                                >
                                    {movie.pivot.is_watched
                                        ? "Watched"
                                        : "Unwatched"}
                                </button>
                                <button
                                    onClick={() => remove(movie.id)}
                                    className="btn btn-sm btn-ghost text-error"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
