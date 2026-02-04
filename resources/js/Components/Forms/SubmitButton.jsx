const SubmitButton = ({
    processing = false,
    processingText = "Processing...",
    children,
    className = "",
    ...props
}) => {
    return (
        <button
            type="submit"
            disabled={processing}
            className={`btn w-full mt-4 bg-secondary text-white hover:bg-secondary/80 transition-colors duration-200 tracking-wide ${className} ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
            {...props}
        >
            {processing ? processingText : children}
        </button>
    );
};

export default SubmitButton;
