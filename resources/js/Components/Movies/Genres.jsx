import { Link } from "@inertiajs/react";

const Genres = ({ genres, title }) => {
    return (
        <div className="flex flex-col justify-between border-t border-neutral-800 pt-2">
            <div className="font-bold pb-2">{title}</div>

            <div className="grid grid-cols-3 w-full text-center gap-4">
                {genres.map((genre, index) => (
                    <Link href={`/genres/${genre}`} key={index} className="text-xs font-semibold text-secondary hover:text-secondary/90">
                        {genre}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Genres;
