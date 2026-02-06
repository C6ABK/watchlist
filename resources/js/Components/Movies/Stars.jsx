import { Link } from "@inertiajs/react";

const Stars = ({ stars, title }) => {
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
            <div className="font-bold text-xl mb-2 border-t border-neutral-800 pt-2">
                {title}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {stars.map((star, index) => (
                    <Link href={`/star/${star.id}`} key={index}>
                        <div className="flex justify-between h-full p-2 border border-neutral-800 rounded-lg hover:bg-neutral-900 hover:border-secondary transition-all duration-200">
                            <div className="flex flex-col gap-y-2">
                                {star.displayName && (
                                    <div className="font-bold">
                                        {star.displayName}
                                    </div>
                                )}

                                {star.primaryProfessions && (
                                    <div>
                                        <div className="font-semibold text-sm">
                                            Professions
                                        </div>
                                        {star.primaryProfessions?.map(
                                            (profession) => (
                                                <div
                                                    key={profession}
                                                    className="text-xs"
                                                >
                                                    {formatProfession(
                                                        profession,
                                                    )}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}

                                {star.alternativeNames && (
                                    <div>
                                        <div className="font-semibold text-sm">
                                            Other Names
                                        </div>
                                        {star.alternativeNames?.map((name) => (
                                            <div key={name} className="text-xs">
                                                {name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {star.primaryImage?.url && (
                                <div className="h-full">
                                    <img
                                        src={star.primaryImage.url}
                                        className="max-h-30 max-w-30 overflow-hidden object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Stars;
