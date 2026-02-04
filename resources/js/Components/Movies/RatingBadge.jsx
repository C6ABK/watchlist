const RatingBadge = ({ rating }) => {
    const getRatingStyle = (rating) => {
        if (rating >= 8.5) return "bg-green-600 text-white";
        if (rating >= 7.5) return "bg-green-400 text-white";
        if (rating >= 6.5) return "bg-yellow-400 text-black";
        if (rating >= 5.5) return "bg-yellow-600 text-white";
        if (rating >= 4) return "bg-orange-500 text-white";
        if (rating >= 2) return "bg-red-500 text-white";
        return "bg-red-700 text-white";
    };

    return (
        <div
            className={`flex flex-col items-center py-2 rounded-lg text-xs font-bold ${getRatingStyle(rating)}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
            </svg>
            {rating}
        </div>
    );
};
export default RatingBadge;
