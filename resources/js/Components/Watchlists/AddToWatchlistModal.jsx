import { useState } from "react";
import { router, usePage, Link } from "@inertiajs/react";

export default function AddToWatchlistModal({ movieId }) {
    const [open, setOpen] = useState(false);
    const { watchlists } = usePage().props;

    const handleOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    };

    const add = (watchlistId) => {
        router.post(
            `/watchlists/${watchlistId}/movies`,
            { movie_id: movieId },
            {
                onSuccess: () => setOpen(false),
            },
        );
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="btn btn-base-300 hover:btn-secondary rounded-full text-xl w-10 flex items-center justify-center transition-colors duration-200"
            >
                +
            </button>

            {open && (
                <div
                    className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-neutral rounded-lg p-6 w-72 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-bold text-lg mb-4">Add to list</h3>

                        {watchlists.length === 0 ? (
                            <div>
                                <p className="text-sm text-neutral-content mb-4">
                                    You have no watchlists yet.
                                </p>
                                <Link
                                    href="/watchlists/create"
                                    className="btn btn-secondary w-full"
                                >
                                    Create a list
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-y-2">
                                {watchlists.map((w) => (
                                    <button
                                        key={w.id}
                                        onClick={() => add(w.id)}
                                        className="btn btn-ghost w-full justify-start"
                                    >
                                        {w.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => setOpen(false)}
                            className="btn btn-ghost w-full mt-3"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
