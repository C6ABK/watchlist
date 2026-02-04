import AppLayout from "../Layouts/AppLayout";
import { useState } from "react";
import MovieSearchCard from "../Components/Movies/MovieSearchCard";

export default function APIPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.imdbapi.dev/search/titles?query=${searchTerm}`,
            );
            const data = await response.json();

            setMovies(data.titles || []);
        } catch (error) {
            console.error("Error searching movies: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout title="API Testing Page">
            <div>API Page</div>

            <div className="flex gap-x-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movies and shows..."
                    className="input focus:border-secondary focus:outline-none w-3/4"
                />
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
// id,
//     primaryTitle,
//     originalTitle,
//     imageUrl,
//     startYear,
//     endYear,
//     ratingAggregate,
//     voteCount,
//     type
