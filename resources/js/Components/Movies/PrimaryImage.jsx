const PrimaryImage = ({ url }) => {
    return (
        <img
            src={url}
            className="w-full md:w-lg overflow-hidden object-cover rounded-lg"
        />
    );
};
export default PrimaryImage;
