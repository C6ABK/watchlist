import AppLayout from "../../Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { useState } from "react";
import MovieSearchCard from "../../Components/Movies/MovieSearchCard";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";

export default function MovieSearchPage({
    movies: initialMovies = [],
    searchTerm: initialSearchTerm = "",
}) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [movies, setMovies] = useState(initialMovies);
    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        setLoading(true);

        router.post(
            "/movies/search",
            { query: searchTerm },
            {
                onSuccess: (response) => {
                    if (response.props.movies) {
                        setMovies(response.props.movies);
                    }
                },
                onError: (errors) => {
                    console.error("Search failed: ", errors);
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const clearSearch = () => {
        router.delete("/movies/search", {
            onSuccess: () => {
                setMovies([]);
                setSearchTerm("");
            },
        });
    };

    return (
        <AppLayout title="API Testing Page">
            <div className="text-2xl font-bold mb-4">
                Search Movies & TV Shows
            </div>

            <div className="flex gap-x-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search movies and shows..."
                        className="input focus:border-secondary focus:outline-none w-full"
                    />
                    {/* Clear button - only show when there's text */}
                    {searchTerm && (
                        <button
                            onClick={() => clearSearch()}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            type="button"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <button
                    onClick={searchMovies}
                    className="btn bg-secondary w-1/4 text-white hover:bg-secondary/80 transition-colors duration-200 tracking-wide"
                >
                    Search
                </button>
            </div>

            <div className="flex justify-center items-center min-h-[calc(100dvh-16rem)]">
                {loading ? (
                    <div>
                        <span className="loading loading-dots loading-xl text-secondary"></span>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-4 mt-8">
                        {movies.map((movie) => (
                            <MovieSearchCard
                                key={movie.id}
                                id={movie.id}
                                primaryTitle={movie.primaryTitle}
                                originalTitle={movie.originalTitle}
                                imageUrl={movie.primaryImage?.url}
                                startYear={movie.startYear}
                                endYear={movie.endYear}
                                ratingAggregate={movie.rating?.aggregateRating}
                                voteCount={movie.rating?.voteCount}
                                type={movie.type}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
