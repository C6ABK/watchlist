const Metacritic = ({ score, reviewCount, className }) => {
    return <div className={className}>Metacritic Score: {score} out of {reviewCount} reviews.</div>;
};
export default Metacritic;
