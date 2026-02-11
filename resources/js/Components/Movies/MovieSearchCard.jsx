import { useState } from "react";
import RatingBadge from "./RatingBadge";
import { Link } from "@inertiajs/react";
import ImageModal from "./ImageModal";
import { optimiseImage } from "../../Utils/imageOptimiser";

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
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (imageUrl && !imageError) {
            setShowModal(true);
        }
    };

    return (
        <>
            <Link href={`/movies/show/${id}`} className="block">
                <div
                    key={id}
                    className="flex bg-neutral border border-neutral rounded-lg shadow-xl lg:hover:scale-105 hover:border hover:border-secondary transition-all duration-200 group relative"
                >
                    <div>
                        {/* Placeholder/Loading state */}
                        {imageUrl && !imageLoaded && !imageError && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral animate-pulse">
                                <span className="loading loading-dots loading-xl text-secondary"></span>
                            </div>
                        )}

                        {imageUrl && !imageError && (
                            <div className="relative">
                                <img
                                    src={optimiseImage(imageUrl, "thumb")}
                                    alt={primaryTitle}
                                    loading="lazy"
                                    className="h-64 max-w-40 overflow-hidden object-cover rounded-l-lg cursor-pointer hover:opacity-80 transition-opacity"
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                    onClick={handleImageClick}
                                />
                                {/* Expand hint */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-l-lg"
                                    onClick={handleImageClick}
                                >
                                    <span className="text-white text-xs">
                                        Click to expand
                                    </span>
                                </div>
                            </div>
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
                                            {voteCount?.toLocaleString()} <br />
                                            votes
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
                </div>
            </Link>

            <ImageModal
                imageUrl={imageUrl}
                title={primaryTitle}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};
export default MovieSearchCard;
