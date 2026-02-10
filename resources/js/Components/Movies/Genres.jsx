import { Link } from "@inertiajs/react";

const Genres = ({ genres, title }) => {
    return (
        <div className="flex flex-col justify-between border-t border-neutral-800 pt-2">
            <div className="font-bold pb-2">{title}</div>

            <div className="grid grid-cols-3 w-full text-center gap-4">
                {genres.map((genreObj) => (
                    <Link 
                        href={`/genres/${genreObj.genre}`} 
                        key={genreObj.id} 
                        className="text-xs font-semibold text-secondary hover:text-secondary/90"
                    >
                        {genreObj.genre}
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default Genres;
