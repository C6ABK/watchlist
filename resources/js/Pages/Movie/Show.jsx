import RatingBadge from "../../Components/Movies/RatingBadge";
import AppLayout from "../../Layouts/AppLayout";

const ShowMoviePage = ({ movie }) => {
    return (
        <AppLayout title="Movie Show">
            <div className="flex flex-col bg-neutral rounded-lg shadow-xl p-6">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col w-full gap-y-4 pr-4">
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
                        <div className="text-sm">{movie.plot}</div>
                        <div className="border">Run time</div>
                        <div className="border">Critic stuff</div>
                        <div className="border">Directors component</div>
                        <div className="border">Stars component</div>
                        <div className="border">Writers component</div>
                        <div className="border">Interests component</div>
                        <div className="border">Countries & Languages component</div>
                    </div>

                    <div>
                        {movie?.primaryImage?.url && (
                            <img
                                src={movie.primaryImage.url}
                                className="w-lg overflow-hidden object-cover rounded-lg"
                            />
                        )}
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
