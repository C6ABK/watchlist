import { useState } from "react";
import RatingBadge from "./RatingBadge";

const MovieSearchCard = ({
    id,
    primaryTitle,
    originalTitle,
    imageUrl,
    startYear,
    endYear,
    ratingAggregate,
    voteCount,
    type,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            key={id}
            className="flex bg-neutral border border-neutral rounded-lg shadow-xl cursor-pointer lg:hover:scale-105 hover:border hover:border-secondary transition-all duration-200 group relative"
        >
            <div>
                {/* Placeholder/Loading state */}
                {imageUrl && !imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral animate-pulse">
                        <span className="loading loading-dots loading-xl text-secondary"></span>
                    </div>
                )}

                {imageUrl && !imageError && (
                    <img
                        src={imageUrl}
                        alt={primaryTitle}
                        loading="lazy"
                        className="h-64 max-w-40 overflow-hidden object-cover rounded-l-lg"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                    />
                )}

                {(!imageUrl || imageError) && (
                    <div className="flex justify-center items-center h-64 w-40 object-cover rounded-l-lg text-secondary text-xs tracking-wide bg-neutral-900 overflow-hidden">
                        No image
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col justify-between pr-2 py-2 pl-4">
                <div className="flex">
                    <div className="flex flex-col gap-y-2 w-full pr-2">
                        <h3 className="font-bold text-lg lg:text-lg text-left w-full">
                            {primaryTitle}
                        </h3>
                        <h4 className="text-xs text-neutral-content">
                            {originalTitle}
                        </h4>
                        <div className="text-xs">
                            <span>{startYear}</span>
                            {endYear && <span> - {endYear}</span>}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {ratingAggregate && (
                            <div>
                                <RatingBadge rating={ratingAggregate} />
                                <div className="text-[10px] sm:text-xs mt-2 text-center">
                                    {voteCount?.toLocaleString()} <br/>votes
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <div>{type}</div>
                        <button className="btn btn-base-300 hover:btn-secondary rounded-full text-xl w-10 flex items-center justify-center transition-colors duration-200 focus:btn-secondary">
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/*

            <div className="flex flex-col justify-between ml-4 w-full pr-2">
                <div className="flex flex-col gap-y-2">
                    <h3 className="font-bold text-xl text-left w-full">
                        {primaryTitle}
                    </h3>
                    <h4 className="text-xs text-neutral-content">
                        {originalTitle}
                    </h4>
                    <div className="text-xs">
                        <span>{startYear}</span>
                        {endYear && <span> - {endYear}</span>}
                    </div>
                </div>

                <div>{type} WIP</div>
            </div>

            <div className="flex flex-col justify-between items-end">
                <div className="text-center">
                    {ratingAggregate && (
                        <>
                            <RatingBadge rating={ratingAggregate} />
                            <div className="text-xs mt-2">{voteCount?.toLocaleString()} votes</div>
                        </>
                    )}
                </div>
                <button className="btn btn-base-300 hover:btn-secondary rounded-full text-xl w-10 flex items-center justify-center transition-colors duration-200">
                    +
                </button>
            </div> */}
        </div>
    );
};
export default MovieSearchCard;
