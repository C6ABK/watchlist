import { useState } from "react";
import { Link } from "@inertiajs/react";
import { optimiseImage } from "../../Utils/imageOptimiser";


const Stars = ({ stars, title, expanded = false }) => {
    const [isStarsExpanded, setIsStarsExpanded] = useState(expanded);

    const toggleStarsSection = () => {
        setIsStarsExpanded(!isStarsExpanded);
    };

    const formatProfession = (profession) => {
        return (
            profession
                .replace(/_/g, " ") // Replace all underscores with spaces
                .charAt(0)
                .toUpperCase() +
            profession.slice(1).replace(/_/g, " ").toLowerCase()
        );
    };

    return (
        <div>
            <div className="flex justify-between font-bold text-xl mb-2 border-t border-neutral-800 pt-2">
                <div>{title}</div>
                <span
                    className={`text-sm cursor-pointer select-none transition-all duration-200 ${isStarsExpanded ? "rotate-180" : ""}`}
                    onClick={toggleStarsSection}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                        />
                    </svg>
                </span>
            </div>

            {isStarsExpanded && (
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full"
                    id="stars"
                >
                    {stars.map((star, index) => (
                        <Link href={`/star/${star.person_id}`} key={index}>
                            <div className="flex justify-between h-full p-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 hover:border-secondary transition-all duration-200">
                                <div className="flex flex-col gap-y-2">
                                    {star['display_name'] && (
                                        <div className="font-bold">
                                            {star['display_name']}
                                        </div>
                                    )}

                                    {star['primary_professions'] && (
                                        <div>
                                            <div className="font-semibold text-xs">
                                                Professions
                                            </div>
                                            {star['primary_professions']?.map(
                                                (profession) => (
                                                    <div
                                                        key={profession}
                                                        className="text-[11px]"
                                                    >
                                                        {formatProfession(
                                                            profession,
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                    {star.image_url && (
                                        <div>
                                            <div className="font-semibold text-xs">
                                                Other Names
                                            </div>
                                            {star['alternative_names']?.map(
                                                (name) => (
                                                    <div
                                                        key={name}
                                                        className="text-[11px]"
                                                    >
                                                        {name}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                                {star.image_url && (
                                    <div className="h-full">
                                        <img
                                            src={optimiseImage(star.image_url, 'thumb')}
                                            className="aspect-3/4 w-24 overflow-hidden object-cover object-top rounded-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Stars;
