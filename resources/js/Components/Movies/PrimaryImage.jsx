import { optimiseImage } from "../../Utils/imageOptimiser";

const PrimaryImage = ({ url }) => {
    return (
        <img
            src={optimiseImage(url, 'thumb')}
            className="w-full md:w-lg overflow-hidden object-cover rounded-lg"
        />
    );
};
export default PrimaryImage;
