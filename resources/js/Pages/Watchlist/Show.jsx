import { useState } from "react";
import { createPortal } from "react-dom";
import AppLayout from "../../Layouts/AppLayout";
import { Link, router, useForm } from "@inertiajs/react";

export default function ShowWatchlist({ watchlist, recommendations }) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const { post, processing } = useForm();

    const remove = (movieId) =>
        router.delete(`/watchlists/${watchlist.id}/movies/${movieId}`);
    const toggleWatched = (movieId) =>
        router.patch(`/watchlists/${watchlist.id}/movies/${movieId}/watched`);
    const deleteWatchlist = () =>
        router.delete(`/watchlists/${watchlist.id}`);
    const getRecommendations = () =>
        post(`/watchlists/${watchlist.id}/recommendations`);

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
                <div className="flex items-center gap-x-3">
                    <span className="text-sm text-neutral-content">
                        {watchlist.movies.length} films/shows
                    </span>
                    <button onClick={() => setConfirmDelete(true)} className="btn btn-sm btn-ghost text-error">
                        Delete list
                    </button>
                </div>
            </div>

            {watchlist.movies.length === 0 ? (
                <div className="text-center py-16">
                    <p className="mb-4">Nothing here yet.</p>
                    <Link href="/movies/index" className="btn btn-secondary">
                        Search for films and shows
                    </Link>
                </div>
            ) : (
                <>
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
                                        className="h-16 w-11 object-cover rounded shrink-0"
                                    />
                                ) : (
                                    <div className="h-16 w-11 bg-neutral-900 rounded shrink-0" />
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
                                <div className="flex gap-x-2 shrink-0">
                                    <button
                                        onClick={() => toggleWatched(movie.id)}
                                        className={`btn btn-sm ${movie.pivot.is_watched ? "btn-success" : "btn-ghost"}`}
                                    >
                                        {movie.pivot.is_watched ? "Watched" : "Unwatched"}
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

                    {/* Recommendations */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Recommended for you</h2>
                            <button
                                onClick={getRecommendations}
                                disabled={processing}
                                className="btn btn-secondary btn-sm"
                            >
                                {processing ? 'Thinking...' : recommendations ? 'Refresh' : 'Get recommendations'}
                            </button>
                        </div>

                        {processing && (
                            <div className="flex flex-col gap-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="bg-neutral p-4 rounded-lg animate-pulse">
                                        <div className="h-4 bg-neutral-700 rounded w-1/3 mb-2" />
                                        <div className="h-3 bg-neutral-700 rounded w-2/3" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {!processing && recommendations && (
                            <div className="flex flex-col gap-y-3">
                                {recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-center gap-x-4 bg-neutral p-3 rounded-lg">
                                        {rec.image_url ? (
                                            <img src={rec.image_url} alt={rec.title} className="h-16 w-11 object-cover rounded shrink-0" />
                                        ) : (
                                            <div className="h-16 w-11 bg-neutral-900 rounded shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <span className="font-bold block truncate">{rec.title}</span>
                                            <span className="text-xs text-neutral-content">{rec.year}</span>
                                            <p className="text-sm text-neutral-content mt-1">{rec.reason}</p>
                                        </div>
                                        <button
                                            onClick={() => router.post(`/watchlists/${watchlist.id}/movies`, { movie_id: rec.imdb_id })}
                                            className="btn btn-sm btn-secondary shrink-0"
                                        >
                                            + Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!processing && !recommendations && (
                            <p className="text-sm text-neutral-content">
                                Get personalised recommendations based on what's in your list.
                            </p>
                        )}
                    </div>
                </>
            )}

            {confirmDelete && createPortal(
                <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center" onClick={() => setConfirmDelete(false)}>
                    <div className="bg-neutral rounded-lg p-6 w-80 shadow-xl" onClick={e => e.stopPropagation()}>
                        <h3 className="font-bold text-lg mb-2">Delete "{watchlist.name}"?</h3>
                        <p className="text-sm text-neutral-content mb-6">This will permanently delete the list and remove all films from it.</p>
                        <div className="flex gap-x-3">
                            <button onClick={deleteWatchlist} className="btn btn-error flex-1">Delete</button>
                            <button onClick={() => setConfirmDelete(false)} className="btn btn-ghost flex-1">Cancel</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </AppLayout>
    );
}
