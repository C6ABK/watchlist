import Metacritic from "../../Components/Movies/Metacritic";
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
            <div className="flex flex-col bg-neutral rounded-lg shadow-xl p-6">
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
                        {movie.stars && <Stars stars={movie.stars} title="Cast" />}

                        {/* Directors */}
                        {movie.stars && <Stars stars={movie.directors} title="Directors" />}

                        {/* Writers */}
                        {movie.stars && <Stars stars={movie.writers} title="Writers" />}
                        
                        
                        <div className="border">Interests component</div>
                        <div className="border">
                            Countries & Languages component
                        </div>
                    </div>

                    <div className="flex-col hidden md:block">
                        {movie?.primaryImage?.url && (
                            <img
                                src={movie.primaryImage.url}
                                className="w-lg overflow-hidden object-cover rounded-lg"
                            />
                        )}
                        <button className="btn btn-secondary w-full mt-6 py-6 font-bold">Add to Watchlist +</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default ShowMoviePage;

/* 
    JSON RESPONSE USAGE NOTES    

    Top-Level Properties ------------------------------------------------------------
    movie.id                    // "tt16311594"
    movie.type                  // "movie"
    movie.primaryTitle          // "F1: The Movie"
    movie.originalTitle         // "F1"
    movie.startYear             // 2025
    movie.runtimeSeconds        // 9300
    movie.genres                // ["Action", "Drama", "Sport"]
    movie.plot                  // "A Formula One driver comes out..."

    Nested Object Properties --------------------------------------------------------
    // Primary Image
    movie.primaryImage.url      // "https://m.media-amazon.com/images/..."
    movie.primaryImage.width    // 2764
    movie.primaryImage.height   // 4096

    // Rating
    movie.rating.aggregateRating  // 7.6
    movie.rating.voteCount       // 306650

    // Metacritic
    movie.metacritic.score       // 68
    movie.metacritic.reviewCount // 56

    Array Properties (People) --------------------------------------------------------
    // Origin Countries
    movie.originCountries[0].code            // "US"
    movie.originCountries[0].name            // "United States"

    // Spoken Languages
    movie.spokenLanguages[0].code            // "eng"
    movie.spokenLanguages[0].name            // "English"

    // Interests/Genres
    movie.interests[0].id                    // "in0000001"
    movie.interests[0].name                  // "Action"
    movie.interests[0].isSubgenre            // true/false (optional)

    Usage Examples --------------------------------------------------------------------
    // Safe access with optional chaining
    {movie?.primaryTitle}
    {movie?.rating?.aggregateRating}/10
    {movie?.primaryImage?.url && <img src={movie.primaryImage.url} />}
    {movie?.directors?.map(director => director.displayName).join(', ')}
    {movie?.genres?.join(', ')}
*/
