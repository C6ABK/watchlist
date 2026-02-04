const InputField = ({
    label,
    id,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    ...props
}) => {
    return (
        <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
                {label} {required && <span className="text-secondary">*</span>}
            </legend>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className="input w-full focus:border-secondary focus:outline-none"
            />
            {error && <p className="label text-red-500">{error}</p>}
        </fieldset>
    );
};
export default InputField;
