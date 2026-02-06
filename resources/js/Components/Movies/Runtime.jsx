const Runtime = ({ seconds, className }) => {
    if (!seconds) return 'N/A';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    let runtime;

    if (hours > 0) {
        runtime = `${hours}h ${minutes}m`;
    } else {
        runtime = `${minutes}m`
    }
    

    return <div className={className}>
        Run Time: {runtime}
    </div>
};
export default Runtime;
