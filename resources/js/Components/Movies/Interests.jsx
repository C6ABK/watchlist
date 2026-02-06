import { Link } from "@inertiajs/react";

const Interests = ({ interests }) => {
    return (
        <div>
            <div className="font-bold text-xl mb-2 border-t border-neutral-800 pt-2">
                Interests
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {interests.map((interest, index) => (
                    <Link href={`/interest/${interest.id}`} key={index}>
                        <div className="">
                            <div className="text-xs bg-secondary rounded-full text-center py-2 hover:bg-secondary/90 transition-colors duration-200">
                                {interest.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Interests;
