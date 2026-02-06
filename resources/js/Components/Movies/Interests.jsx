import { Link } from "@inertiajs/react";
import { useState } from "react";

const Interests = ({ interests }) => {
    const [isInterestsExpanded, setIsInterestsExpanded] = useState(false);

    const toggleInterests = () => {
        setIsInterestsExpanded(!isInterestsExpanded);
    };

    return (
        <div>
            <div className="flex justify-between font-bold text-xl mb-2 border-t border-neutral-800 pt-2">
                Interests
                <span
                    className={`text-sm cursor-pointer select-none transition-all duration-200 ${isInterestsExpanded ? "rotate-180" : ""}`}
                    onClick={toggleInterests}
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

            {isInterestsExpanded && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    {interests.map((interest, index) => (
                        <Link href={`/interest/${interest.id}`} key={index}>
                            <div className="">
                                <div className="text-xs bg-primary rounded-full text-center py-2 hover:bg-primary/90 transition-colors duration-200">
                                    {interest.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
export default Interests;
