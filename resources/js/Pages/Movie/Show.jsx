import Countries from "../../Components/Movies/Countries";
import Interests from "../../Components/Movies/Interests";
import Metacritic from "../../Components/Movies/Metacritic";
import PrimaryImage from "../../Components/Movies/PrimaryImage";
import RatingBadge from "../../Components/Movies/RatingBadge";
import Runtime from "../../Components/Movies/Runtime";
import Stars from "../../Components/Movies/Stars";
import AppLayout from "../../Layouts/AppLayout";
import { Link } from "@inertiajs/react";

const ShowMoviePage = ({ movie }) => {
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
                            <RatingBadge
                                rating={movie.rating.aggregateRating}
                            />
                            <div className="flex flex-col text-left grow justify-center">
                                <div className="font-bold text-2xl">
                                    {movie.primaryTitle}
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    {movie?.originalTitle && (
                                        <div className="text-sm">
                                            {movie.originalTitle}
                                        </div>
                                    )}
                                    <div className="flex text-xs">
                                        {movie.startYear}
                                        {movie?.endYear && (
                                            <div> - {movie.endYear}</div>
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
                            {movie?.primaryImage?.url && (
                                <PrimaryImage url={movie.primaryImage.url} />
                            )}
                        </div>

                        <div className="flex justify-between border-t border-neutral-800 pt-4">
                            {movie.runtimeSeconds && (
                                <Runtime
                                    seconds={movie.runtimeSeconds}
                                    className="text-xs"
                                />
                            )}
                            {movie.metacritic && (
                                <Metacritic
                                    score={movie.metacritic.score}
                                    reviewCount={movie.metacritic.reviewCount}
                                    className="text-xs"
                                />
                            )}
                        </div>

                        {/* Cast */}
                        {movie.stars && (
                            <Stars stars={movie.stars} title="Cast" />
                        )}

                        {/* Directors */}
                        {movie.stars && (
                            <Stars stars={movie.directors} title="Directors" />
                        )}

                        {/* Writers */}
                        {movie.stars && (
                            <Stars stars={movie.writers} title="Writers" />
                        )}

                        {/* Interests */}
                        {movie.interests && (
                            <Interests interests={movie.interests} />
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
                        {movie?.primaryImage?.url && (
                            <PrimaryImage url={movie.primaryImage.url} />
                        )}
                        <button className="btn btn-secondary w-full mt-4 py-6 font-bold">
                            Add to Watchlist +
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default ShowMoviePage;
