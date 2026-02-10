import Countries from "../../Components/Movies/Countries";
import Genres from "../../Components/Movies/Genres";
import Interests from "../../Components/Movies/Interests";
import Metacritic from "../../Components/Movies/Metacritic";
import PrimaryImage from "../../Components/Movies/PrimaryImage";
import RatingBadge from "../../Components/Movies/RatingBadge";
import Runtime from "../../Components/Movies/Runtime";
import Stars from "../../Components/Movies/Stars";
import AppLayout from "../../Layouts/AppLayout";
import { Link } from "@inertiajs/react";

const ShowMoviePage = ({ movie }) => {
    const directors = movie.people?.filter((person) => person.pivot.role === "director") || [];
    const writers = movie.people?.filter((person) => person.pivot.role === "writer") || [];
    const actors = movie.people?.filter((person) => person.pivot.role === "actor") || [];

    return (
        <AppLayout title="Movie Show">
            <Link
                href="/movies/index"
                className="inline-flex items-center gap-x-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors duration-200 mb-6"
            >
                ← Back to search results
            </Link>
            <div className="flex flex-col bg-neutral rounded-lg shadow-xl p-4">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col w-full gap-y-4 md:pr-4">
                        <div className="flex gap-x-4">
                            <RatingBadge rating={movie.rating_aggregate} />
                            <div className="flex flex-col text-left grow justify-center">
                                <div className="font-bold text-2xl">
                                    {movie.primary_title}
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    {movie?.original_title && (
                                        <div className="text-sm">
                                            {movie.original_title}
                                        </div>
                                    )}
                                    <div className="flex text-xs">
                                        {movie.start_year}
                                        {movie?.end_year && (
                                            <div> - {movie.end_year}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-justify">{movie.plot}</div>

                        {/* Mobile Add to Watchlist Button */}
                        <div className="md:hidden border-t border-neutral-800 pt-4">
                            <button className="btn btn-secondary w-full mb-4 py-6 font-bold">
                                Add to Watchlist +
                            </button>
                            {movie?.image_url && (
                                <PrimaryImage url={movie.image_url} />
                            )}
                            {/* Genres */}
                            {movie.genres && movie.genres.length > 0 && (
                                <Genres genres={movie.genres} title="Genres" />
                            )}
                        </div>

                        {/* Runtime & Metacritic */}
                        {(movie.run_time || movie.metacritic_score) && (
                            <div className="flex justify-between border-t border-neutral-800 pt-4">
                                {movie.run_time && (
                                    <Runtime
                                        seconds={movie.run_time}
                                        className="text-xs"
                                    />
                                )}
                                {movie.metacritic_score && (
                                    <Metacritic
                                        score={movie.metacritic_score}
                                        reviewCount={movie.metacritic_count}
                                        className="text-xs"
                                    />
                                )}
                            </div>
                        )}

                        {/* Cast */}
                        {actors.length > 0 && (
                            <Stars stars={actors} title="Cast" />
                        )}

                        {/* Directors */}
                        {directors.length > 0 && (
                            <Stars stars={directors} title="Directors" />
                        )}

                        {/* Writers */}
                        {writers.length > 0 && (
                            <Stars stars={writers} title="Writers" />
                        )}

                        {/* Interests */}
                        {movie.interests && (
                            <>
                            <Interests interests={movie.interests} />
                            </>
                            
                        )}

                        {/* Countries */}
                        {movie.originCountries && (
                            <Countries
                                countries={movie.originCountries}
                                title="Countries"
                            />
                        )}

                        {/* Languages */}
                        {movie.spokenLanguages && (
                            <Countries
                                countries={movie.spokenLanguages}
                                title="Languages"
                            />
                        )}
                    </div>

                    <div className="flex-col hidden md:block">
                        {movie?.image_url && (
                            <PrimaryImage url={movie.image_url} />
                        )}
                        <button className="btn btn-secondary w-full mt-4 py-6 font-bold">
                            Add to Watchlist +
                        </button>
                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <Genres genres={movie.genres} title="Genres" />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default ShowMoviePage;
