import { useState, useEffect } from "react";
import { optimiseImage } from "../../Utils/imageOptimiser";

const ImageModal = ({ imageUrl, title, isOpen, onClose }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Disable scrolling and lock position when modal is open
    useEffect(() => {
        if (isOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;

            // Scroll to top and disable scrolling
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";

            return () => {
                // Restore scrolling and return to original position
                document.body.style.overflow = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 max-h-screen"
            onClick={onClose}
        >
            <div className="relative max-w-4xl">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300 z-10"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Loading state */}
                {!imageLoaded && (
                    <div className="flex items-center justify-center w-96 h-96 bg-neutral rounded">
                        <span className="loading loading-spinner loading-lg text-secondary"></span>
                    </div>
                )}

                {/* Large image */}
                <img
                    src={optimiseImage(imageUrl, "large")}
                    alt={title}
                    className="max-w-screen max-h-screen object-contain rounded"
                    onLoad={() => setImageLoaded(true)}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
};
export default ImageModal;
